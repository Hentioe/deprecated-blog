defmodule Blog.Counter do
  use GenServer

  alias :mnesia, as: Mnesia
  alias Blog.Business.Counter

  def start_link(default) when is_list(default) do
    state = default[:state] || %{}
    GenServer.start_link(__MODULE__, state, name: __MODULE__)
  end

  def init(state) do
    Process.flag(:trap_exit, true)

    Mnesia.create_schema([node()])
    Mnesia.start()
    Mnesia.create_table(Counter, attributes: [:key, :val])
    Mnesia.wait_for_tables([Counter], 5000)

    sync_from_db()
    schedule_sync_to_db(true)

    {:ok, state}
  end

  defp sync_from_db do
    all = Counter.all()

    all
    |> Enum.each(fn c ->
      Mnesia.dirty_write({Counter, c.key, c.val})
    end)
  end

  defp sync_to_db do
    data_select = fn -> Mnesia.select(Counter, [{:_, [], [:"$_"]}]) end
    {:atomic, counters} = Mnesia.transaction(data_select)

    counters
    |> Enum.each(fn {Counter, key, val} ->
      Counter.sync(key, val)
    end)
  end

  def sync_time do
    GenServer.call(__MODULE__, :sync_time)
  end

  def sync_now do
    GenServer.call(__MODULE__, :sync_now)
  end

  # 定时持久化计数器数据
  @sync_time 1000 * 60 * 60 * 15
  defp schedule_sync_to_db(first \\ false) do
    unless first do
      sync_to_db()
    end

    Process.send_after(self(), :sync, @sync_time)
  end

  def handle_info(:sync, state) do
    state = state |> Map.put(:sync_time, DateTime.utc_now())
    schedule_sync_to_db()
    {:noreply, state}
  end

  def handle_info({:EXIT, _from, :shutdown}, state) do
    sync_to_db()
    {:noreply, state}
  end

  def terminate(_reason, _state) do
    sync_to_db()
    :normal
  end

  def read(key) do
    GenServer.call(__MODULE__, {:read, key})
  end

  def inc(key) do
    GenServer.cast(__MODULE__, {:inc, key})
  end

  def handle_call(:sync_time, _from, state) do
    {:reply, state[:sync_time], state}
  end

  def handle_call(:sync_now, _from, state) do
    sync_to_db()
    state = state |> Map.put(:sync_time, DateTime.utc_now())
    {:reply, state[:sync_time], state}
  end

  def handle_call({:read, key}, _from, state) do
    case Mnesia.dirty_read({Counter, key}) do
      [{Counter, _, val}] -> {:reply, val, state}
      [] -> {:reply, 0, state}
    end
  end

  def handle_cast({:inc, key}, state) do
    Mnesia.dirty_update_counter(Counter, key, 1)
    {:noreply, state}
  end
end

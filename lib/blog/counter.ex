defmodule Blog.Counter do
  use GenServer

  alias :mnesia, as: Mnesia

  def start_link(default) when is_list(default) do
    GenServer.start_link(__MODULE__, default, name: __MODULE__)
  end

  def init(state) do
    Mnesia.create_schema([node()])
    Mnesia.start()
    Mnesia.create_table(Counter, attributes: [:key, :val])

    {:ok, state}
  end

  def read(key) do
    GenServer.call(__MODULE__, {:read, key})
  end

  def inc(key) do
    GenServer.cast(__MODULE__, {:inc, key})
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

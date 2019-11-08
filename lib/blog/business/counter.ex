defmodule Blog.Business.Counter do
  use Blog.Business, schema: Blog.Schemas.Counter

  def val(key) do
    if c = Repo.get(Counter, key) do
      c.val
    else
      0
    end
  end

  def sync(key, val) do
    c = Counter |> Repo.get(key)

    cond do
      c == nil ->
        %Counter{} |> Counter.changeset(%{key: key, val: val}) |> Repo.insert()

      c.val < val ->
        c |> Counter.changeset(%{key: key, val: val}) |> Repo.update()

      true ->
        {:ok, :unchanged}
    end
  end

  def all do
    Counter |> Repo.all()
  end
end

defmodule Blog.Business.Tag do
  use Blog.Business, schema: Blog.Schemas.Tag
  import Ecto.Query, only: [order_by: 3]

  def find_list do
    Tag
    |> order_by([t], desc: t.inserted_at)
    |> Repo.all()
  end

  def create(params) do
    %Tag{}
    |> Tag.changeset(params)
    |> Repo.insert()
  end

  def update(%Tag{} = tag, attrs) do
    tag
    |> Tag.changeset(attrs)
    |> Repo.update()
  end

  def delete(%Tag{} = tag) do
    tag
    |> Repo.delete()
  end
end

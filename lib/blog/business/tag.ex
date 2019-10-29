defmodule Blog.Business.Tag do
  alias Blog.Repo
  import Ecto.Query, only: [order_by: 3]
  alias Blog.Schemas.{Tag}

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

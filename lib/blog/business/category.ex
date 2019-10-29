defmodule Blog.Business.Category do
  alias Blog.Repo
  import Ecto.Query, only: [order_by: 3]
  alias Blog.Schemas.{Category}

  def find_list do
    Category
    |> order_by([c], desc: c.inserted_at)
    |> Repo.all()
  end

  def create(params) do
    %Category{}
    |> Category.changeset(params)
    |> Repo.insert()
  end

  def update(%Category{} = category, attrs) do
    category
    |> Category.changeset(attrs)
    |> Repo.update()
  end

  def delete(%Category{} = category) do
    category
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.no_assoc_constraint(:articles)
    |> Repo.delete()
  end
end

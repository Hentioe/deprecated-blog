defmodule Blog.Business.Category do
  use Blog.Business, schema: Blog.Schemas.Category

  import Ecto.Query, only: [order_by: 3]

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

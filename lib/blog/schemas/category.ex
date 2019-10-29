defmodule Blog.Schemas.Category do
  use Blog.Schema

  @required_fields ~w(name slug)a
  @optional_fields ~w(description)a

  schema "categories" do
    field :name, :string
    field :slug, :string
    field :description, :string

    has_many :articles, Blog.Schemas.Article

    timestamps()
  end

  @doc false
  def changeset(category, attrs) do
    category
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug, name: :categories_slug_index)
    |> slugify_field(:slug)
  end
end

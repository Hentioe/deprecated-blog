defmodule Blog.Schemas.Tag do
  use Blog.Schema
  import Ecto.Changeset

  @required_fields ~w(name slug)a
  @optional_fields ~w(description color)a

  schema "tags" do
    field :name, :string
    field :slug, :string
    field :description, :string
    field :color, :string

    many_to_many :articles, Blog.Schemas.Article, join_through: "articles_tags"

    timestamps()
  end

  @doc false
  def changeset(tag, attrs) do
    tag
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug, name: :tags_slug_index)
    |> slugify_field(:slug)
  end
end

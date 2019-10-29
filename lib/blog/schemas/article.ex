defmodule Blog.Schemas.Article do
  use Blog.Schema

  @required_fields ~w(title slug content comment_permissions status)a
  @optional_fields ~w()a

  schema "articles" do
    field :title, :string
    field :slug, :string
    field :content, :string
    field :comment_permissions, :integer

    status()
    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = article, attrs) when is_map(attrs) do
    article
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug, name: :articles_slug_index)
  end
end

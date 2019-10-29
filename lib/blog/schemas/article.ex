defmodule Blog.Schemas.Article do
  use Blog.Schema

  @required_fields ~w(title slug content comment_permissions pinned_at category_id status)a
  @optional_fields ~w()a

  schema "articles" do
    field :title, :string
    field :slug, :string
    field :content, :string
    field :comment_permissions, :integer
    field :pinned_at, :utc_datetime_usec, default: DateTime.from_unix!(0, :microsecond)

    belongs_to :category, Blog.Schemas.Category

    status()
    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = article, attrs) when is_map(attrs) do
    article
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> assoc_constraint(:category)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug, name: :articles_slug_index)
    |> slugify_field(:slug)
  end
end

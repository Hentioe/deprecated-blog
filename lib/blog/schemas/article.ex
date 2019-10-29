defmodule Blog.Schemas.Article do
  use Blog.Schema

  @required_fields ~w(title slug content comment_permissions pinned_at status)a
  @optional_fields ~w()a

  schema "articles" do
    field :title, :string
    field :slug, :string
    field :content, :string
    field :comment_permissions, :integer
    field :pinned_at, :utc_datetime_usec, default: DateTime.from_unix!(0, :microsecond)

    status()
    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = article, attrs) when is_map(attrs) do
    article
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:slug, name: :articles_slug_index)
    |> slugify
  end

  defp slugify(str) when is_bitstring(str) do
    str
    |> String.downcase()
    |> String.replace(~r/[^\w-]+/u, "-")
  end

  defp slugify(changeset) do
    if slug = get_change(changeset, :slug) do
      put_change(changeset, :slug, slugify(slug))
    else
      changeset
    end
  end
end

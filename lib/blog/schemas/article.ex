defmodule Blog.Schemas.Article do
  use Blog.Schema

  @required_fields ~w(title slug content comment_permissions pinned_at category_id status)a
  @optional_fields ~w()a

  @derive {Jason.Encoder, except: [:__meta__, :redirections]}
  schema "articles" do
    field :title, :string
    field :slug, :string
    field :content, :string
    field :comment_permissions, :integer
    field :pinned_at, :utc_datetime_usec, default: DateTime.from_unix!(0, :microsecond)

    belongs_to :category, Blog.Schemas.Category
    many_to_many :tags, Blog.Schemas.Tag, join_through: "articles_tags", on_replace: :delete
    has_many :redirections, Blog.Schemas.Redireticon, foreign_key: :dest_id

    status()
    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = article, attrs) when is_map(attrs) do
    article
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> assoc_constraint(:category)
    |> put_assoc(:tags, attrs[:tags] || attrs["tags"] || [])
    |> validate_required(@required_fields)
    |> unique_constraint(:slug, name: :articles_slug_index)
    |> slugify_field(:slug)
  end

  @doc false
  def pin_changeset(%__MODULE__{} = article, pinned_at) do
    article
    |> cast(%{pinned_at: pinned_at}, [:pinned_at])
  end

  @doc false
  def status_changeset(%__MODULE__{} = article, status) do
    article
    |> cast(%{status: status}, [:status])
  end

  @doc false
  def tags_changeset(%__MODULE__{} = article, tags) when is_list(tags) do
    article
    |> cast(%{}, [])
    |> put_assoc(:tags, tags)
  end
end

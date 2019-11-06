defmodule Blog.Schemas.Redirection do
  use Blog.Schema

  @required_fields ~w(source_slug dest_id)a
  @optional_fields ~w()a

  schema "redirections" do
    field :source_slug, :string

    belongs_to :article, Blog.Schemas.Article, foreign_key: :dest_id

    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = redirection, attrs) when is_map(attrs) do
    redirection
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> assoc_constraint(:article)
    |> validate_required(@required_fields)
    |> unique_constraint(:source_slug, name: :redirections_source_slug_index)
  end
end

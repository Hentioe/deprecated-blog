defmodule Blog.Schemas.Redireticon do
  use Blog.Schema

  @required_fields ~w(source dest_id)a
  @optional_fields ~w()a

  @derive {Jason.Encoder, except: [:__meta__, :article]}
  schema "redirections" do
    field :source, :string

    belongs_to :article, Blog.Schemas.Article, foreign_key: :dest_id

    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = rdireticon, attrs) when is_map(attrs) do
    rdireticon
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> assoc_constraint(:article)
    |> validate_required(@required_fields)
    |> unique_constraint(:source, name: :redirections_source_index)
  end
end

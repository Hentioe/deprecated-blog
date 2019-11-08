defmodule Blog.Schemas.Counter do
  use Blog.Schema

  @required_fields ~w(key val)a
  @optional_fields ~w()a

  @primary_key {:key, :string, []}
  schema "counters" do
    field :val, :integer

    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = counter, attrs) do
    counter
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end

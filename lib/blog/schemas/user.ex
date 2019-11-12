defmodule Blog.Schemas.User do
  use Blog.Schema

  @required_fields ~w(username nickname)a
  @optional_fields ~w(email avatar encrypted_password access_token)a

  schema "users" do
    field :username, :string
    field :nickname, :string
    field :email, :string
    field :avatar, :string
    field :encrypted_password, :string
    field :access_token, :string

    status()
    timestamps()
  end

  @doc false
  def changeset(%__MODULE__{} = user, attrs) do
    user
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end

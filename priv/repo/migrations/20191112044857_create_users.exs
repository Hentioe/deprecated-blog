defmodule Blog.Repo.Migrations.CreateUsers do
  use Blog.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :nickname, :string
      add :email, :string
      add :avatar, :string
      add :encrypted_password, :string
      add :access_token, :string

      timestamps()
    end

    create unique_index(:users, [:username])
  end
end

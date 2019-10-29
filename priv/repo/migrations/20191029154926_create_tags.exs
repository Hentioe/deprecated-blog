defmodule Blog.Repo.Migrations.CreateTags do
  use Blog.Migration

  def change do
    create table(:tags) do
      add :name, :string
      add :slug, :string
      add :description, :string
      add :color, :string

      timestamps()
    end

    create unique_index(:tags, [:slug])
  end
end

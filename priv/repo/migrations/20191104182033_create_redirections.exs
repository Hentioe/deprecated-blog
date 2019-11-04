defmodule Blog.Repo.Migrations.CreateRedirections do
  use Blog.Migration

  def change do
    create table(:redirections) do
      add :source_slug, :string, comment: "来源SLUG"

      add :dest_id, references(:articles), comment: "目标ID"

      timestamps()
    end

    create unique_index(:redirections, [:source_slug])
  end
end

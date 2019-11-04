defmodule Blog.Repo.Migrations.CreateRedirections do
  use Blog.Migration

  def change do
    create table(:redirections) do
      add :source, :string, comment: "来源"

      add :dest_id, references(:articles), comment: "目标ID"

      timestamps()
    end

    create unique_index(:redirections, [:source])
  end
end

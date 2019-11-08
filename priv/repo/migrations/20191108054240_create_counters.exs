defmodule Blog.Repo.Migrations.CreateCounters do
  use Blog.Migration

  def change do
    create table(:counters, primary_key: false) do
      add :key, :string, primary_key: true
      add :val, :integer

      timestamps()
    end
  end
end

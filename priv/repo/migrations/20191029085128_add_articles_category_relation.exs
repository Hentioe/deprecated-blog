defmodule Blog.Repo.Migrations.AddArticlesCategoryRelation do
  use Blog.Migration

  def change do
    alter table(:articles) do
      add :category_id, references(:categories)
    end
  end
end

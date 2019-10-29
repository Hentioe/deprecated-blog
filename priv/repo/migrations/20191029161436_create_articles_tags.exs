defmodule Blog.Repo.Migrations.CreateArticlesTags do
  use Blog.Migration

  def change do
    create table(:articles_tags) do
      add :article_id, references(:articles, on_delete: :delete_all)
      add :tag_id, references(:tags, on_delete: :delete_all)
    end

    create unique_index(:articles_tags, [:article_id, :tag_id])
  end
end

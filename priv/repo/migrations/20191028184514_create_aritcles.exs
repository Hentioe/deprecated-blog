defmodule Blog.Repo.Migrations.CreateAritcles do
  use Blog.Migration

  def change do
    create table(:articles) do
      add :title, :string, comment: "标题"
      add :slug, :string, comment: "路径"
      add :content, :string, comment: "内容"
      add :comment_permissions, :integer, comment: "评论权限"
      add :pinned_at, :utc_datetime_usec, comment: "置顶时间"

      status()
      timestamps()
    end

    create unique_index(:articles, [:slug])
  end
end

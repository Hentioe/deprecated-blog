defmodule Blog.Schemas.ArticleTest do
  use ExUnit.Case

  alias Blog.Factory
  alias Blog.Schemas.Article

  describe "schema" do
    test "schema metadata" do
      assert Article.__schema__(:source) == "articles"

      assert Article.__schema__(:fields) == [
               :id,
               :title,
               :slug,
               :content,
               :comment_permissions,
               :pinned_at,
               :category_id,
               :status,
               :inserted_at,
               :updated_at
             ]

      assert Article.__schema__(:primary_key) == [:id]
    end
  end

  test "changeset/2" do
    article = Factory.build(:article, category_id: 1)
    updated_title = "更新后的标题"
    updated_slug = "Updated Title"
    updated_content = "更新后的内容"

    params = %{
      "title" => updated_title,
      "slug" => updated_slug,
      "content" => updated_content
    }

    changes = %{
      title: updated_title,
      slug: "updated-title",
      content: updated_content
    }

    changeset = Article.changeset(article, params)
    assert changeset.params == params
    assert changeset.data == article
    assert changeset.changes == changes
    assert changeset.validations == []

    assert changeset.required == [
             :title,
             :slug,
             :content,
             :comment_permissions,
             :pinned_at,
             :category_id,
             :status
           ]

    assert changeset.valid?
  end
end

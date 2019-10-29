defmodule Blog.Business.ArticleTest do
  use Blog.DataCase

  alias Blog.Factory
  alias Blog.Business.Article

  def build_params do
    category = Repo.insert!(Factory.build(:category))
    article = Factory.build(:article)
    article = %{article | category_id: category.id}
    Map.from_struct(article)
  end

  test "create/1" do
    {:ok, _} = Article.create(build_params())
  end

  test "update/2" do
    {:ok, article} = Article.create(build_params())

    updated_title = "更新后的标题"
    updated_slug = "updated_title"
    updated_content = "更新后的内容。"
    updated_comment_permissions = 1
    updated_status = 0

    {:ok, article} =
      Article.update(article, %{
        "title" => updated_title,
        "slug" => updated_slug,
        "content" => updated_content,
        "comment_permissions" => updated_comment_permissions,
        "status" => updated_status
      })

    assert article.title == updated_title
    assert article.slug == updated_slug
    assert article.content == updated_content
    assert article.comment_permissions == updated_comment_permissions
    assert article.status == updated_status
  end

  test "change_status/1" do
    {:ok, article} = Article.create(build_params())

    {:ok, article} = Article.change_status(article, 0)

    assert article.status == 0
  end

  test "delete/1" do
    {:ok, article} = Article.create(build_params())

    {:ok, article} = Article.delete(article)

    assert article.__meta__.state == :deleted
  end

  test "pin/1" do
    {:ok, article} = Article.create(build_params())

    assert article.pinned_at == DateTime.from_unix!(0, :microsecond)

    {:ok, article} = Article.pin(article)

    assert article.pinned_at > DateTime.from_unix!(0, :microsecond)
  end

  test "unpin/1" do
    {:ok, article} = Article.create(build_params())
    {:ok, article} = Article.pin(article)

    assert article.pinned_at > DateTime.from_unix!(0, :microsecond)

    {:ok, article} = Article.unpin(article)

    assert article.pinned_at == DateTime.from_unix!(0, :microsecond)
  end

  test "find_by_slug/2" do
    {:ok, article} = Article.create(build_params())

    slug = article.slug

    article = Article.find_by_slug(article.slug, 1)

    assert article
    assert article.category

    {:ok, _} = Article.change_status(article, -1)

    article = Article.find_by_slug(slug, 1)

    assert article == nil

    article = Article.find_by_slug(slug, nil)

    assert article
  end

  test "find_list/1" do
    params = build_params()

    list =
      1..15
      |> Enum.map(fn i ->
        params = Map.put(params, :slug, "#{params[:slug]}-#{i}")
        {:ok, article} = Article.create(params)
        article
      end)

    assert Enum.count(Article.find_list(1, [])) == 15

    1..5
    |> Enum.each(fn i ->
      article = list |> Enum.at(i)
      {:ok, _} = Article.change_status(article, 0)
    end)

    6..10
    |> Enum.each(fn i ->
      article = list |> Enum.at(i)
      {:ok, _} = Article.change_status(article, -1)
    end)

    assert Enum.count(Article.find_list(1, [])) == 5
    assert Enum.count(Article.find_list(0, [])) == 5
    assert Enum.count(Article.find_list(-1, [])) == 5

    list = Article.find_list(nil, [])
    assert Enum.count(list) == 15

    list
    |> Enum.each(fn a ->
      assert a.content == nil
    end)

    {:ok, article} = Article.pin(Enum.at(Article.find_list(nil, []), 5))
    assert Enum.at(Article.find_list(nil, []), 0) == article
  end
end

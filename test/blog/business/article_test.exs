defmodule Blog.Business.ArticleTest do
  use Blog.DataCase

  alias Blog.Factory
  alias Blog.Business.Article

  def build_params(attrs \\ []) do
    category = Repo.insert!(Factory.build(:category))
    article = Factory.build(:article)

    article =
      article
      |> struct(category_id: category.id)
      |> struct(attrs)

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

    {:ok, article} = Article.change_status(article, :hidden)

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

  test "find/2" do
    {:ok, article} = Article.create(build_params())

    slug = article.slug

    {:ok, article} = Article.find(slug: slug, status: :normal)

    assert article
    assert article.category

    {:ok, _} = Article.change_status(article, :deleted)

    {:error, :not_found, _} = Article.find(slug: slug, status: :normal)

    {:ok, article} = Article.find(slug: slug)

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

    assert Enum.count(Article.find_list(status: :normal)) == 15

    1..5
    |> Enum.each(fn i ->
      article = list |> Enum.at(i)
      {:ok, _} = Article.change_status(article, :hidden)
    end)

    6..10
    |> Enum.each(fn i ->
      article = list |> Enum.at(i)
      {:ok, _} = Article.change_status(article, :deleted)
    end)

    assert Enum.count(Article.find_list(status: :normal)) == 5
    assert Enum.count(Article.find_list(status: :hidden)) == 5
    assert Enum.count(Article.find_list(status: :deleted)) == 5

    list = Article.find_list()
    assert Enum.count(list) == 15

    list
    |> Enum.each(fn a ->
      assert a.content == nil
    end)

    {:ok, article} = Article.pin(Enum.at(Article.find_list(), 5))
    assert Enum.at(Article.find_list(), 0) == article
  end

  test "find_list/1 with conditions" do
    {:ok, tag} = Blog.Business.create_tag(Map.from_struct(Factory.build(:tag)))
    params = build_params(tags: [tag])

    1..15
    |> Enum.map(fn i ->
      params = Map.put(params, :slug, "#{params[:slug]}-#{i}")
      {:ok, article} = Article.create(params)
      article
    end)

    list = Article.find_list(category_slug: "c-1")
    assert Enum.count(list) == 15
    assert Enum.count(Article.find_list(category_slug: "c-2")) == 0

    category = Enum.at(list, 0).category
    {:ok, _} = Blog.Business.update_category(category, %{slug: "c-2"})

    assert Enum.count(Article.find_list(category_slug: "c-2")) == 15

    assert Enum.count(Article.find_list(tag_slug: "t-1")) == 15

    {:ok, _} = Article.update_tags(Enum.at(list, 0), [])
    assert Enum.count(Article.find_list(tag_slug: "t-1")) == 14

    {:ok, _} = Blog.Business.delete_tag(tag)
    assert Enum.count(Article.find_list(tag_slug: "t-1")) == 0
  end

  test "find_redirected_list/0" do
    {:ok, a1} = Article.create(build_params())

    {:ok, a2} =
      :article
      |> Factory.build(slug: "article-2", category_id: a1.category_id)
      |> Map.from_struct()
      |> Article.create()

    list = Article.find_redirected_list()

    assert hd(list).id == a2.id

    {:ok, redirection} =
      Blog.Business.create_redirection(
        Map.from_struct(Factory.build(:redirection, dest_id: a1.id))
      )

    list = Article.find_redirected_list()

    assert hd(list).id == a1.id

    Blog.Business.delete_redirection(redirection)

    list = Article.find_redirected_list()

    assert hd(list).id == a2.id
  end
end

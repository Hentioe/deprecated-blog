defmodule Blog.Business.RedirectionTest do
  use Blog.DataCase

  alias Blog.Factory
  alias Blog.Business.Redirection

  def build_params(attrs \\ []) do
    article = Repo.insert!(Factory.build(:article))
    redirection = Factory.build(:redirection)

    redirection =
      redirection
      |> struct(dest_id: article.id)
      |> struct(attrs)

    Map.from_struct(redirection)
  end

  test "create/1" do
    {:ok, _} = Redirection.create(build_params())
  end

  test "update/2" do
    {:ok, redirection} = Redirection.create(build_params())

    updated_source_slug = "updated_source_slug"

    {:ok, redirection} =
      Redirection.update(redirection, %{
        "source_slug" => updated_source_slug
      })

    assert redirection.source_slug == updated_source_slug
  end

  test "delete/1" do
    {:ok, redirection} = Redirection.create(build_params())

    {:ok, redirection} = Redirection.delete(redirection)

    assert redirection.__meta__.state == :deleted
  end

  test "delete/1 with related destination" do
    {:ok, redirection} = Redirection.create(build_params())

    {:ok, article} = Blog.Business.get_article(redirection.dest_id)

    {:error, %{errors: errors}} = article |> Blog.Business.delete_article()
    [redirections: {reason, _}] = errors
    assert reason == "are still associated with this entry"

    {:ok, _} = Redirection.delete(redirection)
    {:ok, _} = Blog.Business.delete_article(article)
  end

  test "find_dest_slug/1" do
    {:ok, redirection} = Redirection.create(build_params())

    {:ok, dest_slug} = Redirection.find_dest_slug(redirection.source_slug)

    assert dest_slug == "title1"
  end
end

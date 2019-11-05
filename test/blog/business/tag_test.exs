defmodule Blog.Business.TagTest do
  use Blog.DataCase

  alias Blog.Factory
  alias Blog.Business.Tag

  def build_params do
    Map.from_struct(Factory.build(:tag))
  end

  test "create/1" do
    {:ok, _} = Tag.create(build_params())
  end

  test "update/2" do
    {:ok, tag} = Tag.create(build_params())

    updated_name = "更新后的名称"
    updated_slug = "Updated Title"
    updated_description = "更新后的描述。"

    {:ok, tag} =
      Tag.update(tag, %{
        "name" => updated_name,
        "slug" => updated_slug,
        "description" => updated_description
      })

    assert tag.name == updated_name
    assert tag.slug == "updated-title"
    assert tag.description == updated_description
  end

  test "delete/1" do
    {:ok, tag} = Tag.create(build_params())

    {:ok, tag} = Tag.delete(tag)

    assert tag.__meta__.state == :deleted
  end

  test "delete/1 with related articles" do
    {:ok, tag} = Tag.create(build_params())

    {:ok, category} = Blog.Business.create_category(Map.from_struct(Factory.build(:category)))

    {:ok, _} =
      Blog.Business.create_article(
        Map.from_struct(Factory.build(:article, category_id: category.id, tags: [tag]))
      )

    assert Enum.count(Blog.Business.find_article_list(tag_slug: tag.slug)) == 1

    {:ok, _} = Tag.delete(tag)

    assert Enum.count(Blog.Business.find_article_list(tag_slug: tag.slug)) == 0
  end

  test "find_list/0" do
    params = build_params()

    1..15
    |> Enum.map(fn i ->
      params = Map.put(params, :slug, "#{params[:slug]}-#{i}")
      {:ok, tag} = Tag.create(params)
      tag
    end)

    assert Enum.count(Tag.find_list()) == 15
  end
end

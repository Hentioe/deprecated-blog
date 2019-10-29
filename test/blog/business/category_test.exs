defmodule Blog.Business.CategoryTest do
  use Blog.DataCase

  alias Blog.Factory
  alias Blog.Business.Category

  def build_params do
    Map.from_struct(Factory.build(:category))
  end

  test "create/1" do
    {:ok, _} = Category.create(build_params())
  end

  test "update/2" do
    {:ok, category} = Category.create(build_params())

    updated_name = "更新后的名称"
    updated_slug = "Updated Title"
    updated_description = "更新后的描述。"

    {:ok, category} =
      Category.update(category, %{
        "name" => updated_name,
        "slug" => updated_slug,
        "description" => updated_description
      })

    assert category.name == updated_name
    assert category.slug == "updated-title"
    assert category.description == updated_description
  end

  test "delete/1" do
    {:ok, category} = Category.create(build_params())

    {:ok, category} = Category.delete(category)

    assert category.__meta__.state == :deleted
  end

  test "find_list/0" do
    params = build_params()

    1..15
    |> Enum.map(fn i ->
      params = Map.put(params, :slug, "#{params[:slug]}-#{i}")
      {:ok, category} = Category.create(params)
      category
    end)

    assert Enum.count(Category.find_list()) == 15
  end
end

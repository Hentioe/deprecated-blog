defmodule Blog.Schemas.CategoryTest do
  use ExUnit.Case

  alias Blog.Factory
  alias Blog.Schemas.Category

  describe "schema" do
    test "schema metadata" do
      assert Category.__schema__(:source) == "categories"

      assert Category.__schema__(:fields) == [
               :id,
               :name,
               :slug,
               :description,
               :inserted_at,
               :updated_at
             ]

      assert Category.__schema__(:primary_key) == [:id]
    end
  end

  test "changeset/2" do
    category = Factory.build(:category)
    updated_name = "更新后的标题"
    updated_slug = "Updated Name"
    updated_description = "更新后的描述。"

    params = %{
      "name" => updated_name,
      "slug" => updated_slug,
      "description" => updated_description
    }

    changes = %{
      name: updated_name,
      slug: "updated-name",
      description: updated_description
    }

    changeset = Category.changeset(category, params)
    assert changeset.params == params
    assert changeset.data == category
    assert changeset.changes == changes
    assert changeset.validations == []

    assert changeset.required == [
             :name,
             :slug
           ]

    assert changeset.valid?
  end
end

defmodule Blog.Schemas.TagTest do
  use ExUnit.Case

  alias Blog.Factory
  alias Blog.Schemas.Tag

  describe "schema" do
    test "schema metadata" do
      assert Tag.__schema__(:source) == "tags"

      assert Tag.__schema__(:fields) == [
               :id,
               :name,
               :slug,
               :description,
               :color,
               :inserted_at,
               :updated_at
             ]

      assert Tag.__schema__(:primary_key) == [:id]
    end
  end

  test "changeset/2" do
    tag = Factory.build(:tag)
    updated_name = "更新后的名称"
    updated_slug = "Updated Name"
    updated_description = "更新后的描述。"
    updated_color = "#000000"

    params = %{
      "name" => updated_name,
      "slug" => updated_slug,
      "description" => updated_description,
      "color" => updated_color
    }

    changes = %{
      name: updated_name,
      slug: "updated-name",
      description: updated_description,
      color: updated_color
    }

    changeset = Tag.changeset(tag, params)
    assert changeset.params == params
    assert changeset.data == tag
    assert changeset.changes == changes
    assert changeset.validations == []

    assert changeset.required == [
             :name,
             :slug
           ]

    assert changeset.valid?
  end
end

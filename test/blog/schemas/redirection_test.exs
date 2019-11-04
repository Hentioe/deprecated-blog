defmodule Blog.Schemas.RedirectionTest do
  use ExUnit.Case

  alias Blog.Factory
  alias Blog.Schemas.Redirection

  describe "schema" do
    test "schema metadata" do
      assert Redirection.__schema__(:source) == "redirections"

      assert Redirection.__schema__(:fields) == [
               :id,
               :source_slug,
               :dest_id,
               :inserted_at,
               :updated_at
             ]

      assert Redirection.__schema__(:primary_key) == [:id]
    end
  end

  test "changeset/2" do
    redirection = Factory.build(:redirection, dest_id: 1)
    updated_source_slug = "updated-source-slug"

    params = %{
      "source_slug" => updated_source_slug
    }

    changes = %{
      source_slug: updated_source_slug
    }

    changeset = Redirection.changeset(redirection, params)
    assert changeset.params == params
    assert changeset.data == redirection
    assert changeset.changes == changes
    assert changeset.validations == []

    assert changeset.required == [
             :source_slug,
             :dest_id
           ]

    assert changeset.valid?
  end
end

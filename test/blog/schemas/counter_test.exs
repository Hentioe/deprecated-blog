defmodule Blog.Schemas.CounterTest do
  use ExUnit.Case

  alias Blog.Factory
  alias Blog.Schemas.Counter

  describe "schema" do
    test "schema metadata" do
      assert Counter.__schema__(:source) == "counters"

      assert Counter.__schema__(:fields) == [
               :key,
               :val,
               :inserted_at,
               :updated_at
             ]

      assert Counter.__schema__(:primary_key) == [:key]
    end
  end

  test "changeset/2" do
    counter = Factory.build(:counter)
    updated_val = 999

    params = %{
      "val" => updated_val
    }

    changes = %{
      val: updated_val
    }

    changeset = Counter.changeset(counter, params)
    assert changeset.params == params
    assert changeset.data == counter
    assert changeset.changes == changes
    assert changeset.validations == []

    assert changeset.required == [
             :val
           ]

    assert changeset.valid?
  end
end

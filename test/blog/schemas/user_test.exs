defmodule Blog.Schemas.UserTest do
  use ExUnit.Case

  alias Blog.Factory
  alias Blog.Schemas.User

  describe "schema" do
    test "schema metadata" do
      assert User.__schema__(:source) == "users"

      assert User.__schema__(:fields) == [
               :id,
               :username,
               :nickname,
               :email,
               :avatar,
               :encrypted_password,
               :access_token,
               :status,
               :inserted_at,
               :updated_at
             ]

      assert User.__schema__(:primary_key) == [:id]
    end
  end

  test "changeset/2" do
    user = Factory.build(:user)
    updated_username = "updated-user-1"
    updated_nickname = "更新后的用户昵称"

    params = %{
      "username" => updated_username,
      "nickname" => updated_nickname
    }

    changes = %{
      username: updated_username,
      nickname: updated_nickname
    }

    changeset = User.changeset(user, params)
    assert changeset.params == params
    assert changeset.data == user
    assert changeset.changes == changes
    assert changeset.validations == []

    assert changeset.required == [
             :username,
             :nickname
           ]

    assert changeset.valid?
  end
end

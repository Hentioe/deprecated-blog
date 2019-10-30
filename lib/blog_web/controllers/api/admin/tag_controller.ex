defmodule BlogWeb.API.Admin.TagController do
  use BlogWeb, :controller
  alias Blog.Business

  action_fallback BlogWeb.FallbackController

  def index(conn, _params) do
    with categories <- Business.find_tag_list() do
      json(conn, categories)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, tag} <- Business.get_tag(id) do
      json(conn, tag)
    end
  end

  def create(conn, params) do
    with {:ok, tag} <- Business.create_tag(params) do
      json(conn, tag)
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, tag} <- Business.get_tag(id),
         {:ok, tag} <- Business.update_tag(tag, params) do
      json(conn, tag)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, tag} <- Business.get_tag(id),
         {:ok, tag} <- Business.delete_tag(tag) do
      json(conn, tag)
    end
  end
end

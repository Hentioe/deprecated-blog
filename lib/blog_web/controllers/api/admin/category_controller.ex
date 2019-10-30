defmodule BlogWeb.API.Admin.CategoryController do
  use BlogWeb, :controller
  alias Blog.Business

  action_fallback BlogWeb.FallbackController

  def index(conn, _params) do
    with categories <- Business.find_category_list() do
      json(conn, categories)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, category} <- Business.get_category(id) do
      json(conn, category)
    end
  end

  def create(conn, params) do
    with {:ok, category} <- Business.create_category(params) do
      json(conn, category)
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, category} <- Business.get_category(id),
         {:ok, category} <- Business.update_category(category, params) do
      json(conn, category)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, category} <- Business.get_category(id),
         {:ok, category} <- Business.delete_category(category) do
      json(conn, category)
    end
  end
end

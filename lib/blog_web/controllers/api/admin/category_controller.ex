defmodule BlogWeb.API.Admin.CategoryController do
  use BlogWeb, :controller

  action_fallback BlogWeb.FallbackController

  def index(conn, _params) do
    json(conn, %{})
  end

  def show(conn, _params) do
    json(conn, %{})
  end

  def create(conn, _params) do
    json(conn, %{})
  end

  def update(conn, _params) do
    json(conn, %{})
  end

  def delete(conn, _params) do
    json(conn, %{})
  end
end

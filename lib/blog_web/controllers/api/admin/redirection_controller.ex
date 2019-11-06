defmodule BlogWeb.API.Admin.RedirectionController do
  use BlogWeb, :controller
  alias Blog.Business

  action_fallback BlogWeb.FallbackController

  def create(conn, params) do
    with {:ok, redirection} <- Business.create_redirection(params) do
      render(conn, "show.json", redirection: redirection)
    end
  end

  def update(conn, %{"id" => id} = params) do
    with {:ok, redirection} <- Business.get_redirection(id),
         {:ok, redirection} <- Business.update_redirection(redirection, params) do
      render(conn, "show.json", redirection: redirection)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, redirection} <- Business.get_redirection(id),
         {:ok, redirection} <- Business.delete_redirection(redirection) do
      render(conn, "show.json", redirection: redirection)
    end
  end
end

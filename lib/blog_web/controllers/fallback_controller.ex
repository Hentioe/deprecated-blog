defmodule BlogWeb.FallbackController do
  use Phoenix.Controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(BlogWeb.ChangesetView)
    |> render("error.json", %{changeset: changeset})
  end

  def call(conn, {:error, :not_found, info}) do
    conn
    |> put_status(:not_found)
    |> put_view(BlogWeb.ChangesetView)
    |> render("404.json", %{info: info})
  end
end

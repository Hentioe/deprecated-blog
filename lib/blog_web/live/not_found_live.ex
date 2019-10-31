defmodule BlogWeb.NotFoundLive do
  alias BlogWeb.LiveView
  use LiveView, view: :user

  def render(assigns) do
    Phoenix.View.render(UserView, "404.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, assign(socket, [])}
  end
end

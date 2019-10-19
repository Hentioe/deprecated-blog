defmodule BlogWeb.Admin.IndexLive do
  alias BlogWeb.LiveView
  use LiveView, view: :admin

  def render(assigns) do
    Phoenix.View.render(AdminView, "index.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, socket}
  end
end

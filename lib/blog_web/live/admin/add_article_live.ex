defmodule BlogWeb.Admin.AddArticleLive do
  alias BlogWeb.LiveView
  use LiveView, view: :admin

  def render(assigns) do
    Phoenix.View.render(AdminView, "add_article.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, socket}
  end
end

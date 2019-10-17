defmodule BlogWeb.IndexLive do
  alias BlogWeb.{LiveView, PageView}
  use LiveView, container: {:div, class: "bl-page"}

  def render(assigns) do
    Phoenix.View.render(PageView, "index.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, assign(socket, [])}
  end
end

defmodule BlogWeb.SidefooterLive do
  alias BlogWeb.{LiveView, PageView}
  use LiveView, container: {:div, class: "bl-sidefooter"}

  def render(assigns) do
    Phoenix.View.render(PageView, "sidefooter.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, assign(socket, [])}
  end
end

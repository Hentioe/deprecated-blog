defmodule BlogWeb.SidefooterLive do
  alias BlogWeb.{LiveView, UserView}
  use LiveView, container: {:div, class: "bl-sidefooter"}

  def render(assigns) do
    Phoenix.View.render(UserView, "sidefooter.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, assign(socket, [])}
  end
end

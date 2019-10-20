defmodule BlogWeb.Admin.DashboardLive do
  alias BlogWeb.LiveView
  use LiveView, view: :admin

  def render(assigns) do
    Phoenix.View.render(AdminView, "dashboard.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, socket}
  end

  def handle_params(_params, uri, socket) do
    path = Routes.dashboard_path(socket, __MODULE__)

    unless uri |> String.ends_with?(path) do
      {:noreply, live_redirect(socket, to: path, replace: true)}
    else
      {:noreply, socket}
    end
  end
end

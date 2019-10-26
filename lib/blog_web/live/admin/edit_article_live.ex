defmodule BlogWeb.Admin.EditArticleLive do
  alias BlogWeb.LiveView
  use LiveView, view: :admin

  def render(assigns) do
    Phoenix.View.render(AdminView, "edit_article.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, socket}
  end

  def handle_params(params, _uri, socket) do
    id = params["id"]

    if id do
      _id = to_i(id)
      # 存在编辑目标
    else
      # 不存在编辑目标
      {:noreply, socket |> assign(id: id)}
    end
  end
end

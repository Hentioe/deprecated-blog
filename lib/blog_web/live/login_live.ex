defmodule BlogWeb.LoginLive do
  alias BlogWeb.LiveView
  use LiveView, view: :user

  def render(assigns) do
    Phoenix.View.render(UserView, "login.html", assigns)
  end

  def mount(_attrs, socket) do
    {:ok, socket |> assign(errors: nil, token: nil, ok: nil)}
  end

  def handle_event("login", %{"username" => username, "password" => password}, socket) do
    config = Application.get_env(:blog, BlogWeb.Endpoint)

    if username == config[:username] and password == config[:password] do
      token = Phoenix.Token.sign(BlogWeb.Endpoint, "user_id", 0)
      {:noreply, socket |> assign(token: token, ok: true)}
    else
      {:noreply, socket |> assign(errors: "登录失败")}
    end
  end
end

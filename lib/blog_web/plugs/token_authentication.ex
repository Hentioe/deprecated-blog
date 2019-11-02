defmodule BlogWeb.Plugs.TokenAuthentication do
  import Plug.Conn

  def init(opts) do
    opts
  end

  def call(%{req_cookies: %{"token" => token}} = conn, otps) do
    passed =
      case Phoenix.Token.verify(BlogWeb.Endpoint, "user_id", token, max_age: 60 * 60 * 24 * 15) do
        {:ok, 0} -> true
        _ -> false
      end

    with false <- passed && conn do
      case otps[:from] do
        :api ->
          conn |> resp_unauthorized()

        :page ->
          conn |> redirect_to_login()
      end
    end
  end

  # 缺少 token
  def call(conn, otps) do
    case otps[:from] do
      :api ->
        conn |> resp_unauthorized()

      :page ->
        conn |> redirect_to_login()
    end
  end

  defp redirect_to_login(%Plug.Conn{} = conn) do
    path = BlogWeb.Router.Helpers.live_path(conn, BlogWeb.LoginLive)

    conn
    |> Phoenix.Controller.redirect(to: path)
    |> halt()
  end

  defp resp_unauthorized(%Plug.Conn{} = conn) do
    conn
    |> put_status(:unauthorized)
    |> Phoenix.Controller.json(%{errors: ["missing token"]})
  end
end

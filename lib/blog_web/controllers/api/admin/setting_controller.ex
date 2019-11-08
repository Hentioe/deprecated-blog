defmodule BlogWeb.API.Admin.SettingController do
  use BlogWeb, :controller

  action_fallback BlogWeb.FallbackController

  def preview(conn, _params) do
    render(conn, "preview.json", counter_sync_time: Blog.Counter.sync_time())
  end

  def counter_sync(conn, _params) do
    render(conn, "counter.json", sync_time: Blog.Counter.sync_now())
  end
end

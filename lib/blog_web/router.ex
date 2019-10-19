defmodule BlogWeb.Router do
  use BlogWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug Phoenix.LiveView.Flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :user_layout do
    plug :put_layout, {BlogWeb.LayoutView, :user}
  end

  pipeline :admin_layout do
    plug :put_layout, {BlogWeb.LayoutView, :admin}
  end

  scope "/", BlogWeb do
    pipe_through [:browser, :user_layout]

    live "/", IndexLive
    live "/c/:category_id", IndexLive, as: :clist
    live "/t/:tag_id", IndexLive, as: :tlist
    live "/p/:query_title", ArticleLive
  end

  scope "/admin", BlogWeb.Admin do
    pipe_through [:browser, :admin_layout]

    live "/", IndexLive
  end

  # Other scopes may use custom stacks.
  # scope "/api", BlogWeb do
  #   pipe_through :api
  # end
end

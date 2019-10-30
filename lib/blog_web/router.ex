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

    get "/*path", PageController, :index
  end

  scope "/api/admin", BlogWeb.API.Admin do
    pipe_through [:api]

    resources "/categories", CategoryController, except: [:new, :edit]
    resources "/tags", TagController, except: [:new, :edit]
    put "/articles/:id/draft", ArticleController, :draft
    put "/articles/:id/recycle", ArticleController, :recycle
    put "/articles/:id/restore", ArticleController, :restore
    get "/articles/drafted", ArticleController, :drafted_list
    get "/articles/recycled", ArticleController, :recycled_list
    resources "/articles", ArticleController, except: [:new, :edit]
  end
end

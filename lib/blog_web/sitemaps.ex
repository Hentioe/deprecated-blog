defmodule BlogWeb.Sitemaps do
  alias BlogWeb.Endpoint
  alias BlogWeb.Router.Helpers, as: Routes
  alias Blog.Business

  use Sitemap,
    host: "https://blog.bluerain.io",
    files_path: "priv/static/sitemaps/",
    public_path: "sitemaps/"

  def generate do
    list = Business.find_article_list(status: :normal)

    create do
      add(Routes.live_path(Endpoint, BlogWeb.IndexLive), changefreq: "hourly", priority: 1.0)

      list
      |> Enum.each(fn a ->
        add(Routes.live_path(Endpoint, BlogWeb.ArticleLive, a.slug),
          changefreq: "daily",
          lastmod: a.updated_at,
          priority: 0.8
        )
      end)
    end
  end
end

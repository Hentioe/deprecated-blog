defmodule BlogWeb.IndexLive do
  alias BlogWeb.LiveView
  use LiveView, view: :user

  alias Blog.Business

  def render(assigns) do
    Phoenix.View.render(UserView, "index.html", assigns)
  end

  def mount(_attrs, socket) do
    categories = Business.find_category_list()
    tags = Business.find_tag_list()
    {:ok, socket |> assign(categories: categories, tags: tags)}
  end

  def handle_params(params, _uri, socket) do
    category_slug = params["category_slug"]
    tag_slug = params["tag_slug"]

    {:noreply, socket |> assign(category_slug: category_slug, tag_slug: tag_slug) |> fetch()}
  end

  def fetch(%Socket{assigns: %{category_slug: category_slug, tag_slug: tag_slug}} = socket) do
    socket |> assign(articles: find_articles(category_slug: category_slug, tag_slug: tag_slug))
  end

  def find_articles(category_slug: category_slug, tag_slug: tag_slug) do
    Business.find_article_list(status: :normal, category_slug: category_slug, tag_slug: tag_slug)
  end
end

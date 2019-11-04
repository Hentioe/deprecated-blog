defmodule BlogWeb.ArticleLive do
  alias BlogWeb.LiveView
  use LiveView, view: :user

  alias Blog.Business

  def render(assigns) do
    case assigns[:error] do
      :not_found ->
        Phoenix.View.render(UserView, "404.html", assigns |> Map.put(:from, "文章"))

      nil ->
        Phoenix.View.render(UserView, "article.html", assigns)
    end
  end

  @markdown_opts %Earmark.Options{
    code_class_prefix: "lang-",
    smartypants: false
  }

  def mount(_attrs, socket) do
    {:ok, socket}
  end

  def handle_params(params, _uri, socket) do
    slug = params["slug"]

    with {:ok, socket} <- socket |> assign(slug: slug) |> fetch() do
      {:noreply, socket}
    else
      {:error, :not_found, _} -> {:noreply, socket |> assign(error: :not_found)}
    end
  end

  def fetch(%Socket{assigns: %{slug: slug}} = socket) do
    with {:ok, article} <- find_article(slug) do
      socket = socket |> assign(article: article)
      {:ok, socket}
    else
      error -> error
    end
  end

  def find_article(slug) do
    with {:ok, article} <- Business.find_article_by_slug(slug) do
      html =
        case article.content |> Earmark.as_html(@markdown_opts) do
          {:ok, html, _} -> html
          {:error, _, message} -> "Earmark parsing error:\n #{message}"
        end

      {:ok, %{article | content: html}}
    else
      error -> error
    end
  end
end

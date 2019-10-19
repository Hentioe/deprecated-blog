defmodule BlogWeb.ArticleLive do
  alias BlogWeb.LiveView
  use LiveView, view: :user

  def render(assigns) do
    Phoenix.View.render(UserView, "article.html", assigns)
  end

  @markdown_opts %Earmark.Options{
    code_class_prefix: "lang-",
    smartypants: false
  }

  @article %{
    id: 100_001,
    title: "我是文章的标题",
    query_title: "i-am-an-article",
    content:
      :blog
      |> Application.app_dir("priv/data/article.md")
      |> File.read!()
  }

  def mount(_attrs, socket) do
    {:ok, socket}
  end

  def handle_params(params, _uri, socket) do
    query_title = params["query_title"]

    {:noreply, socket |> assign(query_title: query_title) |> fetch()}
  end

  def fetch(%Socket{assigns: %{query_title: query_title}} = socket) do
    socket |> assign(article: find_article(query_title))
  end

  def find_article(_query_title) do
    html_content =
      case @article.content |> Earmark.as_html(@markdown_opts) do
        {:ok, html, _} -> html
        {:error, _, message} -> "Markdown document parsing failed, reason:\n #{message}"
      end

    %{@article | content: html_content}
  end
end

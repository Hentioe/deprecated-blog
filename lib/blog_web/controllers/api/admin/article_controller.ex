defmodule BlogWeb.API.Admin.ArticleController do
  use BlogWeb, :controller
  alias Blog.Business
  alias BlogWeb.Sitemaps

  action_fallback BlogWeb.FallbackController

  def index(conn, _params) do
    with articles <- Business.find_article_list() do
      render(conn, "index.json", articles: articles)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id) do
      render(conn, "show.json", article: article)
    end
  end

  defp fetch_tags(params) do
    tags = params["tags"] || []

    tags =
      tags
      |> Enum.map(fn %{"id" => id} ->
        case Business.get_tag(id) do
          {:ok, tag} -> tag
          _ -> nil
        end
      end)
      |> Enum.filter(fn tag -> tag end)

    params |> Map.put("tags", tags)
  end

  def create(conn, params) do
    params = params |> fetch_tags()

    with {:ok, article} <- Business.create_article(params) do
      # 更新网站地图
      if article.status == 1 do
        Sitemaps.generate()
      end

      render(conn, "show.json", article: article)
    end
  end

  def update(conn, %{"id" => id} = params) do
    params = params |> fetch_tags()

    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.update_article(article, params) do
      # 更新网站地图
      if article.status == 1 do
        Sitemaps.generate()
      end

      render(conn, "show.json", article: article)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.delete_article(article) do
      render(conn, "show.json", article: article)
    end
  end

  def draft(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.change_article_status(article, :hidden) do
      render(conn, "show.json", article: article)
    end
  end

  def recycle(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.change_article_status(article, :deleted) do
      render(conn, "show.json", article: article)
    end
  end

  def restore(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.change_article_status(article, :normal) do
      # 更新网站地图
      Sitemaps.generate()
      render(conn, "show.json", article: article)
    end
  end

  def pin(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.pin_article(article) do
      # 更新网站地图
      if article.status == 1 do
        Sitemaps.generate()
      end

      render(conn, "show.json", article: article)
    end
  end

  def unpin(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.unpin_article(article) do
      # 更新网站地图
      if article.status == 1 do
        Sitemaps.generate()
      end

      render(conn, "show.json", article: article)
    end
  end

  def drafted_list(conn, _params) do
    with articles <- Business.find_article_list(status: :hidden) do
      render(conn, "index.json", articles: articles)
    end
  end

  def recycled_list(conn, _params) do
    with articles <- Business.find_article_list(status: :deleted) do
      render(conn, "index.json", articles: articles)
    end
  end

  def normal_list(conn, _params) do
    with articles <- Business.find_article_list(status: :normal) do
      render(conn, "index.json", articles: articles)
    end
  end

  def non_normal_list(conn, _params) do
    with articles <- Business.find_article_list(status: :non_normal) do
      render(conn, "index.json", articles: articles)
    end
  end

  @markdown_opts %Earmark.Options{
    smartypants: false
  }

  def preview(conn, %{"content" => content}) do
    html =
      case content |> Earmark.as_html(@markdown_opts) do
        {:ok, html, _} -> html
        {:error, _, message} -> "Earmark parsing error:\n #{message}"
      end

    render(conn, "preview.json", html: html)
  end

  def redirected_list(conn, _params) do
    with articles <- Business.find_redirected_article_list() do
      render(conn, "redirected_list.json", articles: articles)
    end
  end
end

defmodule BlogWeb.API.Admin.ArticleController do
  use BlogWeb, :controller
  alias Blog.Business

  action_fallback BlogWeb.FallbackController

  def index(conn, _params) do
    with categories <- Business.find_article_list(nil) do
      json(conn, categories)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id) do
      json(conn, article)
    end
  end

  def create(conn, params) do
    with {:ok, article} <- Business.create_article(params) do
      json(conn, article)
    end
  end

  def update(conn, %{"id" => id} = params) do
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

    params = params |> Map.put("tags", tags)

    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.update_article(article, params) do
      json(conn, article)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.delete_article(article) do
      json(conn, article)
    end
  end

  def draft(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.draft_article(article) do
      json(conn, article)
    end
  end

  def recycle(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.recycle_article(article) do
      json(conn, article)
    end
  end

  def restore(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.restore_article(article) do
      json(conn, article)
    end
  end

  def pin(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.pin_article(article) do
      json(conn, article)
    end
  end

  def unpin(conn, %{"id" => id}) do
    with {:ok, article} <- Business.get_article(id),
         {:ok, article} <- Business.unpin_article(article) do
      json(conn, article)
    end
  end

  def drafted_list(conn, _params) do
    with categories <- Business.drafted_article_list() do
      json(conn, categories)
    end
  end

  def recycled_list(conn, _params) do
    with categories <- Business.recycled_article_list() do
      json(conn, categories)
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

    text(conn, html)
  end
end

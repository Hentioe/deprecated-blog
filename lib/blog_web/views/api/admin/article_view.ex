defmodule BlogWeb.API.Admin.ArticleView do
  use BlogWeb, :view

  alias BlogWeb.API.Admin.RedirectionView

  def render("index.json", %{articles: articles}) do
    render_many(articles, __MODULE__, "show.json")
  end

  def render("show.json", %{article: article}) do
    render_one(article, __MODULE__, "article.json")
  end

  def render("article.json", %{article: article}) do
    article |> Map.drop([:__meta__, :redirections]) |> Map.from_struct()
  end

  def render("preview.json", %{html: html}) do
    %{html: html}
  end

  def render("redirected_list.json", %{articles: articles}) do
    render_many(articles, __MODULE__, "redirected.json")
  end

  def render("redirected.json", %{article: article}) do
    article
    |> Map.drop([:__meta__, :category, :tags])
    |> Map.put(
      :redirections,
      render_many(article.redirections, RedirectionView, "show.json")
    )
    |> Map.from_struct()
  end
end

defmodule BlogWeb.IndexLive do
  alias BlogWeb.LiveView
  use LiveView, view: :user

  def render(assigns) do
    Phoenix.View.render(UserView, "index.html", assigns)
  end

  @csum 7
  @categories 1..@csum
              |> Enum.map(fn i -> %{id: 10000 + i, name: "文章类别#{i}"} end)
  @tsum 15
  @tags 1..@tsum
        |> Enum.map(fn i -> %{id: 10000 + i, name: "标签-#{i}"} end)
  @articles 1..45
            |> Enum.map(fn i ->
              %{
                id: 10000 + i,
                title: "我是文章的标题#{i}",
                query_title: "i-am-an-article-#{i}",
                rsum: Enum.random(0..24),
                category_id: Enum.random(10001..(10000 + @csum)),
                tags:
                  1..3
                  |> Enum.map(fn _ ->
                    %{id: Enum.random(10001..(10000 + @tsum))}
                  end)
              }
            end)

  def mount(_attrs, socket) do
    {:ok, socket |> assign(categories: @categories, tags: @tags)}
  end

  def handle_params(params, _uri, socket) do
    category_id = to_i(params["category_id"])
    tag_id = to_i(params["tag_id"])

    {:noreply, socket |> assign(category_id: category_id, tag_id: tag_id) |> fetch()}
  end

  def fetch(%Socket{assigns: %{category_id: category_id, tag_id: tag_id}} = socket) do
    socket |> assign(articles: find_articles(category_id: category_id, tag_id: tag_id))
  end

  def find_articles(category_id: category_id, tag_id: tag_id) do
    cond do
      category_id ->
        @articles |> Enum.filter(fn a -> a.category_id == category_id end)

      tag_id ->
        @articles
        |> Enum.filter(fn a ->
          tags =
            a.tags
            |> Enum.filter(fn t -> tag_id == t.id end)

          Enum.count(tags) > 0
        end)

      true ->
        @articles
    end
  end
end

defmodule Blog.Business do
  alias __MODULE__.{Article}

  @status %{normal: 1, hidden: 0, deleted: -1}

  defdelegate find_list(slug, status \\ @status.normal), to: Article, as: :find_by_slug
  defdelegate find_article_by_slug(slug, status \\ @status.normal), to: Article, as: :find_by_slug
  defdelegate create_article(params), to: Article, as: :create
  defdelegate update_article(article, attrs), to: Article, as: :update
  def drafted_article(article), do: Article.change_status(article, @status.hidden)
  def recycled_article(article), do: Article.change_status(article, @status.deleted)
  defdelegate delete_article(article), to: Article, as: :delete
end

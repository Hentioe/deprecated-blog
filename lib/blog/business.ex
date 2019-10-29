defmodule Blog.Business do
  alias __MODULE__.{Article}

  @status %{normal: 1, hidden: 0, deleted: -1}

  defdelegate find_article_list(status \\ @status.normal, conds \\ []),
    to: Article,
    as: :find_list

  defdelegate find_article_by_slug(slug, status \\ @status.normal), to: Article, as: :find_by_slug
  defdelegate create_article(params), to: Article, as: :create
  defdelegate update_article(article, attrs), to: Article, as: :update
  defdelegate pin_article(article), to: Article, as: :pin
  defdelegate unpin_article(article), to: Article, as: :unpin
  defdelegate delete_article(article), to: Article, as: :delete
  def draft_article(article), do: Article.change_status(article, @status.hidden)
  def recycle_article(article), do: Article.change_status(article, @status.deleted)
  def drafted_article_list, do: find_article_list(@status.hidden)
  def recycled_article_list, do: find_article_list(@status.deleted)
end

defmodule Blog.Business.Article do
  alias Blog.Repo
  import Ecto.Query, only: [where: 2, dynamic: 2, order_by: 3]
  alias Blog.Schemas.{Article}

  def find_by_slug(slug, status) when is_bitstring(slug) do
    conds = [slug: slug |> String.trim()]

    conds =
      if status do
        Keyword.merge(conds, status: status)
      else
        conds
      end

    Article |> Repo.get_by(conds)
  end

  def find_list(status) do
    filter_status =
      if status do
        dynamic([a], a.status == ^status)
      else
        true
      end

    Article
    |> where(^filter_status)
    |> order_by([a], desc: a.pinned_at, desc: a.inserted_at)
    |> Repo.all()
  end

  def create(params) do
    %Article{}
    |> Article.changeset(params)
    |> Repo.insert()
  end

  def update(%Article{} = article, attrs) do
    article
    |> Article.changeset(attrs)
    |> Repo.update()
  end

  def change_status(%Article{} = article, status) do
    update(article, %{status: status})
  end

  def pin(%Article{} = article) do
    update(article, %{pinned_at: DateTime.utc_now()})
  end

  def unpin(%Article{} = article) do
    update(article, %{pinned_at: DateTime.from_unix!(0, :microsecond)})
  end

  def delete(%Article{} = article) do
    article |> Repo.delete()
  end
end

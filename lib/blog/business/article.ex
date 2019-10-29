defmodule Blog.Business.Article do
  alias Blog.Repo
  import Ecto.Query, only: [where: 2, dynamic: 2, order_by: 3, preload: 2, select: 3]
  alias Blog.Schemas.{Article}

  def find_by_slug(slug, status) when is_bitstring(slug) do
    conds = [slug: slug |> String.trim()]

    conds =
      if status do
        Keyword.merge(conds, status: status)
      else
        conds
      end

    Article |> preload(:category) |> Repo.get_by(conds)
  end

  @find_list_fields Article.fields(excludes: [:content])

  def find_list(status, conds) when is_list(conds) do
    filter_status =
      if status do
        dynamic([a], a.status == ^status)
      else
        true
      end

    filter_category =
      if category_id = conds[:category_id] do
        dynamic([a], a.category_id == ^category_id)
      else
        true
      end

    Article
    |> select([a], struct(a, ^@find_list_fields))
    |> where(^filter_status)
    |> where(^filter_category)
    |> order_by([a], desc: a.pinned_at, desc: a.inserted_at)
    |> preload(:category)
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
    article
    |> Article.status_changeset(status)
    |> Repo.update()
  end

  def pin(%Article{} = article) do
    article
    |> Article.pin_changeset(DateTime.utc_now())
    |> Repo.update()
  end

  def unpin(%Article{} = article) do
    article
    |> Article.pin_changeset(DateTime.from_unix!(0, :microsecond))
    |> Repo.update()
  end

  def delete(%Article{} = article) do
    article |> Repo.delete()
  end
end

defmodule Blog.Business.Article do
  use Blog.Business, schema: Blog.Schemas.Article
  import Ecto.Query

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
      if category_slug = conds[:category_slug] do
        dynamic([a, c], c.slug == ^category_slug)
      else
        true
      end

    filter_tag =
      if tag_slug = conds[:tag_slug] do
        dynamic([a, ..., t], t.slug == ^tag_slug)
      else
        true
      end

    Repo.all(
      from a in Article,
        select: struct(a, ^@find_list_fields),
        join: c in assoc(a, :category),
        left_join: t in assoc(a, :tags),
        where: ^filter_status,
        where: ^filter_category,
        where: ^filter_tag,
        order_by: [desc: a.pinned_at, desc: a.inserted_at],
        preload: [category: c],
        preload: [tags: t]
    )
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

  def update_tags(%Article{} = article, tags) do
    article
    |> Article.tags_changeset(tags)
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

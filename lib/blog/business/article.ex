defmodule Blog.Business.Article do
  @preload [:category, :tags]

  use Blog.Business, schema: Blog.Schemas.Article, preload: @preload
  import Ecto.Query

  defp preload({:error, %Ecto.Changeset{} = _} = error) do
    error
  end

  defp preload({:ok, article}) do
    article = article |> Repo.preload(@preload)
    {:ok, article}
  end

  def find_by_slug(slug, status) when is_bitstring(slug) do
    conds = [slug: slug |> String.trim()]

    conds =
      if status do
        Keyword.merge(conds, status: status)
      else
        conds
      end

    case Article |> preload(:category) |> preload(:tags) |> Repo.get_by(conds) do
      nil -> {:error, :not_found, %{entry: Article, params: %{slug: slug}}}
      article -> {:ok, article}
    end
  end

  @find_list_fields Article.fields(excludes: [:content])

  def find_list(status, conds) when is_list(conds) do
    filter_status =
      if status do
        case status do
          :non_normal -> dynamic([a], a.status != 1)
          :non_hidden -> dynamic([a], a.status != 0)
          :non_deleted -> dynamic([a], a.status != -1)
          _ -> dynamic([a], a.status == ^status)
        end
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
    |> preload()
  end

  def update(%Article{} = article, attrs) do
    article
    |> Article.changeset(attrs)
    |> Repo.update()
    |> preload()
  end

  def change_status(%Article{} = article, status) do
    article
    |> Article.status_changeset(status)
    |> Repo.update()
    |> preload()
  end

  def update_tags(%Article{} = article, tags) do
    article
    |> Article.tags_changeset(tags)
    |> Repo.update()
    |> preload()
  end

  def pin(%Article{} = article) do
    article
    |> Article.pin_changeset(DateTime.utc_now())
    |> Repo.update()
    |> preload()
  end

  def unpin(%Article{} = article) do
    article
    |> Article.pin_changeset(DateTime.from_unix!(0, :microsecond))
    |> Repo.update()
    |> preload()
  end

  def delete(%Article{} = article) do
    article
    |> Ecto.Changeset.change()
    |> Ecto.Changeset.no_assoc_constraint(:redirections)
    |> Repo.delete()
  end
end

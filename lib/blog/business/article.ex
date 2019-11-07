defmodule Blog.Business.Article do
  @preload [:category, :tags]

  use Blog.Business, schema: Blog.Schemas.Article, preload: @preload
  import Ecto.Query

  @status %{normal: 1, hidden: 0, deleted: -1}
  @find_list_fields Article.fields(excludes: [:content])

  defp preload({:error, %Ecto.Changeset{} = _} = error) do
    error
  end

  defp preload({:ok, article}) do
    article = article |> Repo.preload(@preload)
    {:ok, article}
  end

  defp map_to_i(status) when is_atom(status) do
    case status do
      :non_normal -> {:uneq, @status.normal}
      :non_hidden -> {:uneq, @status.hidden}
      :non_deleted -> {:uneq, @status.deleted}
      :normal -> {:eq, @status.normal}
      :hidden -> {:eq, @status.hidden}
      :deleted -> {:eq, @status.deleted}
      _ -> {:error, :unknown}
    end
  end

  def find(conds) when is_list(conds) do
    filter_slug =
      if slug = conds[:slug] do
        dynamic([a], a.slug == ^slug)
      end

    filter_status =
      if status = conds[:status] do
        case map_to_i(status) do
          {:uneq, status} -> dynamic([a], a.status != ^status)
          {:eq, status} -> dynamic([a], a.status == ^status)
          _ -> true
        end
      else
        true
      end

    article =
      Repo.one(
        from a in Article,
          where: ^filter_slug,
          where: ^filter_status,
          preload: [:category, :tags]
      )

    case article do
      nil -> {:error, :not_found, %{entry: Article, params: %{slug: slug, status: status}}}
      article -> {:ok, article}
    end
  end

  def find_redirected_list do
    Repo.all(
      from a in Article,
        select: struct(a, ^@find_list_fields),
        left_join: r in assoc(a, :redirections),
        order_by: [desc: count(r.id), desc: a.id],
        group_by: [a.id, r.id],
        preload: [redirections: r]
    )
  end

  def find_list(conds \\ []) when is_list(conds) do
    filter_status =
      if status = conds[:status] do
        case map_to_i(status) do
          {:uneq, status} ->
            dynamic([a], a.status != ^status)

          {:eq, status} ->
            dynamic([a], a.status == ^status)

          _ ->
            true
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
    fun = fn ->
      dest_slug = attrs[:slug] || attrs["slug"]

      # 如果 SLUG 发生变化，并且目标 SLUG 不存在，则添加重定向
      if article.slug != dest_slug and Blog.Business.find_redirected_slug(article.slug) == nil do
        {:ok, _} =
          Blog.Business.create_redirection(%{dest_id: article.id, source_slug: article.slug})
      end

      # 更新文章
      {:ok, article} =
        article
        |> Article.changeset(attrs)
        |> Repo.update()
        |> preload()

      article
    end

    try do
      Repo.transaction(fun)
    rescue
      e in MatchError -> e.term
    end
  end

  def change_status(%Article{} = article, status) when is_atom(status) do
    {:eq, status} = map_to_i(status)

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

defmodule Blog.Business.Redirection do
  use Blog.Business, schema: Blog.Schemas.Redirection
  import Ecto.Query, only: [preload: 2]

  def find_dest_slug(source_slug) when is_bitstring(source_slug) do
    case Redirection |> preload(:article) |> Repo.get_by(source_slug: String.trim(source_slug)) do
      nil ->
        {:error, :not_found, %{entry: Redirection, params: %{slug: source_slug}}}

      redirection ->
        {:ok, redirection.article.slug}
    end
  end

  def create(params) do
    %Redirection{}
    |> Redirection.changeset(params)
    |> Repo.insert()
  end

  def update(%Redirection{} = tag, attrs) do
    tag
    |> Redirection.changeset(attrs)
    |> Repo.update()
  end

  def delete(%Redirection{} = tag) do
    tag
    |> Repo.delete()
  end
end

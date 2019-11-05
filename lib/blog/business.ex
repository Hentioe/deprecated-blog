defmodule Blog.Business do
  defmacro __using__(opts) do
    schema_module = opts[:schema]
    preload = opts[:preload]

    {_, _, [:Blog, :Schemas, name]} = schema_module

    quote do
      alias unquote(schema_module)
      alias Blog.Repo

      def get(id) do
        case unquote(schema_module) |> Repo.get(id) do
          nil ->
            {:error, :not_found, %{entry: unquote(name), params: %{id: id}}}

          s ->
            s =
              if unquote(preload) != nil do
                Repo.preload(s, unquote(preload))
              else
                s
              end

            {:ok, s}
        end
      end
    end
  end

  alias __MODULE__.{Article, Category, Tag}

  defdelegate find_article_list(conds \\ []),
    to: Article,
    as: :find_list

  defdelegate get_article(id), to: Article, as: :get
  defdelegate find_article(conds), to: Article, as: :find
  defdelegate create_article(params), to: Article, as: :create
  defdelegate update_article(article, attrs), to: Article, as: :update
  defdelegate update_article_tags(article, tags), to: Article, as: :update_tags
  defdelegate pin_article(article), to: Article, as: :pin
  defdelegate unpin_article(article), to: Article, as: :unpin
  defdelegate delete_article(article), to: Article, as: :delete
  defdelegate change_article_status(article, status), to: Article, as: :change_status

  defdelegate get_category(id), to: Category, as: :get
  defdelegate find_category_list, to: Category, as: :find_list
  defdelegate create_category(params), to: Category, as: :create
  defdelegate update_category(category, attrs), to: Category, as: :update
  defdelegate delete_category(category), to: Category, as: :delete

  defdelegate get_tag(id), to: Tag, as: :get
  defdelegate find_tag_list, to: Tag, as: :find_list
  defdelegate create_tag(params), to: Tag, as: :create
  defdelegate update_tag(tag, attrs), to: Tag, as: :update
  defdelegate delete_tag(tag), to: Tag, as: :delete
end

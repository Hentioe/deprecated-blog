defmodule Blog.Schema do
  defmacro __using__(_) do
    quote do
      use Ecto.Schema
      import Blog.Schema
      import Ecto.Changeset
      alias Blog.Repo

      @timestamps_opts [type: :utc_datetime]

      def slugify_field(%Ecto.Changeset{} = changeset, field) do
        if slug = get_change(changeset, field) do
          put_change(changeset, field, slugify(slug))
        else
          changeset
        end
      end

      def fields do
        __MODULE__.__schema__(:fields)
      end

      def fields(opts) when is_list(opts) do
        all_fields = fields()
        excludes = opts[:excludes]

        cond do
          excludes ->
            excludes
            |> Enum.reduce(all_fields, fn field, fields ->
              fields |> List.delete(field)
            end)

          true ->
            all_fields
        end
      end
    end
  end

  defmacro status(default \\ 1) do
    quote bind_quoted: binding() do
      field :status, :integer, default: default
    end
  end

  def slugify(str) when is_bitstring(str) do
    str
    |> String.downcase()
    |> String.replace(~r/[^\w-]+/u, "-")
  end

  def traverse_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end

defmodule Blog.Schema do
  defmacro __using__(_) do
    quote do
      use Ecto.Schema
      import Blog.Schema
      import Ecto.Changeset
      alias Blog.Repo

      @timestamps_opts [type: :utc_datetime]
    end
  end

  defmacro status(default \\ 1) do
    quote bind_quoted: binding() do
      field :status, :integer, default: default
    end
  end

  def traverse_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end

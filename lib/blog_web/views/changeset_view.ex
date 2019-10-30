defmodule BlogWeb.ChangesetView do
  use BlogWeb, :view

  def render("error.json", %{changeset: changeset}) do
    errors =
      Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
        Enum.reduce(opts, msg, fn {key, value}, acc ->
          String.replace(acc, "%{#{key}}", to_string(value))
        end)
      end)

    %{errors: errors}
  end

  def render("404.json", %{info: info}) do
    %{errors: info}
  end
end

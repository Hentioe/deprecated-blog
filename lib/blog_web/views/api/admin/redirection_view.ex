defmodule BlogWeb.API.Admin.RedirectionView do
  use BlogWeb, :view

  def render("show.json", %{redirection: redirection}) do
    render_one(redirection, __MODULE__, "redirection.json")
  end

  def render("index.json", %{redirections: redirections}) do
    render_many(redirections, __MODULE__, "redirection.json")
  end

  def render("redirection.json", %{redirection: redirection}) do
    redirection |> Map.drop([:__meta__, :article]) |> Map.from_struct()
  end
end

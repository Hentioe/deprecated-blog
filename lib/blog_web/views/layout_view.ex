defmodule BlogWeb.LayoutView do
  use BlogWeb, :view

  def google_site_verification do
    "Wbcnh_ngL7nUE4lAq6caXgbSiwEoq3rXuFlqhqD-ySg"
  end

  def title(_conn, assigns) do
    %{content: {:safe, content}} = assigns

    html =
      content
      |> Enum.at(4)
      |> Enum.reduce("", fn c, acc ->
        if is_bitstring(c) do
          acc <> c
        else
          acc
        end
      end)

    html
    |> Floki.find(".container[bl-title]")
    |> Floki.attribute("bl-title")
    |> hd
  end
end

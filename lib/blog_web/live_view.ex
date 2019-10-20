defmodule BlogWeb.LiveView do
  defmacro __using__(otps) do
    view_name = otps[:view] || raise "Missing :view. Please select one at :user/:admin"
    view_name_s = view_name |> to_string() |> Macro.camelize()
    view = "Elixir.BlogWeb.#{view_name_s}View" |> String.to_atom()

    otps = otps |> Keyword.delete(:view)

    container = otps[:container]

    otps =
      if container do
        otps
      else
        case view_name do
          :user -> otps |> Keyword.put(:container, {:div, class: "bl-page"})
          :admin -> otps |> Keyword.put(:container, {:div, class: "bl-admin-page"})
          _ -> raise "Invalid :view => :#{view_name}"
        end
      end

    quote do
      use Phoenix.LiveView, unquote(otps)
      alias Phoenix.LiveView.Socket
      alias unquote(view)
      import BlogWeb.LiveView
      alias BlogWeb.Router.Helpers, as: Routes
    end
  end

  defmacro to_i(str, default \\ nil) do
    quote do
      try do
        unquote(str)
        |> String.to_integer()
      rescue
        _ -> unquote(default)
      end
    end
  end
end

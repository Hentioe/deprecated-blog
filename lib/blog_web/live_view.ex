defmodule BlogWeb.LiveView do
  defmacro __using__(otps) do
    quote do
      use Phoenix.LiveView, unquote(otps)
      alias Phoenix.LiveView.Socket
      import BlogWeb.LiveView
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

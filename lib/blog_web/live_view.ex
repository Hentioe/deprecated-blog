defmodule BlogWeb.LiveView do
  defmacro __using__(otps) do
    quote do
      use Phoenix.LiveView, unquote(otps)
      alias Phoenix.LiveView.Socket
      import BlogWeb.LiveView
    end
  end
end

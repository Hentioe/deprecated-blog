defmodule Blog.Migration do
  @moduledoc false
  defmacro __using__(_) do
    quote do
      use Ecto.Migration

      def status do
        add(:status, :integer, default: 1, null: false, comment: "资源状态")
      end
    end
  end
end

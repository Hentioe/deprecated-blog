defmodule BlogWeb.UserView do
  use BlogWeb, :view

  def days_ago(%DateTime{} = date_time) do
    date_time
    |> DateTime.to_date()
    |> days_ago()
  end

  def days_ago(%Date{} = date) do
    now = Date.utc_today()

    days = now |> Date.diff(date)

    cond do
      days == 0 -> "今天"
      days > 0 -> " #{days} 天前"
    end
  end
end

defmodule BlogWeb.API.Admin.SettingView do
  use BlogWeb, :view

  def render("preview.json", %{counter_sync_time: counter_sync_time}) do
    %{counter_sync_time: counter_sync_time}
  end

  def render("counter.json", %{sync_time: sync_time}) do
    %{counter_sync_time: sync_time}
  end
end

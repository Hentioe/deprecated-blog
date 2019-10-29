defmodule BlogWeb.Admin.PageControllerTest do
  use BlogWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/admin")
    assert html_response(conn, 200) =~ "Bluerain Blog Admin | React"
  end
end

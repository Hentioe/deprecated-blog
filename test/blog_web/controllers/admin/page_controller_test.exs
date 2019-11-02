defmodule BlogWeb.Admin.PageControllerTest do
  use BlogWeb.ConnCase

  test "GET /admin", %{conn: conn} do
    conn = get(conn, "/admin")
    assert html_response(conn, 302)
  end
end

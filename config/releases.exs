# In this file, we load production configuration and secrets
# from environment variables. You can also hardcode secrets,
# although such is generally not recommended and you have to
# remember to add this file to your .gitignore.
import Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """

config :blog, Blog.Repo,
  url: database_url,
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  migration_timestamps: [type: :utc_datetime]

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :blog, BlogWeb.Endpoint,
  http: [:inet6, port: String.to_integer(System.get_env("BLOG_SERVER_PORT") || "4000")],
  secret_key_base: secret_key_base,
  server: true

config :blog, BlogWeb.Endpoint,
  username: System.get_env("BLOG_ADMIN_USERNAME"),
  password: System.get_env("BLOG_ADMIN_PASSWORD")

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:
#
#     config :blog, BlogWeb.Endpoint, server: true
#
# Then you can assemble a release by calling `mix release`.
# See `mix help release` for more information.

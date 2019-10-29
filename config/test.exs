use Mix.Config

# Configure your database
config :blog, Blog.Repo,
  username: "postgres",
  password: "postgres",
  database: "blog_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox,
  migration_timestamps: [type: :utc_datetime]

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :blog, BlogWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

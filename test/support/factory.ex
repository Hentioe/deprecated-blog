defmodule Blog.Factory do
  def build(:article) do
    %Blog.Schemas.Article{
      title: "标题1",
      slug: "title1",
      content: "我是内容。",
      comment_permissions: 1,
      status: 1
    }
  end

  def build(:category) do
    %Blog.Schemas.Category{
      name: "类别1",
      slug: "c-1"
    }
  end

  def build(factory_name, attributes) do
    factory_name |> build() |> struct(attributes)
  end
end

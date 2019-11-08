defmodule Blog.Factory do
  def build(:article) do
    %Blog.Schemas.Article{
      title: "标题1",
      slug: "title1",
      content: "我是内容。",
      comment_permissions: 1,
      status: 1,
      tags: []
    }
  end

  def build(:category) do
    %Blog.Schemas.Category{
      name: "类别1",
      slug: "c-1"
    }
  end

  def build(:tag) do
    %Blog.Schemas.Tag{
      name: "标签1",
      slug: "t-1"
    }
  end

  def build(:redirection) do
    %Blog.Schemas.Redirection{
      source_slug: "old-redirection-slug-1"
    }
  end

  def build(:counter) do
    %Blog.Schemas.Counter{key: "article:0:all_views", val: 0}
  end

  def build(factory_name, attributes) do
    factory_name |> build() |> struct(attributes)
  end
end

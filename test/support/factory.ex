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
end

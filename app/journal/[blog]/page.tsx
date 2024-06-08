import Blog from "../../sections/blog";
import { getAllBlogsData } from "@/lib/shopify";

export default async function Journal({
  params,
}: {
  params: { blog: string };
}) {
  const response = await getAllBlogsData();
  const blogs = response.body.data.blogs.nodes.map((blog: any) => {
    return {
      title: blog.title,
      id: blog.id,
      articles: blog.articles.nodes.map((article: any) => {
        return {
          id: article.id.split("/").pop(),
          title: article.title,
          content: article.content,
          image: article.image.url,
          handle: article.handle,
          publishedAt: article.publishedAt,
        };
      }),
    };
  });

  return (
    <main>
      <Blog blogData={blogs} currentBlog={params.blog} />
    </main>
  );
}

import MainBlog from "@/components/sections/blog";
import { getAllBlogsData } from "@/lib/shopify";

export default async function Journal({
  params,
}: {
  params: { blog: string };
}) {
  const blogs = await getAllBlogsData();

  return (
    <main>
      <MainBlog blogData={blogs} currentBlog={params.blog} />
    </main>
  );
}

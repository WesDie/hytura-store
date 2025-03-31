import MainBlog from "@/components/sections/blog";
import { getAllBlogsData } from "@/lib/shopify";

export default async function Journal(
  props: {
    params: Promise<{ blog: string }>;
  }
) {
  const params = await props.params;
  const blogs = await getAllBlogsData();

  return (
    <main>
      <MainBlog blogData={blogs} currentBlog={params.blog} />
    </main>
  );
}

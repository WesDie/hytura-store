import ArticleSlider from "@/components/sections/article-slider";
import ArticleDetails from "@/components/sections/article";
import { getSingleArticleData } from "@/lib/shopify";

export default async function Journal(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const article = await getSingleArticleData(
    "gid://shopify/Article/" + params.id,
  );

  return (
    <main>
      <ArticleDetails article={article} />
      <ArticleSlider />
    </main>
  );
}

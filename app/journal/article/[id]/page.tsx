import ArticleSlider from "@/components/sections/article-slider";
import ArticleDetails from "@/components/sections/article";
import { getSingleArticleData } from "@/lib/shopify";

export default async function Journal({ params }: { params: { id: string } }) {
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

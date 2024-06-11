import ArticleDetails from "../../../sections/article";
import { getSingleArticleData } from "@/lib/shopify";

export default async function Journal({ params }: { params: { id: string } }) {
  const article = await getSingleArticleData(
    "gid://shopify/Article/" + params.id,
  );

  return (
    <main>
      <ArticleDetails article={article} />
    </main>
  );
}

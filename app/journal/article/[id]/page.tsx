import Slider from "@/app/components/slider";
import Article from "../../../sections/article";
import { getSingleArticleData } from "@/lib/shopify";

export default async function Journal({ params }: { params: { id: string } }) {
  const response = await getSingleArticleData(
    "gid://shopify/Article/" + params.id,
  );
  const article = response.body.data.article;

  return (
    <main>
      <Article article={article} />
    </main>
  );
}

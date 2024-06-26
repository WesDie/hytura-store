"use client";
import RenderImage from "@/components/render-Image";
import { Article } from "@/lib/shopify/types";

export default function ArticleDetails({ article }: { article: Article }) {
  const authorInitials = `${article.author.name.charAt(0)}${article.author.name.split(" ")[1].charAt(0)}`;

  return (
    <section className="flex flex-col border-b border-solid border-stroke-gray md:flex-row">
      <div className="relative w-full md:w-[50%]">
        <div className="flex w-full px-2x pb-4x pt-5x md:sticky md:-top-[200px] md:h-[500px] md:p-4x">
          <div className="mt-auto flex flex-col gap-1x">
            <div className="flex gap-2x">
              <div className="flex h-5x w-5x rounded-full bg-background-dark-sand">
                <p className="text-heading-4xs m-auto text-text-black">
                  {authorInitials}
                </p>
              </div>
              <div className="my-auto flex flex-col">
                <p className="text-heading-4xs text-text-light-gray">
                  {article.publishedAt.split("T")[0]}
                </p>
                <p className="text-heading-4xs text-text-light-gray">
                  By {article.author.name}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1x md:gap-2x">
              <h1 className="text-heading-md text-heading-sm">
                {article.title}
              </h1>
              <p className="text-body-sm text-body-xs">{article.excerpt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <RenderImage
          src={article.image.url}
          alt={"article image"}
          width={1000}
          height={500}
          className="h-[250px] w-full overflow-hidden md:h-[500px]"
          imageClassName="w-full h-full object-cover"
        />
        <div className="text-body-xs md:text-body-sm border-stroke-gray px-3x py-4x md:border-l">
          {article.content}
        </div>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { Article } from "@/lib/shopify/types";
import RenderImage from "../utilities/render-Image";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/journal/article/${article.id.split("/").pop()}`}
      className="flex h-full w-full flex-col gap-2x py-3x"
    >
      <RenderImage
        src={article.image.url}
        alt={"Article image"}
        width={396}
        height={248}
        className={"aspect-[396/248] w-full overflow-hidden"}
        imageClassName="object-cover w-full h-full"
      ></RenderImage>
      <div className="mb-3x flex flex-col gap-1x">
        <h2 className="text-heading-xs">{article.title}</h2>
        <p className="text-body-xs">
          {" "}
          {article.content.length > 150
            ? article.content.substring(0, 150).concat("...")
            : article.content}
        </p>
      </div>
    </Link>
  );
}

"use client";
import { useState } from "react";

import RenderImage from "@/components/utilities/render-Image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Article, Blog } from "@/lib/shopify/types";

export default function MainBlog({
  blogData,
  currentBlog,
}: {
  blogData: Blog[];
  currentBlog: string;
}) {
  const router = useRouter();
  const [blogName, setBlogName] = useState(
    currentBlog[0].toUpperCase() + currentBlog.slice(1).toLowerCase(),
  );
  const [filteredBlog, setfilteredBlog] = useState(
    blogData.filter((blog: Blog) => blog.title === blogName),
  );

  const changeCurrentBlog = (title: string) => () => {
    setfilteredBlog(blogData.filter((blog: Blog) => blog.title === title));
    setBlogName(title);
    router.push(`/journal/${title.toLowerCase()}`);
  };

  if (!filteredBlog.length) return notFound();

  return (
    <section className={`flex w-full flex-col border-b border-stroke-gray`}>
      <div className="flex flex-col pt-4x md:pt-7x">
        <div className="flex flex-col p-2x md:px-4x md:py-3x">
          <p className="text-body-sm">Blog</p>
          <h1 className="text-heading-lg md:text-heading-xl">{blogName}</h1>
        </div>
        <div className="flex gap-2x border-y border-solid border-stroke-gray p-1x px-2x py-2x md:px-4x">
          {blogData.map((blog: Blog, index: number) => (
            <div
              key={blog.id}
              onClick={changeCurrentBlog(blog.title)}
              className={`text-link-sm cursor-pointer ${blog.title === blogName ? "text-text-black" : "text-text-light-gray"}`}
            >
              {blog.title}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2x p-2x md:grid-cols-3 md:p-3x">
        {filteredBlog[0].articles.map((article: Article) => (
          <div key={article.id} className="flex w-full flex-col gap-2x pb-3x">
            <Link href={`/journal/article/${article.id.split("/").pop()}`}>
              <RenderImage
                src={article.image.url}
                alt="Article Image"
                width={336}
                height={201}
                className="aspect-[33/20] w-full overflow-hidden"
                imageClassName="object-cover w-full h-full"
              />
            </Link>
            <Link
              href={`/journal/article/${article.id.split("/").pop()}`}
              className="flex flex-col gap-1x"
            >
              <h2 className="text-heading-xs">{article.title}</h2>
              <p className="text-body-xs">
                {article.content.length > 150
                  ? article.content.substring(0, 150).concat("...")
                  : article.content}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

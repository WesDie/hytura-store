import { getPage } from "@/lib/shopify";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const page = await getPage(params.handle);

  if (!page) {
    return notFound();
  }

  return (
    <main className="border-b border-stroke-gray">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3x px-3x py-7x">
        <h1 className="text-heading-xl">{page.title}</h1>
        <div
          className="wysiwyg flex flex-col gap-2x"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </div>
    </main>
  );
}

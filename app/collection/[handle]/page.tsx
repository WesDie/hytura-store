import MainCollection from "../../sections/collection";
import { getAllCollections } from "@/lib/shopify";

export default async function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const collections = await getAllCollections();
  const currentCollection = params.handle.replace(/%20/g, " ");

  return (
    <main>
      <MainCollection
        collections={collections}
        currentCollection={currentCollection}
      />
    </main>
  );
}

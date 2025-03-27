import MainCollection from "@/components/sections/collection";
import { getAllCollections } from "@/lib/shopify";

export default async function CollectionPage(
  props: {
    params: Promise<{ handle: string }>;
  }
) {
  const params = await props.params;
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

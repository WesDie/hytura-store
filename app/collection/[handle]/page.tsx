import Collection from "../../sections/collection";
import { getAllCollections } from "@/lib/shopify";

export default async function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const response = await getAllCollections();
  const collections = response.body.data.collections.nodes.map(
    (collection: any) => {
      return {
        title: collection.title,
        id: collection.id,
        description: collection.description,
        products: collection.products.nodes.map((product: any) => {
          return {
            product,
          };
        }),
      };
    },
  );
  const currentCollection = params.handle.replace(/%20/g, " ");

  return (
    <main>
      <Collection
        collectionData={collections}
        currentCollection={currentCollection}
      />
    </main>
  );
}

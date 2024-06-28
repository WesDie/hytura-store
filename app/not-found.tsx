import Link from "next/link";
import RenderImage from "@/components/utilities/render-Image";
import Button from "@/components/elements/button";

export default function NotFound() {
  return (
    <div className="flex h-[70dvh] border-b border-stroke-gray p-4x">
      <div className="my-auto flex flex-col gap-2x">
        <h1 className="text-heading-lg">404 - Page not found</h1>
        <Link href="/">
          <Button text="Homepage" variant="secondary" arrow />
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";
import RenderImage from "@/components/render-Image";

export default function NotFound() {
  return (
    <div className="flex h-[70dvh] border-b border-stroke-gray p-4x">
      <div className="my-auto flex flex-col gap-2x">
        <h1 className="text-heading-lg">404 - Page not found</h1>
        <Link className="button-secondary flex w-fit gap-4x" href="/">
          Homepage
          <RenderImage
            src={"/icons/arrow-right.svg"}
            alt={"arrow right"}
            width={12}
            height={13}
            className="my-auto"
          />
        </Link>
      </div>
    </div>
  );
}

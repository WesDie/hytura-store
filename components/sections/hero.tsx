import RenderImage from "@/components/utilities/render-Image";
import Link from "next/link";
import Button from "../elements/button";

export default async function Hero({
  direction,
  title,
  buttonTitle,
  imageSrc,
}: {
  direction: "left" | "right";
  title: string;
  buttonTitle: string;
  imageSrc: string;
}) {
  return (
    <section
      className={`grid h-[592px] w-full grid-rows-2 overflow-hidden md:h-[667px] md:grid-cols-2`}
    >
      <RenderImage
        src={imageSrc}
        alt={"product image"}
        width={1000}
        height={667}
        className={`h-full w-full md:h-[667px] ${
          direction === "left" ? "order-1" : "order-0"
        }`}
        imageClassName="w-full h-full object-cover"
      />
      <div className="flex w-full border-b border-solid border-stroke-gray md:h-[667px]">
        <div className="m-auto ml-2x flex w-[355px] flex-col gap-3x md:ml-[64px]">
          <h1 className="text-heading-lg md:text-heading-xl">{title}</h1>
          <div className="flex gap-2x">
            <Link href="/collection/all">
              <Button text={buttonTitle} variant="secondary" arrow={true} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

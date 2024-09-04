import RenderImage from "@/components/utilities/render-Image";
import Link from "next/link";
import Button from "../elements/button";

export default async function TextImage({
  direction,
  title,
  description,
  buttonTitle,
  imageSrc,
  className,
  url,
}: {
  direction: "left" | "right";
  title: string;
  description: string;
  buttonTitle: string;
  imageSrc: string;
  className?: string;
  url?: string;
}) {
  return (
    <section
      className={`flex h-fit w-full flex-col overflow-hidden md:grid md:h-[536px] md:grid-cols-2 ${className ? className : ""}`}
    >
      <RenderImage
        src={imageSrc}
        alt={"product image"}
        width={1000}
        height={667}
        className={`h-[297px] w-full md:h-[536px] ${className ? className : ""} ${
          direction === "left" ? "order-1" : "order-0"
        }`}
        imageClassName="w-full h-full object-cover"
      />
      <div
        className={`flex w-full border-b border-solid border-stroke-gray md:h-[536px] ${className ? className : ""}`}
      >
        <div className="mx-2x my-3x flex w-full flex-col gap-3x md:m-auto md:ml-[64px] md:mr-0 md:w-[500px]">
          <h1 className="text-heading-md">{title}</h1>
          <p className="text-body-sm">{description}</p>
          <div className="flex gap-2x">
            <Link href={url || ""}>
              <Button text={buttonTitle} variant="secondary" arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

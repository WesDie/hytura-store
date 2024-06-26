import RenderImage from "@/components/render-Image";

export default async function TextImage({
  direction,
  title,
  description,
  buttonTitle,
  imageSrc,
}: {
  direction: "left" | "right";
  title: string;
  description: string;
  buttonTitle: string;
  imageSrc: string;
}) {
  return (
    <section
      className={`grid h-[592px] w-full grid-rows-2 overflow-hidden md:h-[436px] md:grid-cols-2`}
    >
      <RenderImage
        src={imageSrc}
        alt={"product image"}
        width={1000}
        height={667}
        className={`h-full w-full md:h-[436px] ${
          direction === "left" ? "order-1" : "order-0"
        }`}
        imageClassName="w-full h-full object-cover"
      />
      <div className="flex w-full border-b border-solid border-stroke-gray md:h-[436px]">
        <div className="m-auto mx-2x flex w-full flex-col gap-3x md:ml-[64px] md:mr-0 md:w-[500px]">
          <h1 className="text-heading-md">{title}</h1>
          <p className="text-body-sm">{description}</p>
          <div className="flex gap-2x">
            <a className="button-secondary flex gap-4x" href="/collection/all">
              {buttonTitle}
              <RenderImage
                src={"/icons/arrow-right.svg"}
                alt={"arrow right"}
                width={12}
                height={13}
                className="my-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

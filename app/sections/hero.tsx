import RenderImage from "../components/render-Image";

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
      className={`w-full grid grid-rows-2 md:grid-cols-2 h-[592px] md:h-[667px] overflow-hidden`}
    >
      <RenderImage
        src={imageSrc}
        alt={"product image"}
        width={1000}
        height={667}
        className={`w-full h-full md:h-[667px] ${
          direction === "left" ? "order-1" : "order-0"
        }`}
        imageClassName="w-full h-full object-cover"
      />
      <div className="w-full md:h-[667px] flex border-b border-stroke-gray border-solid">
        <div className="m-auto ml-2x md:ml-[64px] flex flex-col gap-3x w-[365px]">
          <h1 className="text-heading-lg md:text-heading-xl">{title}</h1>
          <div className="flex gap-2x">
            <a className="button-secondary flex gap-4x" href="/collection/all">
              {buttonTitle}
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_178_646)">
                  <path
                    d="M7.224 1.77195L12 6.52395L7.224 11.3H5.64L9.96 7.07595H0V5.92395H9.96L5.64 1.69995H7.224V1.77195Z"
                    fill="#1F1F1F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_178_646">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

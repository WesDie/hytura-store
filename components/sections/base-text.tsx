import Link from "next/link";
import Button from "../elements/button";

export default async function BaseText({
  alignment,
  subtitle,
  title,
  buttonTitle,
  buttonLink,
  className,
}: {
  alignment: "text-left" | "text-right" | "text-center";
  subtitle: string;
  title: string;
  buttonTitle?: string;
  buttonLink?: string;
  className?: string;
}) {
  const alignmentClass =
    alignment === "text-center"
      ? "items-center"
      : alignment === "text-right"
        ? "items-end"
        : "";

  return (
    <section
      className={`flex w-full bg-background-dark-sand p-8x py-[72px] ${alignment} ${className ? className : ""}`}
    >
      <div className={`m-auto flex flex-col gap-1x ${alignmentClass}`}>
        <p
          className={`text-body-sm max-w-[800px] ${alignment} text-text-light-gray`}
        >
          {subtitle}
        </p>
        <h1
          className={`text-heading-md max-w-[800px] ${alignment} text-text-black`}
        >
          {title}
        </h1>
        {buttonTitle && buttonLink && (
          <Link href={buttonLink} className={`${alignment} mt-1x w-fit`}>
            <Button text={buttonTitle} variant="secondary" arrow />
          </Link>
        )}
      </div>
    </section>
  );
}

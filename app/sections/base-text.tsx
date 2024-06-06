export default async function BaseText({
  alignment,
  subtitle,
  title,
  buttonTitle,
}: {
  alignment: "text-left" | "text-right" | "text-center";
  subtitle: string;
  title: string;
  buttonTitle: string;
}) {
  const alignmentClass =
    alignment === "text-center"
      ? "items-center"
      : alignment === "text-right"
      ? "items-end"
      : "";

  return (
    <section
      className={`w-full py-[72px] flex flex-col gap-1x p-8x bg-background-dark-sand ${alignment} ${alignmentClass}`}
    >
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
    </section>
  );
}

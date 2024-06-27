"use client";
import RenderImage from "../utilities/render-Image";

export default function Faq({ direction }: { direction: "left" | "right" }) {
  const faqItems = [
    {
      question: "What is the refund policy?",
      answer:
        "We have a 30-day refund policy. If you are not satisfied with the product, you can return it within 30 days of purchase.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by visiting our website and entering your order number.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in vestibulum nisl. Nam et tincidunt erat. Vivamus quis magna nec mi dapibus posuere vehicula a justo. Nulla sit amet vestibulum urna. Fusce arcu nunc, dignissim eget blandit id, auctor semper velit. Phasellus non dui felis. Nullam suscipit magna laoreet interdum dapibus.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact customer support by emailing",
    },
  ];

  const openDropdown = (index: number) => () => {
    const button = document.getElementById(`dropdown-button-${index}`);

    if (button) {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isExpanded));
      if (isExpanded) {
        if (button.parentElement) {
          button.parentElement.style.height = "55px";
        }
        return;
      }
      if (button.parentElement) {
        button.parentElement.style.height =
          24 +
          55 +
          button.parentElement.querySelector("p")!.offsetHeight +
          "px";
      }
    }

    // Close other dropdowns
    faqItems.forEach((_, i) => {
      if (i !== index) {
        const otherButton = document.getElementById(`dropdown-button-${i}`);
        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
          if (otherButton.parentElement) {
            otherButton.parentElement.style.height = "55px";
          }
        }
      }
    });
  };

  return (
    <section
      className={`flex w-full flex-col justify-between gap-3x border-b border-solid border-stroke-gray px-2x py-2x md:px-4x md:py-3x ${
        direction === "left" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <h1 className="text-heading-sm md:text-heading-md">FAQ</h1>
      <div className="flex w-full flex-col pb-3x md:w-[650px] md:pb-4x">
        {faqItems.map(({ question, answer }, index) => (
          <div
            key={question}
            className="h-[55px] overflow-hidden border-b border-solid border-stroke-gray py-2x transition-all duration-300 ease-in-out first-of-type:border-y"
          >
            <div
              className="group relative flex cursor-pointer justify-between"
              onClick={openDropdown(index)}
              id={`dropdown-button-${index}`}
              aria-expanded="false"
            >
              <h2 className="text-body-sm select-none">
                {index + 1}. {question}
              </h2>
              <RenderImage
                src={"/icons/plus.svg"}
                alt={"expand icon"}
                width={16}
                height={17}
                className="opacity-100 transition-all duration-300 ease-in-out group-aria-expanded:opacity-0"
              />
              <RenderImage
                src={"/icons/line.svg"}
                alt={"close icon"}
                width={16}
                height={17}
                className="absolute right-0 opacity-0 transition-all duration-300 ease-in-out group-aria-expanded:opacity-100"
              />
            </div>
            <p className="text-body-sm mt-2x select-none text-text-light-gray">
              {answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

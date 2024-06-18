"use client";

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
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-100 transition-all duration-300 ease-in-out group-aria-expanded:opacity-0"
              >
                <path
                  d="M14 8.5C14 8.63261 13.9473 8.75979 13.8536 8.85355C13.7598 8.94732 13.6326 9 13.5 9H8.5V14C8.5 14.1326 8.44732 14.2598 8.35355 14.3536C8.25979 14.4473 8.13261 14.5 8 14.5C7.86739 14.5 7.74021 14.4473 7.64645 14.3536C7.55268 14.2598 7.5 14.1326 7.5 14V9H2.5C2.36739 9 2.24021 8.94732 2.14645 8.85355C2.05268 8.75979 2 8.63261 2 8.5C2 8.36739 2.05268 8.24021 2.14645 8.14645C2.24021 8.05268 2.36739 8 2.5 8H7.5V3C7.5 2.86739 7.55268 2.74021 7.64645 2.64645C7.74021 2.55268 7.86739 2.5 8 2.5C8.13261 2.5 8.25979 2.55268 8.35355 2.64645C8.44732 2.74021 8.5 2.86739 8.5 3V8H13.5C13.6326 8 13.7598 8.05268 13.8536 8.14645C13.9473 8.24021 14 8.36739 14 8.5Z"
                  fill="#1F1F1F"
                />
              </svg>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 opacity-0 transition-all duration-300 ease-in-out group-aria-expanded:opacity-100"
              >
                <path
                  d="M13.9999 8.50002C13.9999 8.63263 13.9472 8.7598 13.8534 8.85357C13.7597 8.94734 13.6325 9.00002 13.4999 9.00002H8.49988C8.49988 9.00002 8.13249 9.00002 7.99988 9.00002C7.86727 9.00002 8.15961 9.00002 7.99988 9.00002C7.84015 9.00002 7.99988 9.00002 7.49988 9.00002H2.49988C2.36727 9.00002 2.24009 8.94734 2.14632 8.85357C2.05256 8.7598 1.99988 8.63263 1.99988 8.50002C1.99988 8.36741 2.05256 8.24023 2.14632 8.14646C2.24009 8.0527 2.36727 8.00002 2.49988 8.00002H7.49988C7.49988 8.00002 7.85535 8.00003 7.99988 8.00003L8.49988 8L13.4999 8.00002C13.6325 8.00002 13.7597 8.0527 13.8534 8.14646C13.9472 8.24023 13.9999 8.36741 13.9999 8.50002Z"
                  fill="#1F1F1F"
                />
              </svg>
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

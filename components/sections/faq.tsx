"use client";
import FaqItems from "../elements/faq-items";

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

  return (
    <section
      className={`flex w-full flex-col justify-between gap-3x border-b border-solid border-stroke-gray px-2x py-2x md:px-4x md:py-3x ${
        direction === "left" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <h1 className="text-heading-sm md:text-heading-md">FAQ</h1>
      <div className="flex w-full flex-col pb-3x md:w-[650px] md:pb-4x">
        <FaqItems faqItems={faqItems} />
      </div>
    </section>
  );
}

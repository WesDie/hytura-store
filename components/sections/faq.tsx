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
        "You can track your order by visiting our website and going to the order tracking page in the account section (You must have an account to track your order in the website). You can also track your order by opening the link you will recieve within a day or two of ordering.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, we offer gift cards. You can purchase gift cards on our website and send them to your friends and family.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact customer support by emailing us at support@hytura.com or by filling in the form on the contact page.",
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

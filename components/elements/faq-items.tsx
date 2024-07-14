"use client";
import RenderImage from "../utilities/render-Image";
import { useEffect } from "react";

export default function FaqItems({
  firstOpen,
  faqItems,
  topBottomBorders = true,
}: {
  firstOpen?: boolean;
  topBottomBorders?: boolean;
  faqItems: { question: string; answer: string }[];
}) {
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

  useEffect(() => {
    if (firstOpen) {
      const firstButton = document.getElementById("dropdown-button-0");
      if (firstButton) {
        firstButton.setAttribute("aria-expanded", "true");
        if (firstButton.parentElement) {
          firstButton.parentElement.style.height =
            24 +
            55 +
            firstButton.parentElement.querySelector("p")!.offsetHeight +
            "px";
        }
      }
    }
  }, [firstOpen]);

  return (
    <>
      {faqItems.map(({ question, answer }, index) => (
        <div
          key={question}
          className={`h-[55px] overflow-hidden border-b border-solid border-stroke-gray py-2x transition-all duration-300 ease-in-out ${topBottomBorders ? "first-of-type:border-y" : "last-of-type:border-b-0"} `}
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
    </>
  );
}

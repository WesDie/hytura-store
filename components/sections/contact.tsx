"use client";

import Button from "../elements/button";
import Input from "../elements/input";

export default function Contact({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <section
      className={`flex h-[70dvh] w-full flex-col justify-between gap-3x border-b border-solid border-stroke-gray px-2x py-2x md:px-4x md:py-3x ${
        direction === "left" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex max-w-[600px] flex-col gap-2x">
        <h1 className="text-heading-sm md:text-heading-md">Contact</h1>
        <p className="text-body-sm">
          Have a question or need assistance? We are here to help! Reach out to
          our friendly customer support team anytime. You can contact us via
          email at{" "}
          <a href="mailto:wes.dieleman@gmail.com" className="font-medium">
            support@hytura.com
          </a>{" "}
          or fill out this form. We look forward to hearing from you!
        </p>
      </div>
      <div className="flex w-full max-w-[500px] flex-col gap-2x">
        <div className="flex flex-col gap-1x">
          <Input label="Name" placeholder="Name" name="name" />
          <Input label="Email" placeholder="Email" name="email" />
          <Input
            label="Message"
            placeholder="Message"
            name="message"
            isTextArea
          />
        </div>
        <Button text="Send" variant="primary" />
      </div>
    </section>
  );
}

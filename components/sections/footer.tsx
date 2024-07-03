"use client";
import Link from "next/link";
import Input from "../elements/input";
import Button from "../elements/button";
import { shopifySubscribeMarketing } from "../account/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { Menu } from "@/lib/shopify/types";

const initialState = {
  message: "",
};

export default function Footer({ menu }: { menu: Menu[] }) {
  const linkClass =
    "w-fit inline-block relative after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-text-black after:origin-bottom-right after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-[1] hover:after:origin-bottom-left";

  const [state, formAction] = useFormState(
    shopifySubscribeMarketing,
    initialState,
  );
  const [message, setMessage] = useState(state.message);
  const [email, setEmail] = useState("");

  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    setMessage(state.message);

    if (state.message?.success) {
      setEmail("");
      setTimeout(() => {
        setMessage({});
      }, 5000);
    }
  }, [state]);

  return (
    <footer className="flex flex-col">
      <div className="flex flex-col-reverse justify-between gap-3x border-b border-solid border-stroke-gray px-2x py-5x md:gap-6x md:px-3x lg:flex-row lg:gap-3x lg:py-8x">
        <div className="grid w-full grid-cols-2 gap-3x md:flex md:w-fit md:gap-2x">
          {menu.map((item) => (
            <div
              key={item.title}
              className="flex w-full flex-col gap-2x md:w-fit md:min-w-[190px]"
            >
              <h1 className="text-heading-2xs md:text-heading-xs">
                {item.title}
              </h1>
              <div className="flex flex-col gap-[4px]">
                {item.items.map((link) => (
                  <Link
                    key={link.title}
                    href={link.path}
                    className={`text-body-xs md:text-body-sm ${linkClass}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1x">
          <div className="flex w-full flex-col gap-2x">
            <label className="text-heading-2xs md:text-heading-xs">
              Sign up for our newsletter
            </label>
            <div className="flex flex-col gap-1x">
              <form action={formAction} className="flex w-full gap-1x">
                <Input
                  value="email"
                  inputValue={email}
                  id="newsletter_email"
                  placeholder="Email"
                  className="h-full md:w-[278px]"
                  state={state}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  text="Sign up"
                  variant="primary"
                  className="min-w-max"
                />
              </form>
              {message.success && (
                <p className="text-body-sm text-text-green">
                  {state.message.success}
                </p>
              )}
              {message.email && (
                <p className="text-body-sm text-text-red">
                  * Email {state.message.email}
                </p>
              )}
            </div>
          </div>
          <p className="text-body-xs w-full text-text-light-gray md:max-w-[380px]">
            Sign up for the latest news about deals, announcements or products
            to stay up to date
          </p>
        </div>
      </div>
      <div className="flex justify-between p-2x md:px-4x md:py-3x">
        <p className="text-heading-4xs md:text-heading-3xs text-text-black">
          © Hytura {year}
        </p>
        <p className="text-heading-3xs hidden text-text-light-gray md:block">
          Made by{" "}
          <Link href={"https://www.wesdieleman.com"} className="underline">
            Wes Dieleman
          </Link>
        </p>
        <div className="flex gap-3x">
          <Link
            href={"/"}
            className={`text-body-xs md:text-body-sm ${linkClass}`}
          >
            Terms of service
          </Link>
          <Link
            href={"/"}
            className={`text-body-xs md:text-body-sm ${linkClass}`}
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default async function Footer() {
  const linkClass =
    "w-fit inline-block relative after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-text-black after:origin-bottom-right after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-[1] hover:after:origin-bottom-left";

  const footerLinks = [
    {
      title: "Shop",
      links: [
        {
          title: "All products",
          href: "/",
        },
        {
          title: "The gardener",
          href: "/",
        },
        {
          title: "Accesories",
          href: "/",
        },
        {
          title: "Our values",
          href: "/",
        },
      ],
    },
    {
      title: "Support",
      links: [
        {
          title: "Shipping & returns",
          href: "/",
        },
        {
          title: "Contact us",
          href: "/",
        },
        {
          title: "FAQ",
          href: "/",
        },
        {
          title: "Blog",
          href: "/",
        },
      ],
    },
    {
      title: "About & Other",
      links: [
        {
          title: "About",
          href: "/",
        },
        {
          title: "Contact",
          href: "/",
        },
      ],
    },
  ];

  return (
    <footer className="flex flex-col">
      <div className="flex flex-col-reverse md:flex-row justify-between px-2x py-5x md:px-3x md:py-8x gap-3x border-b border-solid border-stroke-gray">
        <div className="grid-cols-2 w-full md:w-fit grid md:flex gap-3x md:gap-2x">
          {footerLinks.map((section) => (
            <div
              key={section.title}
              className="w-full md:w-fit md:min-w-[190px] flex flex-col gap-2x"
            >
              <h1 className="text-heading-2xs md:text-heading-xs">
                {section.title}
              </h1>
              <div className="flex flex-col gap-[4px]">
                {section.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
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
          <div className="flex flex-col gap-2x w-full">
            <label className="text-heading-2xs md:text-heading-xs">
              Sign up for our newsletter
            </label>
            <div className="flex gap-1x w-full">
              <input
                className="w-full text-body-sm appearance-none border border-solid text-text-black px-2x py-1x md:w-[278px] outline-none border-stroke-black focus:border-stroke-black placeholder-shown:border-stroke-light-gray transition-colors bg-transparent"
                placeholder="Email"
              />
              <button className="button-primary min-w-max">Sign up</button>
            </div>
          </div>
          <p className="text-body-xs text-text-light-gray w-full md:max-w-[380px]">
            Sign up for the latest news about deals, announcements or products
            to stay up to date
          </p>
        </div>
      </div>
      <div className="flex justify-between p-2x md:py-3x md:px-4x">
        <p className="text-heading-4xs md:text-heading-3xs text-text-black">
          © Hytura 2024
        </p>
        <p className="text-heading-3xs text-text-light-gray hidden md:block">
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

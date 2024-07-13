import { Menu } from "@/lib/shopify/types";
import Link from "next/link";
import RenderImage from "../utilities/render-Image";

export default function HeaderDropdown({
  isShopDropdownActive,
  isShopDropdownClicked,
  toggleShopDropdown,
  shopMenu,
}: {
  isShopDropdownActive: boolean;
  isShopDropdownClicked: boolean;
  toggleShopDropdown: (
    toggle: boolean,
    clickToggle?: boolean,
    overwrite?: boolean,
  ) => void;
  shopMenu: Menu[];
}) {
  return (
    <div
      id="shop-dropdown-header"
      className={`${isShopDropdownClicked ? "pointer-events-none" : ""} ${
        isShopDropdownActive
          ? "visible translate-y-0 border-b opacity-100"
          : "invisible -translate-y-[20%] opacity-0"
      } fixed left-0 right-0 top-[54px] z-[9] flex max-h-[200px] min-h-[200px] w-full justify-between overflow-hidden border-solid border-stroke-black bg-background-sand px-3x py-3x backdrop-blur-lg transition-[transform,opacity,visibility,height] delay-75 duration-300 ease-in-out`}
      onMouseOver={() => toggleShopDropdown(true)}
      onMouseLeave={() => toggleShopDropdown(false)}
    >
      <div
        className={`flex gap-2x transition-all duration-300 ${isShopDropdownActive ? "opacity-100" : "opacity-0"}`}
      >
        {shopMenu.map((item) => (
          <div key={item.title} className="flex min-w-[175px] flex-col gap-1x">
            <h3 className="text-heading-xs">{item.title}</h3>
            <div className="flex flex-col gap-[4px]">
              {item.items.map((link) => (
                <Link
                  key={link.title}
                  href={link.path}
                  className={`button-header-link text-body-sm`}
                  onClick={() => toggleShopDropdown(false, true)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <RenderImage
        src={"/hero.png"}
        alt={"product image"}
        width={1000}
        height={667}
        className={`max-h-full w-full max-w-[350px]`}
        imageClassName="w-full h-full object-cover"
      />
    </div>
  );
}

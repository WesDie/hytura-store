"use client";

import { useEffect, useState } from "react";
import RenderImage from "../components/render-Image";

export default function Header() {
  const [isTop, setIsTop] = useState(false);
  const [isShopDropdownActive, setIsShopDropdownActive] = useState(false);
  const linkClass =
    "text-heading-3xs w-fit inline-block relative after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-text-black after:origin-bottom-right after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-[1] hover:after:origin-bottom-left";

  useEffect(() => {
    const checkScrollPosition = () => {
      if (window.scrollY < 32) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };
    checkScrollPosition();

    window.onscroll = () => {
      const announcementBar = document.querySelector(
        "#announcementBar",
      ) as HTMLElement;
      const header = document.querySelector("header") as HTMLElement;

      if (window.scrollY < 32) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }

      if (header) {
        header.setAttribute(
          "style",
          `top: ${window.scrollY < 32 ? `${32 - window.scrollY}px` : "-0"}`,
        );
      }

      if (announcementBar) {
        announcementBar.setAttribute(
          "style",
          `top: ${window.scrollY < 32 ? `${0 - window.scrollY}px` : "-32px"}`,
        );
      }
    };
  });

  return (
    <>
      <div className="h-[86px]" id="empty-header-height"></div>
      {isTop && (
        <div
          id="announcementBar"
          className={`fixed top-[0] z-[11] w-full bg-background-dark-gray py-1x`}
        >
          <p className="text-heading-4xs text-center text-text-white">
            All orders over €25 shipped for free
          </p>
        </div>
      )}
      <header
        className={`fixed flex w-full justify-between border-b border-solid border-stroke-black backdrop-blur-lg ${
          isTop ? "top-[32px]" : "top-[0]"
        } z-10 bg-background-sand md:bg-transparent`}
      >
        <div className="z-[11] flex w-full gap-5x py-2x pl-2x md:pl-3x">
          <a href="/" className="flex">
            <svg
              width="73"
              height="21"
              viewBox="0 0 921 177"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-fit"
            >
              <path
                d="M108.159 174C108.159 174.482 109.122 174.161 111.05 173.036C112.977 171.752 114.743 169.503 116.349 166.291C117.955 162.919 118.758 158.02 118.758 151.596V96.912H28.18V151.596C28.18 158.02 28.983 162.919 30.589 166.291C32.195 169.503 33.9616 171.671 35.8888 172.795C37.816 173.92 38.7796 174.321 38.7796 174H0.4765C0.4765 174.482 1.4401 174.161 3.3673 173.036C5.2945 171.752 6.9808 169.503 8.4262 166.291C10.0322 162.919 10.8352 158.02 10.8352 151.596V30.6645C10.8352 24.2405 10.0322 19.4225 8.4262 16.2105C6.9808 12.8379 5.2945 10.5895 3.3673 9.4653C1.4401 8.34109 0.4765 7.93959 0.4765 8.2608H38.7796C38.7796 7.93959 37.816 8.34109 35.8888 9.4653C33.9616 10.5895 32.195 12.8379 30.589 16.2105C28.983 19.4225 28.18 24.2405 28.18 30.6645V86.3124H118.758V30.6645C118.758 24.2405 117.955 19.4225 116.349 16.2105C114.743 12.8379 112.977 10.5895 111.05 9.4653C109.122 8.34109 108.159 7.93959 108.159 8.2608H146.462C146.462 7.779 145.498 8.18049 143.571 9.4653C141.644 10.5895 139.877 12.8379 138.271 16.2105C136.826 19.4225 136.103 24.2405 136.103 30.6645V151.596C136.103 158.02 136.906 162.919 138.512 166.291C140.118 169.503 141.885 171.671 143.812 172.795C145.739 173.92 146.703 174.321 146.703 174H108.159ZM303.231 8.2608C301.625 8.58199 299.056 10.3486 295.523 13.5606C291.989 16.7726 287.733 22.7148 282.755 31.3872L241.079 102.934V151.596C241.079 159.787 242.203 165.488 244.452 168.7C246.7 171.912 248.788 173.679 250.715 174H214.098C216.026 173.679 218.113 171.992 220.362 168.941C222.61 165.729 223.734 159.947 223.734 151.596V102.694L182.54 31.1463C177.722 22.7951 173.547 17.0938 170.014 14.0424C166.48 10.8304 163.67 8.9032 161.582 8.2608H202.053C198.038 9.0638 196.031 11.6334 196.031 15.9696C196.031 17.415 196.513 19.1816 197.476 21.2694C198.44 23.1966 199.966 26.0071 202.053 29.7009L236.984 91.1304L271.914 30.6645C274.645 26.1677 276.01 21.5906 276.01 16.9332C276.01 13.8818 275.046 11.794 273.119 10.6698C271.352 9.38499 269.586 8.58199 267.819 8.2608H303.231ZM337.245 17.8968C330.179 17.8968 324.317 19.2619 319.66 21.9921C315.002 24.7223 311.63 28.1752 309.542 32.3508L312.914 8.2608H427.101L430.474 32.3508C428.386 28.1752 425.013 24.7223 420.356 21.9921C415.698 19.2619 409.836 17.8968 402.77 17.8968H378.68V151.596C378.68 158.02 379.483 162.919 381.089 166.291C382.695 169.664 384.462 171.912 386.389 173.036C388.316 174.161 389.28 174.482 389.28 174H350.977C350.977 174.482 351.94 174.161 353.867 173.036C355.795 171.912 357.481 169.744 358.926 166.532C360.532 163.159 361.335 158.181 361.335 151.596V17.8968H337.245ZM583.387 116.425C583.387 129.112 580.978 140.033 576.16 149.187C571.342 158.181 564.516 165.087 555.683 169.905C547.011 174.562 536.893 176.891 525.33 176.891C506.218 176.891 491.443 171.591 481.004 160.991C470.565 150.392 465.346 135.697 465.346 116.907V30.6645C465.346 24.2405 464.543 19.4225 462.937 16.2105C461.491 12.8379 459.805 10.5895 457.878 9.4653C456.111 8.34109 455.228 7.93959 455.228 8.2608H492.808C492.808 7.93959 491.845 8.34109 489.918 9.4653C488.151 10.5895 486.465 12.7576 484.859 15.9696C483.413 19.1816 482.691 23.839 482.691 29.9418V116.907C482.691 132.485 486.384 144.53 493.772 153.042C501.32 161.553 512.321 165.809 526.775 165.809C540.105 165.809 550.624 161.794 558.333 153.764C566.042 145.574 569.896 133.529 569.896 117.629V30.6645C569.896 24.2405 569.093 19.4225 567.487 16.2105C565.881 12.8379 564.115 10.5895 562.188 9.4653C560.26 8.34109 559.297 7.93959 559.297 8.2608H593.986C593.986 7.93959 593.023 8.34109 591.096 9.4653C589.168 10.5895 587.402 12.8379 585.796 16.2105C584.19 19.4225 583.387 24.2405 583.387 30.6645V116.425ZM674.908 90.6486C682.296 90.6486 688.72 88.9623 694.18 85.5897C699.64 82.0565 703.736 77.5597 706.466 72.0993C709.357 66.4783 710.802 60.6164 710.802 54.5136C710.802 48.2502 709.437 42.3883 706.707 36.9279C704.137 31.3069 700.122 26.7298 694.662 23.1966C689.201 19.6634 682.537 17.8968 674.667 17.8968H654.191V151.837C654.191 158.261 654.994 163.159 656.6 166.532C658.206 169.744 659.972 171.912 661.899 173.036C663.827 174 664.79 174.321 664.79 174H626.487C626.487 174.321 627.451 173.92 629.378 172.795C631.305 171.671 632.991 169.503 634.437 166.291C636.043 163.079 636.846 158.261 636.846 151.837V31.3872C636.846 24.8026 636.043 19.824 634.437 16.4514C632.991 12.9182 631.305 10.5895 629.378 9.4653C627.451 8.18049 626.487 7.779 626.487 8.2608H674.185C686.712 8.2608 696.991 10.3486 705.021 14.5242C713.211 18.5392 719.073 23.839 722.606 30.4236C726.3 36.8476 728.147 43.914 728.147 51.6228C728.147 58.0468 726.621 64.3905 723.57 70.6539C720.518 76.7567 716.102 82.1368 710.32 86.7942C704.699 91.291 698.115 94.4227 690.567 96.1893L686.712 96.912L729.111 150.874C734.732 157.137 739.389 161.955 743.083 165.328C746.777 168.7 749.426 170.949 751.032 172.073C752.799 173.197 753.843 173.839 754.164 174H725.979L660.454 90.6486H674.908ZM806.227 109.68L790.809 147.983C788.4 153.925 787.196 158.823 787.196 162.678C787.196 167.977 789.605 171.752 794.423 174H759.974C761.58 174 763.909 172.394 766.96 169.182C770.011 165.97 773.545 159.626 777.56 150.151L840.435 0.551998L902.828 150.874C906.361 159.546 909.733 165.488 912.945 168.7C916.318 171.912 918.968 173.679 920.895 174H880.906C884.921 172.073 886.928 169.102 886.928 165.087C886.928 161.714 885.643 156.896 883.074 150.633L866.211 109.68H806.227ZM862.356 99.8028L836.098 35.4825L810.322 99.8028H862.356Z"
                fill="#1F1F1F"
              />
            </svg>
          </a>
          <div className="hidden gap-2x md:flex">
            <a href="/" className={linkClass}>
              Home
            </a>
            <a
              href="/shop"
              className={linkClass}
              onMouseOver={() => setIsShopDropdownActive(true)}
              onMouseLeave={() => setIsShopDropdownActive(false)}
            >
              Shop
            </a>
            <a href="/about" className={linkClass}>
              About
            </a>
            <a href="/journal/news" className={linkClass}>
              Journal
            </a>
          </div>
        </div>
        <div className="z-[11] hidden w-full justify-end gap-2x py-2x pr-2x md:flex md:pr-3x">
          <button className={linkClass}>EN</button>
          <button className={linkClass}>Login</button>
          <button className={linkClass}>Cart (0)</button>
        </div>
        <div className="z-[11] flex gap-2x py-2x pr-2x md:hidden">
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <g clipPath="url(#clip0_179_843)">
              <path
                d="M12.5 4.5C12.5 2.29086 10.7091 0.5 8.5 0.5C6.29086 0.5 4.5 2.29086 4.5 4.5"
                stroke="black"
              />
              <path d="M16.5 4.5H0.5V19.5H16.5V4.5Z" stroke="black" />
            </g>
            <defs>
              <clipPath id="clip0_179_843">
                <rect width="17" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <g clipPath="url(#clip0_179_847)">
              <path d="M1 1H19" stroke="black" strokeLinecap="square" />
              <path d="M1 8H19" stroke="black" strokeLinecap="square" />
              <path d="M1 15H19" stroke="black" strokeLinecap="square" />
            </g>
            <defs>
              <clipPath id="clip0_179_847">
                <rect width="20" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div
          id="shop-dropdown-header"
          className={`${
            isShopDropdownActive
              ? "max-h-[200px] border-b py-3x"
              : "max-h-[0px] py-0 opacity-0"
          } absolute left-0 right-0 top-[54px] flex w-full justify-between overflow-hidden border-solid border-stroke-black bg-background-sand px-3x backdrop-blur-lg transition-all delay-75 duration-300 ease-in-out`}
          onMouseOver={() => setIsShopDropdownActive(true)}
          onMouseLeave={() => setIsShopDropdownActive(false)}
        >
          <div className="flex gap-2x">
            <div className="flex min-w-[175px] flex-col gap-1x">
              <h3 className="text-heading-xs">Main products</h3>
              <div className="flex flex-col gap-[4px]">
                <a href="/" className={`${linkClass} text-body-sm`}>
                  All
                </a>
                <a href="/" className={`${linkClass} text-body-sm`}>
                  Tools
                </a>
                <a href="/" className={`${linkClass} text-body-sm`}>
                  Product 1
                </a>
                <a href="/" className={`${linkClass} text-body-sm`}>
                  Gardeners
                </a>
              </div>
            </div>
            <div className="flex min-w-[175px] flex-col gap-1x">
              <h3 className="text-heading-xs">Other</h3>
              <div className="flex flex-col gap-[4px]">
                <a href="/" className={`${linkClass} text-body-sm`}>
                  Accessories
                </a>
              </div>
            </div>
          </div>
          <RenderImage
            src={"/hero.png"}
            alt={"product image"}
            width={1000}
            height={667}
            className={`max-h-full w-[200px]`}
            imageClassName="w-full h-full object-cover"
          />
        </div>
      </header>
    </>
  );
}

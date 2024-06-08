import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[70dvh] border-b border-stroke-gray p-4x">
      <div className="my-auto flex flex-col gap-2x">
        <h1 className="text-heading-lg">404 - Page not found</h1>
        <Link className="button-secondary flex w-fit gap-4x" href="/">
          Homepage
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_178_646)">
              <path
                d="M7.224 1.77195L12 6.52395L7.224 11.3H5.64L9.96 7.07595H0V5.92395H9.96L5.64 1.69995H7.224V1.77195Z"
                fill="#1F1F1F"
              />
            </g>
            <defs>
              <clipPath id="clip0_178_646">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
    </div>
  );
}

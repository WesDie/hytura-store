"use client";

export default function ReviewCard() {
  return (
    <div className="my-3x flex flex-col gap-2x bg-background-dark-sand px-3x py-4x">
      <div className="flex flex-col gap-1x">
        <h3 className="text-heading-2xs md:text-heading-xs">
          “Best product ever”
        </h3>
        <p className="text-body-xs md:text-body-sm">
          Simply water your plants as usual with our specially formulated
          solutions. For best results, use our water in combination with a
          proper feeding schedule and adequate sunlight...
        </p>
      </div>
      <p className="text-body-xs">By Wes Dieleman</p>
    </div>
  );
}

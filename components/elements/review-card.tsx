"use client";
import { Review } from "@/lib/shopify/types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col my-3x gap-2x bg-background-dark-sand px-3x py-4x">
      <div className="flex flex-col gap-1x">
        <h3 className="text-heading-2xs md:text-heading-xs">
          “{review.title}”
        </h3>
        <p className="text-body-xs md:text-body-sm">{review.content}</p>
      </div>
      <p className="text-body-xs">By {review.author}</p>
    </div>
  );
}

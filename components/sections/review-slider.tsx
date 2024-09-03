import Slider from "@/components/elements/slider";
import { Review } from "@/lib/shopify/types";

export default async function ReviewSlider() {
  const reviews: Review[] = [
    {
      title: "Perfect Starter Kit for Beginners!",
      content:
        "I bought the Hytura Green Essentials Kit as a gift for my friend who’s just starting with indoor plants, and she loved it! The products are easy to use and made her plants look healthier in just a week. Highly recommend it for anyone new to plant care.",
      author: "Sarah W.",
    },
    {
      title: "Saved My Dying Plants!",
      content:
        "The Revive & Shine Kit is a lifesaver! My plants were drooping and sad-looking, but after using the ReviveMist and GrowthBurst, they’ve perked up and started growing again. The LeafLuxe spray adds a nice shine, too. Fantastic kit!",
      author: "Mark L.",
    },
    {
      title: "Leaves Look So Fresh!",
      content:
        "I purchased the CleanLeaf spray, and I’m so impressed! My plants’ leaves look vibrant and dust-free. The AeroMix soil was perfect for repotting my ferns, and they’re thriving in it. Great value for the money!",
      author: "Emily R.",
    },
    {
      title: "A Must-Have for Plant Lovers",
      content:
        "The Hytura Green Essentials Kit has everything I need to keep my indoor garden lush and healthy. The GreenBoost Gel really helped my plants bounce back after repotting, and the Leaf Rescue Balm worked wonders on a damaged leaf. Worth every penny!",
      author: "David K.",
    },
    {
      title: "Great for Humidity-Loving Plants",
      content:
        "I’ve struggled to keep my tropical plants happy, but HydroMist and AeroMix Soil made a huge difference. The HydroMist adds just the right amount of moisture, and the AeroMix soil drains well, preventing overwatering. My plants have never looked better!",
      author: "Jenny M.",
    },
    {
      title: "Healthy Plants, Happy Me!",
      content:
        "The Revive & Shine Kit brought my wilting pothos back to life! The GrowthBurst is a game-changer for new growth, and the LeafLuxe spray makes my plants look showroom-ready. I’m very satisfied with this purchase!",
      author: "Carlos N.",
    },
    {
      title: "Best Kit for Plant Care Routine",
      content:
        "I’ve been using the Green Essentials Kit for a month now, and my plants are flourishing! The RootBlend Soil is excellent, and the GreenBoost Gel gives my plants an extra push. Love the combination of products—definitely a staple in my care routine.",
      author: "Anna T.",
    },
    {
      title: "Perfect for Reviving Stressed Plants",
      content:
        "The Revive & Shine Kit did wonders for my neglected plants. The ReviveMist brought back the color in the leaves, and the GrowthBurst helped new shoots come up. Easy to use and effective—totally worth it.",
      author: "Liam H.",
    },
    {
      title: "Keeps My Plants Happy!",
      content:
        "I use CleanLeaf on my indoor tropicals, and they love it! The spray keeps the dust off the leaves, making them look fresh and healthy. It’s the perfect product for maintaining beautiful, vibrant plants.",
      author: "Natalie P.",
    },
    {
      title: "Great Kit for New Growth",
      content:
        " bought the Green Essentials Kit to help my plants grow faster, and it didn’t disappoint! The GreenBoost Gel is easy to apply, and the RootBlend Soil is top quality. I’ve noticed a lot of new growth since using it. Highly recommended!",
      author: "Olivia J.",
    },
  ];

  return (
    <section className="w-full">
      <Slider
        text="Reviews"
        reviews={reviews}
        spaceBetween={24}
        paddingDesktop={32}
        paddingTablet={32}
        paddingMobile={16}
        slidesMobile={1.2}
        slidesTablet={2.2}
        slidesDesktop={3.3}
      />
    </section>
  );
}

import Faq from "@/components/sections/faq";

export default async function FaqPage() {
  const faqItems = [
    {
      question: "What makes your plant care liquids unique?",
      answer:
        "Our plant care liquids are crafted using premium, sustainably sourced ingredients and tailored to meet the specific needs of various indoor plant species, ensuring optimal growth and health.",
    },
    {
      question: "Where are your products made?",
      answer:
        "All our products are developed and produced in our facility, using high-quality ingredients and advanced techniques to ensure the best results for your indoor plants.",
    },
    {
      question: "Are your products safe for pets and children?",
      answer:
        "Yes, our plant care liquids are non-toxic and safe for use around pets and children when used as directed. However, we always recommend storing them out of reach.",
    },
    {
      question:
        "Do you offer different products for different types of plants?",
      answer:
        "Absolutely! We have specialized formulas designed for a wide range of plants, including succulents, tropical plants, ferns, and more. Each product is tailored to the unique requirements of different plant types.",
    },
    {
      question: "How often should I use your plant care liquids?",
      answer:
        "Usage depends on the specific product and plant type. Generally, we recommend using our liquids every 2-4 weeks, but always refer to the instructions on the label for the best results.",
    },
    {
      question: "Are your products organic or environmentally friendly?",
      answer:
        "We strive to use sustainably sourced ingredients and environmentally friendly practices in our production. While not all our products are certified organic, they are free from harmful chemicals and safe for the environment.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to many countries. Shipping costs and delivery times may vary based on your location. Check our shipping policy for more details.",
    },
    {
      question: "Can your products help revive struggling plants?",
      answer:
        "Our specially formulated liquids are designed to support plant health and growth. For struggling plants, our formulations can provide the essential nutrients needed for recovery, depending on the underlying issues.",
    },
    {
      question: "What is the shelf life of your plant care liquids?",
      answer:
        "Our plant care liquids have a shelf life of approximately 2 years when stored in a cool, dry place away from direct sunlight. Always check the expiration date on the bottle for the best results.",
    },
    {
      question: "How do I know which product is right for my plants?",
      answer:
        "We offer a variety of formulations tailored to different plant needs. You can refer to the product descriptions on our website or contact our customer support team for personalized recommendations.",
    },
    {
      question: "Do you provide any guidance on plant care?",
      answer:
        "Yes, we regularly update our blog with plant care tips, guides, and expert advice to help you make the most of our products and keep your plants thriving.",
    },
    {
      question: "Are your products vegan and cruelty-free?",
      answer:
        "Yes, our products are 100% vegan and cruelty-free. We do not use any animal-derived ingredients, nor do we test on animals.",
    },
    {
      question: "Can I use your products on outdoor plants?",
      answer:
        "While our products are specifically formulated for indoor plants, many of them are also suitable for outdoor use. However, we recommend checking the product details or consulting with our team for specific guidance.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods, including major credit cards, PayPal, and other secure payment options, to make your shopping experience easy and convenient.",
    },
    {
      question: "Do you offer any discounts or promotions?",
      answer:
        "Yes, we occasionally offer discounts and promotions. Sign up for our newsletter or follow us on social media to stay updated on the latest deals and offers.",
    },
  ];

  return (
    <main>
      <Faq
        direction="right"
        extraText="If you couldn’t find the answers you were looking for or if you have any additional inquiries, our dedicated customer support team is here to help. Feel free to reach out to us directly via our contact page or email us at support@hytura.com. We’re committed to providing the best care and support for your plant care needs."
        overwriteFaqItems={faqItems}
      />
    </main>
  );
}

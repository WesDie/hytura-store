"use client";

export default function QuantitySelector({
  quantity,
  setQuantity,
  maxQuantity = 50,
}: {
  quantity: number;
  maxQuantity?: number;
  setQuantity: (quantity: number) => void;
}) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > maxQuantity) {
      setQuantity(maxQuantity);
    } else if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="flex w-[80px] border border-stroke-gray py-[2px]">
      <button
        onClick={() => handleQuantityChange(quantity <= 1 ? 1 : quantity - 1)}
        className="text-body-sm w-full"
      >
        -
      </button>
      <input
        className="text-body-sm my-auto h-fit w-full bg-transparent text-center focus:outline-none"
        onChange={(e) => handleQuantityChange(Number(e.target.value))}
        value={quantity}
      />
      <button
        onClick={() => handleQuantityChange(quantity + 1)}
        className="text-body-sm w-full"
      >
        +
      </button>
    </div>
  );
}

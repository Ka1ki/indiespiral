import Link from "next/link";

export default function ProductCard({ product }) {
  const { _id, name, price, hero } = product;

  return (
    <Link href={`/shop/product/${_id}`}>
      <div>
        <div className="aspect-[2/3] group relative overflow-hidden">
          <img
            src={hero.url}
            className="w-full h-full object-cover object-center"
            alt={name}
          />
          {/* Quick Look text animation */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            Quick Look
          </div>
        </div>

        <div className="body mt-3">
          <h1 className="text-left text-lg font-medium">{name}</h1>
          {/* Price and amount */}
          <div className="flex">
            <p>Rs {price}/-</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

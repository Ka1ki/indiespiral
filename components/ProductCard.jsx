import Link from "next/link";

export default function ProductCard({ product }) {
  const { _id = "", name = "", price = "", hero = "", media = [] } = product;

  return (
    <Link href={`/shop/product/${_id}`}>
      <div className="product-card group text-primary">
        <div className="aspect-[2/3] overflow-hidden">
          <div className="product-image relative">
            <img
              src={hero.url}
              className="w-full h-full object-cover object-center"
              alt={name}
            />
            {media.length > 1 && (
              <img
                src={media[1].url}
                className="absolute top-0 left-full w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:translate-x-[-100%]"
                alt={name}
              />
            )}
          </div>
        </div>

        <div className="body mt-3">
          <h1 className="text-left font-syne">
            {name} - Rs {price}/-
          </h1>
        </div>
      </div>
    </Link>
  );
}

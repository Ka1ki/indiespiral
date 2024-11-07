import Link from "next/link";

export default function ProductCard({ product }) {
  const { _id = "", name = "", price = "", hero = "", media = [] } = product;

  return (
    <Link href={`/shop/product/${_id}`}>
      <div className="product-card group">
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
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              Quick Look
            </div>
          </div>
        </div>

        <div className="body mt-3">
          <h1 className="text-left text-lg font-medium">{name}</h1>
          <div className="flex">
            <p>Rs {price}/-</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

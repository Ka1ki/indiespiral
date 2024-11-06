"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

import Loading from "@/components/Loading";
import ProductImages from "@/components/ProductImages";

import { useQuery } from "@tanstack/react-query";
import * as categoryApi from "@/api/category";
import * as productApi from "@/api/product";
import * as varaintApi from "@/api/variant";

import useCartStore from "@/stores/useCartStore";
import ProductList from "@/components/ProductList";

function selectVariant(variants, filter) {
  return variants.filter((variant) => variant.filter === filter);
}

function Product() {
  // Cart & Wishlist Stuff
  const { cart, wishlist, addToCart, addToWishlist, isInCart, isInWishlist } =
    useCartStore();
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const router = useRouter();

  function handleAddToWishlist() {
    if (inWishlist) router.push("/shop/wishlist");
    else if (variant)
      addToWishlist({
        product: product.data._id,
        variant: variant._id,
        quantity: 1,
      });
  }

  function handleAddToCart() {
    if (inCart) router.push("/shop/cart");
    else if (variant)
      addToCart({
        product: product.data._id,
        variant: variant._id,
        quantity: 1,
      });
  }

  // API & Backend Stuff
  const [variant, setVariant] = useState(null);
  const [filter, setFilter] = useState([]);
  const [ready, setReady] = useState(false);

  const params = useParams();
  const product = useQuery(
    productApi.getOneOptions(params.product_id, { populate: ["hero", "media"] })
  );
  const variants = useQuery(
    varaintApi.listOptions({ product: params.product_id })
  );
  const relatedProducts = useQuery(
    productApi.listOptions({ limit: 8, populate: ["hero", "media"] })
  );

  // Initialize filter with first values for each variation
  useEffect(() => {
    if (product.data) {
      const tempV = {};
      product.data.variations.forEach((variation) => {
        // Select the first value by default
        tempV[variation.name] = variation.values[0];
      });
      setFilter(tempV);
    }
  }, [product.data]);

  // Check if all filters are selected and handle single variant case
  useEffect(() => {
    if (variants.data) {
      if (variants.data.length === 1) {
        setReady(true);
      } else {
        const allFiltersSelected = Object.values(filter).every(
          (value) => value !== false
        );
        setReady(allFiltersSelected);
      }
    }
  }, [filter, variants.data]);

  // Set variant based on filter or select the only variant
  useEffect(() => {
    if (variants.data) {
      if (variants.data.length === 1) {
        setVariant(variants.data[0]);
      } else if (ready) {
        const matchingVariant = variants.data.filter(
          (variant) => JSON.stringify(variant.filter) === JSON.stringify(filter)
        )[0];
        setVariant(matchingVariant);
      } else {
        setVariant(null);
      }
    }
  }, [filter, ready, variants.data]);

  // Check if it's in cart
  useEffect(() => {
    product.data &&
      variant &&
      setInCart(isInCart(product.data._id, variant._id));
    product.data &&
      variant &&
      setInWishlist(isInWishlist(product.data._id, variant._id));
  }, [cart, wishlist, product, variant, isInCart, isInWishlist]);

  // Loading & Error Handling
  if (product.isLoading || variants.isLoading || relatedProducts.isLoading)
    return <Loading />;
  const images = [...product.data.media];

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:sticky md:top-24">
            <ProductImages media={images} />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.data.name}</h1>

            <p className="text-2xl font-bold text-primary">
              {variant && variant.price
                ? "Rs." + variant.price
                : "Start From Rs. " + product.data.price}
              <span className="font-normal line-through text-secondary ml-2">
                {variant ? variant.cost : product.data.cost}
              </span>
            </p>

            <div className="py-4 border-t border-b">
              <VariantSelector
                variants={product.data.variations}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            {!ready && variants.data && variants.data.length > 1 && (
              <div className="p-4 bg-primary text-white text-center">
                Please select an option from each variant above
              </div>
            )}

            <div className="flex gap-4">
              <button
                className="flex-1 btn btn-primary"
                disabled={!variant}
                onClick={handleAddToCart}
              >
                {inCart ? "Go To Cart" : "Add To Cart"}
              </button>
              <button
                className="flex-1 btn btn-outline btn-primary"
                disabled={!variant}
                onClick={handleAddToWishlist}
              >
                {inWishlist ? "Go To Wishlist" : "Add To Wishlist"}
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Product Description
              </h2>
              <div
                className="prose max-w-none overflow-hidden"
                dangerouslySetInnerHTML={{ __html: product.data.description }}
              />
            </div>
          </div>
        </div>

        <div className="my-10">
          <ProductList
            products={relatedProducts.data}
            title="Related Products"
            description=" "
          />
        </div>
      </div>
    </div>
  );
}

function VariantSelector({ variants, filter, setFilter }) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-4">
      {variants.map((variant) => (
        <div key={variant.name} className="space-y-2">
          <span className="font-medium">{variant.name}:</span>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((value) => (
              <button
                key={variant.name + value}
                className={`px-4 py-2  ${
                  filter[variant.name] === value
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setFilter({ ...filter, [variant.name]: value })}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;

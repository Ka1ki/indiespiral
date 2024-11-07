"use client";
import React from "react";
import useCartStore from "@/stores/useCartStore";
import { useQuery } from "@tanstack/react-query";
import { wishlistOptions } from "@/api/product";
import {
  Heart,
  ShoppingCart,
  Package,
  Delete,
  DeleteIcon,
  Trash,
  Trash2,
} from "lucide-react";

const WishlistPage = () => {
  const wishlistStore = useCartStore((state) => state.wishlist);
  const wishlist = useQuery(wishlistOptions({ wishlist: wishlistStore }));
  const [toast, setToast] = React.useState(null);

  const handleRemoveItem = (productId, variantId) => {
    useCartStore.getState().removeFromWishlist(productId, variantId);
    setToast({
      type: "success",
      message: "Item removed from wishlist",
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleMoveToCart = (item) => {
    useCartStore.getState().moveToCart(item.product, item.variant);
    setToast({
      type: "success",
      message: "Item moved to cart",
    });
    setTimeout(() => setToast(null), 3000);
  };

  if (wishlist.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-lg text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlist.isError) {
    return (
      <div className="container mx-auto px-4">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error loading wishlist. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      {/* Toast Notification */}
      {toast && (
        <div className="toast toast-top toast-end">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
          <span className="text-sm text-gray-500 ml-2">
            ({wishlist.data?.length || 0} items)
          </span>
        </div>

        {!wishlist.data || wishlist.data.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add items to your wishlist to save them for later
            </p>
            <a href="/shop" className="btn btn-primary">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.data.map((item) => (
              <WishlistItem
                key={`${item.product}-${item.variant}`}
                item={item}
                onRemove={handleRemoveItem}
                onMoveToCart={handleMoveToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  return (
    <div className="card bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <figure className="relative pt-[125%]">
        <img
          src={item.data.hero}
          alt={item.data.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {item.data.collections?.length > 0 && (
          <div className="absolute top-2 left-2">
            <span className="badge badge-primary">
              {item.data.collections[0]}
            </span>
          </div>
        )}
      </figure>

      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold line-clamp-1">
          {item.data.name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{item.data.variation}</p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold">
            ₹{item.data.price.toFixed(2)}
          </span>
          {item.data.cost < item.data.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{(item.data.price * 1.2).toFixed(2)}
            </span>
          )}
        </div>

        <div className="card-actions justify-between items-center">
          <button
            onClick={() => onMoveToCart(item)}
            className="btn btn-primary btn-sm flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
          <button
            onClick={() => onRemove(item.product, item.variant)}
            className="btn btn-ghost btn-sm text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;

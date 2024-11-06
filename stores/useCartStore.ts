import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAccountStore from "@/stores/useAccountStore";
import { crud } from "@/api/crud";
import { toast } from "react-toastify";

interface Item {
	product: string; // ObjectId as string
	variant: string; // ObjectId as string
	quantity: number;
}

interface CartState {
	cart: Item[];
	wishlist: Item[];
	readyToSync: boolean;
	setReadyToSync: (readyToSync: boolean) => void;
	isInCart: (productId: string, variantId: string) => boolean;
	isInWishlist: (productId: string, variantId: string) => boolean;
	addToCart: (item: Item) => void;
	removeFromCart: (productId: string, variantId: string) => void;
	updateCartItemQuantity: (
		productId: string,
		variantId: string,
		quantity: number
	) => void;
	clearCart: () => void;
	addToWishlist: (item: Item) => void;
	removeFromWishlist: (productId: string, variantId: string) => void;
	moveToCart: (productId: string, variantId: string) => void;
	moveToWishlist: (productId: string, variantId: string) => void;
	clearWishlist: () => void;
	syncCartAndWishlist: (cart: Item[], wishlist: Item[]) => void;
}

async function syncWithAccount(cart: Item[], wishlist: Item[]) {
	const response = await crud.put("/account", { cart, wishlist });
	if (response.error) {
		console.error(response.error);
		toast.error("An error occurred while syncing with your account");
	} else {
		console.log(response.data);
	}
}

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cart: [],
			wishlist: [],
			readyToSync: false,
			setReadyToSync: (readyToSync: boolean) => set({ readyToSync }),

			isInCart: (productId, variantId) => {
				const { cart } = get();
				return cart.some(
					(item) => item.product === productId && item.variant === variantId
				);
			},

			isInWishlist: (productId, variantId) => {
				const { wishlist } = get();
				return wishlist.some(
					(item) => item.product === productId && item.variant === variantId
				);
			},

			addToCart: (item) => {
				set((state) => {
					const existingItem = state.cart.find(
						(i) => i.product === item.product && i.variant === item.variant
					);
					if (existingItem) {
						return {
							cart: state.cart.map((i) =>
								i.product === item.product && i.variant === item.variant
									? { ...i, quantity: i.quantity + item.quantity }
									: i
							),
						};
					}
					return { cart: [...state.cart, item] };
				});

				// if (useAccountStore.getState().token)
				// 	syncWithAccount(get().cart, get().wishlist);
			},

			removeFromCart: (productId, variantId) =>
				set((state) => ({
					cart: state.cart.filter(
						(item) =>
							!(item.product === productId && item.variant === variantId)
					),
				})),

			updateCartItemQuantity: (productId, variantId, quantity) =>
				set((state) => ({
					cart: state.cart.map((item) =>
						item.product === productId && item.variant === variantId
							? { ...item, quantity }
							: item
					),
				})),

			clearCart: () => set({ cart: [] }),

			addToWishlist: (item) =>
				set((state) => {
					const existingItem = state.wishlist.find(
						(i) => i.product === item.product && i.variant === item.variant
					);
					if (existingItem) return state;
					return { wishlist: [...state.wishlist, item] };
				}),

			removeFromWishlist: (productId, variantId) =>
				set((state) => ({
					wishlist: state.wishlist.filter(
						(item) =>
							!(item.product === productId && item.variant === variantId)
					),
				})),

			moveToCart: (productId, variantId) =>
				set((state) => {
					const item = state.wishlist.find(
						(i) => i.product === productId && i.variant === variantId
					);
					if (!item) return state;
					const newWishlist = state.wishlist.filter(
						(i) => !(i.product === productId && i.variant === variantId)
					);
					return {
						wishlist: newWishlist,
						cart: [...state.cart, item],
					};
				}),

			moveToWishlist: (productId, variantId) =>
				set((state) => {
					const item = state.cart.find(
						(i) => i.product === productId && i.variant === variantId
					);
					if (!item) return state;
					const newCart = state.cart.filter(
						(i) => !(i.product === productId && i.variant === variantId)
					);
					return {
						cart: newCart,
						wishlist: [...state.wishlist, item],
					};
				}),

			clearWishlist: () => set({ wishlist: [] }),

			syncCartAndWishlist: (cart: Item[], wishlist: Item[]) => {
				set({ cart, wishlist });
			},
		}),
		{
			name: "cart-storage",
			getStorage: () => localStorage,
		}
	)
);

export default useCartStore;

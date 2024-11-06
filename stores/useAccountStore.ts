import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./useCartStore";

interface AccountState {
	account: {
		_id: string;
		email: string;
		phone: string;
		name: string;
	};
	token: string;
	login: (account: AccountState["account"], token: string) => void;
	logout: () => void;
}

const useAccountStore = create<AccountState>()(
	persist(
		(set) => ({
			account: {
				_id: "",
				email: "",
				phone: "",
				name: "",
			},
			token: "",
			login: (account: any, token) => {
				set({ account, token });
				useCartStore.getState().setReadyToSync(true);
				useCartStore
					.getState()
					.syncCartAndWishlist(account.cart, account.wishlist);
			},
			logout: () => {
				set({
					account: { _id: "", email: "", phone: "", name: "" },
					token: "",
				});
				useCartStore.getState().setReadyToSync(false);
				useCartStore.getState().clearWishlist();
				useCartStore.getState().clearCart();
			},
		}),
		{
			name: "account-storage",
		}
	)
);

export default useAccountStore;

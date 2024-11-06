"use client";
import React, { useEffect, useState } from "react";
import useAccountStore from "@/stores/useAccountStore";
import useCartStore from "@/stores/useCartStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as accountApi from "@/api/account";
import { qcrud } from "@/api/crud";
import { delay } from "lodash";

// Super component to manage account, cart and wishlist
export function AccountSuper() {
  const account = useAccountStore((state) => state.account);
  const token = useAccountStore((state) => state.token);
  const cart = useCartStore((state) => state.cart);
  const wishlist = useCartStore((state) => state.wishlist);
  const readyToSync = useCartStore((state) => state.readyToSync);
  const [wait, setWait] = useState(false);

  const user = useQuery({
    queryKey: ["/account", "user"],
    queryFn: () => qcrud.get("/account/user"),
    enabled: !!token,
  });

  const updateAccount = useMutation(accountApi.updateAccountOptions());

  // Update account backend when cart or wishlist changes
  useEffect(() => {
    // console.log("1: Cart or Wishlist updated");
    if (token && readyToSync) {
      // console.log("1.1: Updated on Backend");
      updateAccount.mutate({ cart, wishlist });
    }
  }, [cart, wishlist, readyToSync]);

  // Refetch user when token changes
  useEffect(() => {
    // console.log("2: Token updated");
    if (token) {
      // console.log("2.1: Refetching user");
      user.refetch();
    }
  }, [token]);

  // Update cart state when user changes
  useEffect(() => {
    // console.log("3: User updated");
    // console.log("User", user.data);
    if (user.data && user.data.cart && user.data.wishlist) {
      // console.log("3.1: Resetting cart and wishlist");
      useAccountStore.setState({ account: user.data });

      //check if there is any difference between the cart and the user cart
      if (
        JSON.stringify(cart) !== JSON.stringify(user.data.cart) ||
        JSON.stringify(wishlist) !== JSON.stringify(user.data.wishlist)
      ) {
        useCartStore
          .getState()
          .syncCartAndWishlist(user.data.cart, user.data.wishlist);
      }
    }
  }, [user.data]);

  return null;
}

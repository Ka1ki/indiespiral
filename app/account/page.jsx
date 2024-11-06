// app/account/page.js
"use client";
import { useState } from "react";
import { User, ShoppingCart, Heart, MapPin, Lock, LogOut } from "lucide-react";
import Link from "next/link";
import useAccountStore from "@/stores/useAccountStore";
import { useQuery } from "@tanstack/react-query";
import * as authApi from "@/api/auth";

function AccountPage() {
  const token = useAccountStore((state) => state.token);
  function handleLogout(e) {
    e.preventDefault();
    useAccountStore.getState().logout();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
        {/* Profile Circle Icon */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full">
            <User size={48} className="text-gray-600" />
          </div>
        </div>

        {/* Account Options or Login Button */}
        {token ? (
          <div className="space-y-4">
            {/* Menu Options */}
            <Link
              href="/"
              className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <User size={20} className="text-gray-600" />
              <span className="font-medium">Profile</span>
            </Link>
            <Link
              href="/shop/orders"
              className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="font-medium">Orders</span>
            </Link>
            <Link
              href="/shop/wishlist"
              className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <Heart size={20} className="text-gray-600" />
              <span className="font-medium">Wishlist</span>
            </Link>
            <Link
              href="/account/addresses"
              className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <MapPin size={20} className="text-gray-600" />
              <span className="font-medium">Addresses</span>
            </Link>
            <Link
              href="/account/password"
              className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <Lock size={20} className="text-gray-600" />
              <span className="font-medium">Password</span>
            </Link>

            {/* Logout Button */}
            <div className="flex justify-center mt-6">
              <button
                className="w-full btn btn-outline btn-primary"
                onClick={handleLogout}
              >
                <LogOut size={20} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link href="/account/login" className="w-full btn btn-primary ">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default AccountPage;

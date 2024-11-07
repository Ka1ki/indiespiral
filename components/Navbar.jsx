"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  X,
  Music,
  Video,
  ShoppingBag,
  CircleUserRound,
  Menu,
} from "lucide-react";
import Link from "next/link";
import useCartStore from "@/stores/useCartStore";
import { useRouter } from "next/navigation";

function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`fixed top-0 z-50 text-neutral-500 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="navbar container mx-auto py-4 px-3">
        {/* Logo Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost md:hidden"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </label>
            {/* Mobile Menu */}
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link href="/" className="text-neutral-800 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/shop">E-books & Prints</Link>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="text-3xl font-tangerine text-primary">
            Indiespiral
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center text-primary">
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex gap-8 text-xs mr-4">
            <Link href="/" className="font-medium ">
              Home
            </Link>
            <Link href="/about" className="">
              About
            </Link>
            <Link href="/courses" className="">
              Courses
            </Link>
            <Link href="/shop" className=" whitespace-nowrap">
              E-books & Prints
            </Link>
            <Link href="/blogs" className="">
              Blogs
            </Link>
          </div>

          {/* Icons Section */}
        </div>

        <div className="navbar-end text-primary">
          <div className="flex items-center gap-4">
            <button className="btn btn-ghost btn-circle">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="btn btn-ghost btn-circle indicator">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            <button className="btn btn-ghost btn-circle">
              <CircleUserRound className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchModal() {
  // SearchModal component remains unchanged
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSearch = (e, type) => {
    e.preventDefault();
    const searchQuery = new URLSearchParams();
    searchQuery.set("search", searchTerm);
    router.push(`/${type}?${searchQuery.toString()}`);
    console.log(`Searching for ${searchTerm} in ${type}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn hover:bg-neutral-800 hover:text-accent btn-ghost btn-circle"
      >
        <Search size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm text-neutral-900">
          <div className="relative w-full max-w-2xl p-10 m-4 bg-white rounded-lg shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <form onSubmit={(e) => handleSearch(e, "shop")} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-4 pr-12 text-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Search
                  size={24}
                  className="absolute text-gray-400 top-4 right-4"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

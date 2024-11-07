"use client";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import * as pageApi from "@/api/page";
import * as categoryApi from "@/api/category";
import * as productApi from "@/api/product";
import * as collectionApi from "@/api/collection";
import ProductList from "@/components/ProductList";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const pageData = useQuery(pageApi.getQueryOptions({ slug: "home" }));
  const rootCategories = useQuery(categoryApi.listOptions({ parent: "root" }));
  const collections = useQuery(
    collectionApi.listOptions({ populate: "image" })
  );

  const featuredProducts = useQuery(
    productApi.listOptions({ populate: ["hero", "media"] })
  );

  if (
    pageData.isLoading ||
    rootCategories.isLoading ||
    collections.isLoading ||
    featuredProducts.isLoading
  )
    return <Loading />;

  if (pageData.isError) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-16 mb-24">
      <Hero />
      <Highlights />
      <About />
      <ProductList products={featuredProducts.data} title="Favourite" />
      <Categories />
      <About2 />
      <MediaCoverage />
      <Newsletter />
    </div>
  );
}

const Hero = () => {
  return (
    <div>
      <div className="relative h-96 md:h-[600px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better content visibility */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

        {/* Centered content container */}
        <div className="relative z-20 flex items-center justify-center min-h-full">
          <div className="text-center text-white px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Howdy, Round Top
            </h1>
            <h2 className="text-xl sm:text-2xl mb-8">
              Calling all cowgirls: our new scarf is here!
            </h2>
            <Link
              href="/shop"
              className="btn btn-primary px-6 sm:px-8 py-2 sm:py-3 font-semibold transition-colors"
            >
              Shop New
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-3 py-8 sm:py-10 text-center">
          <span className="tracking-[0.3em] text-xs sm:text-sm font-syne inline-block">
            NEW
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-syne my-4 sm:my-6">
            SWELLS GAMEDAY
          </h1>
          <p className="font-tangerine text-4xl sm:text-5xl mb-8 sm:mb-10">
            class of 2024
          </p>
          <Link
            href="/shop"
            className="underline text-xs sm:text-sm font-medium"
          >
            Shop all 18 colors
          </Link>
        </div>
      </div>
    </div>
  );
};

const Highlights = () => {
  return (
    <div className="container mx-auto px-3 sm:px-0 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
      {[1, 2, 3, 4].map((item, index) => (
        <div key={index} className="aspect-[4/5] sm:aspect-[4/5]">
          <img
            src="https://placehold.co/400x500"
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto px-3 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="bg-primary text-white flex flex-col justify-center items-center gap-5 p-5 sm:p-10 text-center">
        <img
          src="https://shopswells.com/cdn/shop/files/Untitled_-_July_9_2024_16.57.27.png?v=1720541249&width=180"
          alt=""
          className="w-24 sm:w-auto"
        />
        <p className="text-sm sm:text-base">
          Every Swells scarf is 100% original, drawn by our founder, Wells.
          They're equal parts trend and treasure, the balance that makes our
          scarves so special.
        </p>

        <button className="btn px-6 sm:px-8 py-2 sm:py-3 font-semibold transition-colors">
          Shop Now
        </button>
      </div>
      <div className="h-[300px] sm:h-[420px]">
        <img
          src="/about-home.jpg"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>

      <div className="text-primary flex flex-col items-center justify-center gap-3 text-center py-8 sm:py-10">
        <h1 className="text-3xl sm:text-5xl font-syne">
          "They're a great gift for your sister, friend, or mother-in-law,"
        </h1>
        <p className="text-sm sm:text-base">- Jhon Doe</p>
      </div>

      <div className="text-primary flex flex-col items-center justify-center gap-3 text-center py-8 sm:py-10">
        <h1 className="text-3xl sm:text-5xl font-syne">
          ""Something they won't return or regift"
        </h1>
        <p className="text-sm sm:text-base">- Better Homes & Gardens</p>
      </div>
    </div>
  );
};

// Categories
const Categories = () => {
  return (
    <div className="container mx-auto px-3 sm:px-0 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="cursor-pointer">
          <div className="aspect-square">
            <img
              src="https://placehold.co/400x400"
              className="object-cover w-full h-full rounded-full hover:scale-105 transition-transform"
              alt=""
            />
          </div>

          <h1 className="text-center mt-4 sm:mt-5 text-primary font-medium text-base sm:text-xl">
            Ribbons
          </h1>
        </div>
      ))}
    </div>
  );
};

// About2
const About2 = () => {
  return (
    <div className="container mx-auto px-3 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="bg-primary text-white flex flex-col justify-center items-center gap-5 py-16 sm:py-20 px-6 sm:px-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-syne">Custom Scarves</h1>
        <p className="text-base sm:text-xl leading-[2.5em] sm:leading-[3em] tracking-wide">
          Something that shares a story. Something that your bridesmaid will
          wear again. Something sizeless for your corporate event. The perfect
          gift meant just for them.
        </p>

        <button className="btn px-6 sm:px-8 py-2 sm:py-3 font-semibold transition-colors">
          Create A Scarf Now
        </button>
      </div>
      <div>
        <img
          src="https://placehold.co/400x400"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </div>
  );
};

// MediaCoverage
const MediaCoverage = () => {
  return (
    <div>
      <h1 className="text-center text-primary font-syne font-light mb-4 sm:mb-5">
        As Seen in
      </h1>

      <Marquee>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <img
            src="https://placehold.co/400x200"
            className="object-cover w-32 sm:w-40 h-16 sm:h-20 mx-4 sm:mx-5"
            alt=""
            key={i}
          />
        ))}
      </Marquee>
    </div>
  );
};

// Newsletter
const Newsletter = () => {
  return (
    <div className="container mx-auto px-3 sm:px-0">
      <div className="newsletter-card bg-no-repeat bg-center bg-cover w-full h-[500px] sm:h-[700px] flex flex-col items-center justify-center text-white relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-5xl font-syne">
            Signup For Our Newsletter
          </h1>
          <p className="text-base sm:text-lg">Get 10% off your first order</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-4 sm:mt-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 sm:p-3 w-full sm:w-96 text-neutral-800"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

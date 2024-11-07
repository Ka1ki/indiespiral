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
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Howdy, Round Top</h1>
            <h2 className="text-2xl mb-8">
              Calling all cowgirls: our new scarf is here!
            </h2>
            <Link
              href="/shop"
              className="btn btn-primary px-8 py-3 font-semibold transition-colors"
            >
              Shop New
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white">
        <div className="container mx-auto px-3 py-10 text-center">
          <span className="tracking-[0.3em] text-sm font-syne inline-block">
            NEW
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-syne my-6">
            SWELLS GAMEDAY
          </h1>
          <p className="font-tangerine text-5xl mb-10">class of 2024</p>
          <Link href="/shop" className="underline text-sm font-medium">
            Shop all 18 colors
          </Link>
        </div>
      </div>
    </div>
  );
};

const Highlights = () => {
  return (
    <div className="container mx-auto px-3 grid grid-cols-4 gap-5">
      {[1, 2, 3, 4].map(() => (
        <div className="">
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
    <div className="container mx-auto px-3 grid grid-cols-2 gap-5">
      <div className="bg-primary text-white flex flex-col justify-center items-center gap-5 p-5 text-center">
        <img
          src="https://shopswells.com/cdn/shop/files/Untitled_-_July_9_2024_16.57.27.png?v=1720541249&width=180"
          alt=""
        />
        <p>
          Every Swells scarf is 100% original, drawn by our founder, Wells.
          They're equal parts trend and treasure, the balance that makes our
          scarves so special.
        </p>

        <button className="btn px-8 py-3 font-semibold transition-colors">
          Shop Now
        </button>
      </div>
      <div className="h-[420px]">
        <img
          src="/about-home.jpg"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>

      <div className="text-primary flex flex-col items-center justify-center gap-3 text-center py-10">
        <h1 className="text-5xl font-syne">
          “They’re a great gift for your sister, friend, or mother-in-law,"
        </h1>
        <p>- Jhon Doe</p>
      </div>

      <div className="text-primary flex flex-col items-center justify-center gap-3 text-center py-10">
        <h1 className="text-5xl font-syne">
          ““Something they won't return or regift"
        </h1>
        <p>- Better Homes & Gardens</p>
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <div className="container mx-auto px-3 grid grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="cursor-pointer">
          <div className="w-72 h-72">
            <img
              src="https://placehold.co/400x400"
              className="object-cover w-full h-full rounded-full hover:scale-105"
              alt=""
            />
          </div>

          <h1 className="text-center mt-5 text-primary font-medium text-xl">
            Ribbons
          </h1>
        </div>
      ))}
    </div>
  );
};

const About2 = () => {
  return (
    <div className="container mx-auto px-3 grid grid-cols-2 gap-5">
      <div className="bg-primary text-white flex flex-col justify-center items-center gap-5 py-20 px-10 text-center">
        <h1 className="text-4xl font-syne">Custom Scarves</h1>
        <p className="text-xl leading-[3em] tracking-wide">
          Something that shares a story. Something that your bridesmaid will
          wear again. Something sizeless for your corporate event. The perfect
          gift meant just for them.
        </p>

        <button className="btn px-8 py-3 font-semibold transition-colors">
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

const MediaCoverage = () => {
  return (
    <div>
      <h1 className="text-center text-primary font-syne font-light mb-5">
        As Seen in
      </h1>

      <Marquee>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <img
            src="https://placehold.co/400x200"
            className="object-cover w-40 h-20 mx-5"
            alt=""
            key={i}
          />
        ))}
      </Marquee>
    </div>
  );
};

const Newsletter = () => {
  return (
    <div className="container mx-auto px-3">
      <div className="newsletter-card bg-no-repeat bg-center bg-cover w-full h-[700px] flex flex-col items-center justify-center text-white relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-syne">Signup For Our Newsletter</h1>
          <p className="text-lg">Get 10% off your first order</p>
          <div className="flex gap-5 mt-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-96 text-neutral-800"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

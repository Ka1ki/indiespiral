"use client";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  // const pageData = useQuery(pageApi.getQueryOptions({ slug: "home" }));
  const rootCategories = useQuery(categoryApi.listOptions({ parent: "root" }));
  const collections = useQuery(
    collectionApi.listOptions({ populate: "image" })
  );

  const featuredProducts = useQuery(
    productApi.listOptions({ tags: "featured", populate: ["hero", "media"] })
  );

  // if (
  //   pageData.isLoading ||
  //   rootCategories.isLoading ||
  //   collections.isLoading ||
  //   featuredProducts.isLoading
  // )
  //   return <Loading />;

  // if (pageData.isError) return <div>Error...</div>;

  return <div className="flex flex-col gap-20 lg:gap-32 mb-24"></div>;
}

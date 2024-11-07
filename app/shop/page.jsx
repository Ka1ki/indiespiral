"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import * as OrgApi from "@/api/org";
import * as categoryApi from "@/api/category";
import * as productApi from "@/api/product";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Empty from "@/components/Empty";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SearchFilter from "@/components/SearchFilter";

function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const org = useQuery(OrgApi.getOneOptions());

  const category_id = searchParams.get("category") || "root";
  const category = useQuery(
    categoryApi.getOneOptions(category_id, { populate: "parents" })
  );

  const categories = useQuery(categoryApi.listOptions({ parent: "root" }));

  // Get all selected sizes and colors
  const sizes = searchParams.getAll("size");
  const colors = searchParams.getAll("color");

  // Create variantTags array combining all selected sizes and colors
  const variantTags = [...sizes, ...colors];

  const productQuery = {
    populate: ["hero", "media"],
    ...(category_id && category_id !== "root" && { categories: category_id }),
    ...(searchParams.get("search") && { search: searchParams.get("search") }),
    sortBy: searchParams.get("sortBy") || "created",
    sort: searchParams.get("sort") || "-1",
    page: page,
    limit: 30,
    // Only add variantTags if there are any filters applied
    ...(variantTags.length > 0 && { variantTags }),
  };

  const products = useQuery({
    ...productApi.listOptions(productQuery),
    keepPreviousData: true,
  });

  const count = useQuery(productApi.countOptions(productQuery));

  if (
    org.isLoading ||
    category.isLoading ||
    categories.isLoading ||
    products.isLoading ||
    count.isLoading
  )
    return <Loading />;
  if (
    org.isError ||
    category.isError ||
    categories.isError ||
    products.isError ||
    count.isError
  )
    return <Error />;

  if (!products.data || products.data.length === 0) return <Empty />;
  const totalPages = Math.ceil(count.data);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/shop?page=${newPage}&${searchParams.toString()}`);
  };

  return (
    <div>
      <Hero></Hero>
      <div className="grid lg:grid-cols-3 2xl:grid-cols-4 container mx-auto px-3 py-10">
        <div className="col-span-1">
          <SearchFilter
            shopVariants={org.data.shopVariants}
            categories={categories.data}
          ></SearchFilter>
        </div>

        <div className="col-span-2 2xl:col-span-3">
          {products.data.length ? (
            <>
              <ProductList products={products.data} />
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <Empty />
          )}
        </div>
      </div>
      {/* <Breadcrumbs category={category.data} />
      <PinnedLinks categories={categories.data} />
      <CSSBar /> */}
      {/* {products.data.length ? (
        <>
          <ProductList products={products.data} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Empty />
      )} */}
    </div>
  );
}

function Hero({ hero }) {
  // image = "/hero4.png";
  return (
    <div className="my-10">
      <h1 className="text-6xl font-tangerine text-center mb-2">Scarves</h1>

      <p className="max-w-2xl mx-auto px-3 text-center">
        your new favorite accessory :) tie together your look with a scarf from
        swells! all scarves are made to order and typically take around two
        weeks.
      </p>
    </div>
  );
}

function Breadcrumbs({ category }) {
  const parents = [{ _id: "root", name: "Shop" }, ...category?.parents] || [
    { _id: "root", name: "Shop" },
  ];

  const router = useRouter();
  const handleCrumbClick = (categoryId) => {
    router.push(`?category=${categoryId}`);
  };

  return (
    <div className="flex w-full max-w-screen-xl gap-2 mt-16 text-4xl text-left">
      {parents.map((categ, index) => (
        <div key={categ._id} className="flex items-center">
          <h1
            className="text-primary hover:cursor-pointer"
            onClick={() => handleCrumbClick(categ._id)}
          >
            {categ.name}
          </h1>
          {parents.length && category.name != "All Products" && (
            <span className="mx-2 text-2xl text-gray-500 ">/</span>
          )}
        </div>
      ))}
      {category._id != "root" && (
        <div className="flex items-center">
          <h1>{category.name}</h1>
        </div>
      )}
    </div>
  );
}

function PinnedLinks({ categories }) {
  const searchParams = useSearchParams();

  const createHref = (category) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("search");
    newSearchParams.set("category", category._id);
    newSearchParams.set("name", category.name);
    return `?${newSearchParams.toString()}`;
  };

  return (
    <div className="w-full max-w-screen-xl px-2 py-2 overflow-x-auto">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={createHref(category)}
            className="flex-shrink-0 p-3 text-xl font-bold text-center transition-transform duration-200 bg-transparent text-primary bg-secondary ring-2 ring-primary hover:bg-primary hover:text-neutral-100 hover:scale-105 whitespace-nowrap"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function PinnedLinks2({ categories }) {
  const searchParams = useSearchParams();

  const createHref = (category) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("search");
    newSearchParams.set("category", category._id);
    newSearchParams.set("name", category.name);
    return `?${newSearchParams.toString()}`;
  };

  return (
    <div className="flex flex-wrap flex-1 w-full max-w-screen-xl gap-4">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={createHref(category)}
          className="flex-grow p-3 text-xl font-bold text-center transition-transform duration-200 bg-transparent text-primary bg-secondary ring-2 ring-primary hover:bg-primary hover:text-neutral-100 hover:scale-105"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

//TODO: increase text size and check colors
function CSSBar() {
  const [search, setSearch] = React.useState("");
  const [sortData, setSortData] = React.useState({
    sort: "1",
    sortBy: "created",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setSortData({
      sort: searchParams.get("sort") || "-1",
      sortBy: searchParams.get("sortBy") || "created",
    });
  }, [searchParams]);

  function handleSearch() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (search) newSearchParams.set("search", search);
    else newSearchParams.delete("search");
    newSearchParams.delete("category");
    newSearchParams.delete("name");
    newSearchParams.set("sortBy", sortData.sortBy);
    newSearchParams.set("sort", sortData.sort);
    router.replace(`?${newSearchParams.toString()}`);
  }

  function handleSortChange(e) {
    const [sort, sortBy] = e.target.value.split(",");
    setSortData({ sort, sortBy });
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortBy", sortBy);
    newSearchParams.set("sort", sort);
    if (search) newSearchParams.set("search", search);
    router.replace(`?${newSearchParams.toString()}`);
  }

  return (
    <div className="flex flex-col-reverse items-center justify-between w-full max-w-screen-xl gap-4 sm:flex-row-reverse">
      <div className="flex w-full gap-4 sm:w-2/5">
        <select
          value={`${sortData.sort},${sortData.sortBy}`}
          onChange={handleSortChange}
          className="w-full max-w-xs bg-transparent select select-bordered select-primary text-primary"
        >
          <option disabled>Sort By</option>
          <option value="-1,created">Newest</option>
          <option value="1,created">Oldest</option>
          <option value="-1,amount">Price: High to Low</option>
          <option value="1,amount">Price: Low to High</option>
        </select>
      </div>
      <div className="flex w-full gap-4 sm:h-1/3">
        <div className="w-full join">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="w-full bg-transparent input input-bordered input-secondary join-item"
            placeholder="Search"
          />
          <button
            onClick={handleSearch}
            className="btn-secondary text-secondary btn btn-outline join-item"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const buttonClasses =
    "px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const activeButtonClasses = "bg-blue-600 text-white hover:bg-blue-700";
  const inactiveButtonClasses =
    "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300";
  const disabledButtonClasses = "bg-gray-100 text-gray-400 cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center mt-8">
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${buttonClasses} ${
              currentPage === 1 ? disabledButtonClasses : inactiveButtonClasses
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </li>
        <p>Page {currentPage}</p>
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${buttonClasses} ${
              currentPage === totalPages
                ? disabledButtonClasses
                : inactiveButtonClasses
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

function ProductList({ products, lastProductRef }) {
  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-12 mx-auto sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <ProductCard
          key={product._id}
          product={product}
          ref={i === products.length - 1 ? lastProductRef : undefined}
        />
      ))}
    </div>
  );
}

export default ShopPage;
export { PinnedLinks, ProductList, CSSBar };

"use client";
import { useQuery } from "@tanstack/react-query";
import * as categoryApi from "@/api/category";
import Loading from "@/components/Loading";

const Collections = () => {
  const rootCategories = useQuery(categoryApi.listOptions({ parent: "root" }));

  if (rootCategories.isLoading) return <Loading />;

  if (rootCategories.isError) return <div>Error...</div>;

  return (
    <div className="py-16">
      <Hero></Hero>
      <CategoryList categories={rootCategories.data} />
    </div>
  );
};

function Hero({ hero }) {
  // image = "/hero4.png";
  return (
    <div className="mb-10">
      <h1 className="text-6xl font-tangerine text-center mb-2">Scarves</h1>

      <p className="max-w-2xl mx-auto px-3 text-center">
        your new favorite accessory :) tie together your look with a scarf from
        swells! all scarves are made to order and typically take around two
        weeks.
      </p>
    </div>
  );
}

const CategoryList = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 container mx-auto px-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((category) => (
        <div key={category._id} className="cursor-pointer">
          <div className="aspect-square overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform"
              style={{
                backgroundImage: `url('${
                  category.image || "https://placehold.co/400x400"
                }')`,
              }}
            ></div>
          </div>
          <h1 className="text-center mt-4 text-primary font-syne text-base md:text-lg">
            Collection
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Collections;

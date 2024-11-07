import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = ({ products, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: (
      <button className="p-2 rounded-full bg-primary hover:bg-primary/80 transition-colors absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>
    ),
    nextArrow: (
      <button className="p-2 rounded-full bg-primary hover:bg-primary/80 transition-colors absolute right-3 top-1/2 -translate-y-1/2 z-10">
        <ArrowRight className="w-6 h-6 text-white" />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-2xl md:text-6xl font-bold text-primary font-tangerine">
          {title || "Featured Products"}
        </h1>
      </div>
      <div className="w-full">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product._id} className="px-3">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;

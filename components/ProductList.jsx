import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = ({ products, title, description }) => {
  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
            {title || "Featured Products"}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={previous}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <p className="max-w-xl mb-10">
        {description || "These are our featured Products."}
      </p>

      <div className="w-full">
        <Slider ref={sliderRef} {...settings}>
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

import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";

function HomeProducts() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useContext(ProductContext);

  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-12 px-3 sm:px-4">

      {/* Categories Menu */}
      <div className="flex overflow-x-auto gap-3 sm:gap-4 mb-6 sm:mb-8 py-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-colors ${
              selectedCategory === cat
                ? "bg-[#9ec458] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-4 sm:gap-6
      ">
        {filteredProducts.map((product) => {
          const salePrice = Math.round(product.price * (1 - product.sale / 100));
          return (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="
                relative rounded-md p-2 sm:p-3 
                flex flex-col items-center 
                hover:shadow-md sm:hover:shadow-lg 
                transition cursor-pointer
              "
            >
              {/* Sale Badge */}
              {product.sale > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                  {product.sale}% OFF
                </span>
              )}

              <img
                src={product.images[0]}
                alt={product.name}
                className="
                  w-full 
                  h-32 sm:h-40 md:h-48 
                  object-cover rounded-md mb-2
                "
              />

              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-center">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base mt-1">
                {product.sale > 0 && (
                  <span className="text-gray-400 line-through">
                    ৳{product.price}
                  </span>
                )}
                <span className="text-green-600 font-bold">৳{salePrice}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeProducts;

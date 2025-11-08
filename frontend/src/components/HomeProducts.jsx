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

  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      
      {/* Categories Menu */}
      <div className="flex overflow-x-auto gap-4 mb-8 py-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={` px-4 py-2 rounded-full transition-colors ${
              selectedCategory === cat
                ? "bg-[#9ec458b9] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const salePrice = Math.round(product.price * (1 - product.sale / 100));
          return (
            <div
              key={product._id}
              onClick={()=> navigate(`/products/${product._id}`)}
              className="relative rounded-md p-3 flex flex-col items-center hover:shadow-lg transition"
            >
              {/* Sale Badge */}
              {product.sale > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.sale}% OFF
                </span>
              )}

              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              
              {/* Price */}
              <div className="flex items-center gap-2">
                {product.sale > 0 && (
                  <span className="text-gray-400 line-through">৳{product.price}</span>
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

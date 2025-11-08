import { MdKeyboardArrowRight } from "react-icons/md";
import { SlidersHorizontal } from "lucide-react"; // filter icon
import { ProductContext } from "../context/ProductContext";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Products() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useContext(ProductContext);

  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const productsPerPage = 6;

  // ✅ "All" একবারই add হবে
  const allCategories = categories.includes("All") ? categories : ["All", ...categories];

  // Filtered or All products
  const allProducts =
    selectedCategory === "All" || !selectedCategory
      ? products
      : filteredProducts;

  // Pagination logic
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setShowFilter(false);
  };

  return (
    <div>
      {/* ---------- Header ---------- */}
      <div className="py-16 bg-[#9ec458b9] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Shop Page</h1>
        <p className="mt-2 text-sm opacity-90">
          Discover your perfect skincare collection
        </p>

        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">
            Home
          </a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/products" className="hover:underline">
            Products
          </a>
        </div>
      </div>

      {/* ---------- Main Section ---------- */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col md:flex-row gap-8">
        {/* ---------- Filter Sidebar (Desktop) ---------- */}
        <div className="hidden md:block md:w-1/4 p-5 h-fit">
          <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
          <div className="space-y-3">
            {allCategories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat || (!selectedCategory && cat === "All")}
                  onChange={() => handleCategorySelect(cat)}
                  className="accent-[#9ec458] w-4 h-4"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ---------- Product Grid ---------- */}
        <div className="w-full md:w-3/4 relative">
          {/* Mobile Filter Button */}
          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md text-sm bg-white hover:bg-gray-100"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={()=> navigate(`/products/${p._id}`)}
                  className="rounded-lg p-4 bg-white hover:shadow-lg transition"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-60 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {p.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-[#9ec458]">
                      ৳{p.price}
                    </span>
                    {p.sale > 0 && (
                      <span className="text-red-500 text-sm">-{p.sale}%</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-md border ${
                    currentPage === i + 1
                      ? "bg-[#9ec458] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ---------- Mobile Filter Modal ---------- */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 z-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filter by Category</h3>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {allCategories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat || (!selectedCategory && cat === "All")}
                    onChange={() => handleCategorySelect(cat)}
                    className="accent-[#9ec458] w-4 h-4"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowFilter(false)}
              className="mt-6 w-full bg-[#9ec458] text-white py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

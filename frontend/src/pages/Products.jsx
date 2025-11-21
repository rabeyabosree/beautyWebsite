import { MdKeyboardArrowRight } from "react-icons/md";
import { SlidersHorizontal } from "lucide-react";
import { ProductContext } from "../context/ProductContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const productsPerPage = 6;

  // Categories
  const allCategories = categories.includes("All")
    ? categories
    : ["All", ...categories];

  const allProducts =
    selectedCategory === "All" || !selectedCategory
      ? products
      : filteredProducts;

  // Pagination
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowFilter(false);
  };

  return (
    <div className="pb-20">
      {/* HEADER */}
      <div className="py-14 bg-[#9ec458] text-center text-white">
        <h1 className="text-3xl md:text-4xl font-semibold">Shop Page</h1>
        <p className="mt-2 text-sm opacity-90">
          Discover your perfect skincare collection
        </p>

        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <span className="opacity-90">Products</span>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 flex flex-col md:flex-row gap-8">
        
        {/* LEFT FILTER - Desktop */}
        <aside className="hidden md:block md:w-1/4 p-5 border rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>

          <div className="space-y-3">
            {allCategories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={
                    selectedCategory === cat ||
                    (!selectedCategory && cat === "All")
                  }
                  onChange={() => handleCategorySelect(cat)}
                  className="accent-[#9ec458] w-4 h-4"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="w-full md:w-3/4 relative">
          
          {/* Filter button mobile */}
          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-md bg-white shadow-sm"
            >
              <SlidersHorizontal size={18} />
              Filter
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {currentProducts.length ? (
              currentProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/products/${p._id}`)}
                  className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="
                      w-full 
                      h-40 sm:h-44 md:h-52 
                      object-cover 
                      rounded-md
                    "
                  />

                  <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-2 line-clamp-2">
                    {p.name}
                  </h3>

                  {/* Mobile e desc hide */}
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 hidden sm:block">
                    {p.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-semibold text-[#9ec458] text-base md:text-lg">
                      ৳{p.price}
                    </span>

                    {p.sale > 0 && (
                      <span className="text-red-500 text-xs md:text-sm">
                        -{p.sale}%
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10 text-lg">
                No products found.
              </p>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className={`px-1.5 py-0.5 border text-sm  rounded-md ${
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
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-0.5 text-sm md:text-lg border rounded-md ${
                    currentPage === i + 1
                      ? "bg-[#9ec458] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className={`px-1.5 py-0.5 text-sm border rounded-md ${
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

      {/* MOBILE FILTER MODAL */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filter by Category</h3>
              <button
                onClick={() => setShowFilter(false)}
                className="text-gray-500 text-xl"
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
                    checked={
                      selectedCategory === cat ||
                      (!selectedCategory && cat === "All")
                    }
                    onChange={() => handleCategorySelect(cat)}
                    className="accent-[#9ec458] w-4 h-4"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowFilter(false)}
              className="mt-6 w-full bg-[#9ec458] text-white py-3 rounded-lg text-sm"
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

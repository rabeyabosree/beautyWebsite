import React, { useContext, useState, useMemo } from "react";
import { Trash2, Package } from "lucide-react";
import AddProduct from "./AddProduct";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("add");
    const { adminProducts, setAdminProducts, setProducts } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = async (id) => {
        try {
            // Call backend API to delete product
            await axios.delete(`http://localhost:8000/api/products/${id}`);

            // Update frontend state
            setProducts((prev) => prev.filter((p) => p._id !== id));
            setAdminProducts((prev) => prev.filter((p) => p._id !== id));

            // Optionally, show a success message
            alert("Product deleted successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to delete product.");
        }
    };


    // Filter products by name or category
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return adminProducts;
        return adminProducts.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, adminProducts]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Admin Dashboard
                </h1>
                <div className="flex mt-4 sm:mt-0">
                    <button
                        onClick={() => setActiveTab("add")}
                        className={`px-4 py-2 rounded-l-lg text-sm font-medium transition ${activeTab === "add"
                            ? "bg-[#9ec458b9] text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        Add Product
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-2 rounded-r-lg text-sm font-medium transition ${activeTab === "all"
                            ? "bg-[#9ec458b9] text-white"
                            : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        All Products
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
                {activeTab === "add" ? (
                    <AddProduct />
                ) : (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                            <Package size={22} className="text-green-600" /> All Products
                        </h2>

                        {/* Search Bar */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-500  rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>

                        {filteredProducts?.length === 0 ? (
                            <p className="text-gray-500 text-center mt-10">
                                No products found.
                            </p>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {filteredProducts.map((item) => (
                                    <div
                                        key={item._id}
                                        className="rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col items-center"
                                    >
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded-md mb-3"
                                        />
                                        <h3 className="font-semibold text-gray-700">{item.name}</h3>
                                        <p className="text-gray-500 mb-1">{item.category}</p>
                                        <p className="text-green-600 font-medium mb-3">
                                            ৳{item.price}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;

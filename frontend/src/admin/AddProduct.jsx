import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    sale: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      images.forEach((img) => data.append("images", img));

      const res = await axios.post(`${API_URL}/api/products`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        stock: "",
        sale: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add product. Check server log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-4">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700">
        <PlusCircle size={22} className="text-[#9ec458b9]" /> Add Product
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Category */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
            className="w-full border border-gray-500  rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Price */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Stock */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
            className="w-full border border-gray-500  rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Sale */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-600">Sale (%)</label>
          <input
            type="number"
            name="sale"
            value={formData.sale}
            onChange={handleChange}
            placeholder="Enter sale percentage"
            className="w-full border border-gray-500 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter product description"
            required
            className="w-full border border-gray-500  rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          ></textarea>
        </div>

        {/* Images */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">Upload Images (max 3)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-500  rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        {/* Preview */}
        {images.length > 0 && (
          <div className="col-span-2 flex gap-3 mt-2 flex-wrap">
            {Array.from(images).map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {/* Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#9ec458b9] text-white py-2 rounded-lg hover:bg-green-700 transition font-medium ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`text-center mt-4 font-medium ${
            message.includes("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddProduct;

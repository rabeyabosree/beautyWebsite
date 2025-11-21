import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//  Create Context
export const ProductContext = createContext();
const API_URL = import.meta.env.VITE_BACKEND_URL


function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [adminProducts, setAdminProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");

  console.log(products)


  //  Fetch products only once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`)
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);



  //  Fetch products for admin
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/admin`);
        setAdminProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //  Get unique categories
  const categories = ["All", ...new Set(products.map((item) => item.category))];

  //  Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  //  Context Value
  const value = {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    adminProducts,
    setAdminProducts,
    setProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartContext } from "../context/CartProvider";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart, updateQty, cartItems } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images[0]);

        // 🧠 If the product is already in cart, set quantity from cart
        const existingItem = cartItems.find((item) => item._id === res.data._id);
        if (existingItem) {
          setQuantity(existingItem.qty);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id, cartItems]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const increaseQty = () => {
    if (quantity < product.stock) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      updateQty(product._id, newQty); // ✅ update cart context
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQty(product._id, newQty); // ✅ update cart context
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  const buyNow = () => {
    addToCart(product, quantity); // ensure added
    navigate("/checkout");
  };

  const priceAfterSale = (
    product.price -
    (product.price * product.sale) / 100
  ).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-10 mt-10 relative">
      {/* Left: Images */}
      <div className="md:w-1/2 flex flex-col gap-3">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-96 object-cover rounded-md"
        />
        <div className="flex gap-2">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name}-${idx}`}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                mainImage === img ? "ring-2 ring-green-500" : ""
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Info */}
      <div className="md:w-1/2 flex flex-col gap-4 relative">
        {/* Sale badge */}
        {product.sale > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-md font-bold">
            -{product.sale}%
          </div>
        )}

        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="text-gray-500">
          Category: <span className="font-medium">{product.category}</span>
        </p>

        <p className="mt-2 text-gray-700">{product.description}</p>

        <div className="flex items-center gap-4 mt-2">
          <span className="text-2xl font-bold text-green-600">৳{priceAfterSale}</span>
          {product.sale > 0 && (
            <span className="text-gray-400 line-through">৳{product.price}</span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">
          <span>Quantity:</span>
          <button onClick={decreaseQty} className="border p-1 rounded">
            <AiOutlineMinus />
          </button>
          <span className="px-3">{quantity}</span>
          <button onClick={increaseQty} className="border p-1 rounded">
            <AiOutlinePlus />
          </button>
        </div>

        <p className="text-gray-500">
          Stock: <span className="font-medium">{product.stock}</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Add to Cart
          </button>
          <button
            onClick={buyNow}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

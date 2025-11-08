import React, { useContext } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, updateQty, removeFromCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 bg-[#9ec458b9] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Cart Page</h1>
        <p className="mt-2 text-sm opacity-90">
          We’d love to hear from you! Reach out for any inquiries or assistance.
        </p>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/products" className="hover:underline">Products</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/cart" className="hover:underline">Cart</a>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-6xl mx-auto pt-12 px-8">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => {
              const priceAfterSale = item.price - (item.price * item.sale) / 100;
              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between shadow p-4 rounded-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.sale > 0 && (
                        <p className="text-gray-500 line-through">৳{item.price}</p>
                      )}
                      <p className="text-green-600 font-bold">
                        ৳{priceAfterSale.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Total Price */}
            <div className="text-right text-xl font-semibold mt-4">
              Total: ৳{totalPrice.toFixed(2)}
            </div>

            {/* ✅ Show checkout button only if cart has items */}
            {cartItems.length > 0 && (
              <div className="text-right mt-8">
                <button
                  onClick={handleNext}
                  className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;

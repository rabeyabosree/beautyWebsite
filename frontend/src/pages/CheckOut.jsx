import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckOut() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    phone: "",
    district: "",
    subDistrict: "",
    area: "",
  });
  const [shippingFee, setShippingFee] = useState(0);
  const [locationType, setLocationType] = useState(""); // "inside" or "outside"
  const navigate = useNavigate();

  const subtotal = totalPrice;
  const total = subtotal + shippingFee;

  useEffect(() => {
    if (locationType === "inside") setShippingFee(80);
    else if (locationType === "outside") setShippingFee(120);
    else setShippingFee(0);
  }, [locationType]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.district ||
      !shippingAddress.subDistrict ||
      !shippingAddress.area ||
      !locationType
    ) {
      alert("Please fill in all shipping details");
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.images[0],
        qty: item.qty,
        price: item.price - (item.price * item.sale) / 100,
      })),
      shippingAddress,
      shippingFee,
      subtotal,
      totalPrice: total,
    };

    try {
      
      await axios.post("http://localhost:8000/api/orders", orderData);
      alert("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Your cart is empty — please add items before checkout.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 ">
      <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Shipping Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingAddress.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingAddress.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={shippingAddress.district}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          />
          <input
            type="text"
            name="subDistrict"
            placeholder="Sub-District"
            value={shippingAddress.subDistrict}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          />
          <input
            type="text"
            name="area"
            placeholder="Area"
            value={shippingAddress.area}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          />

          <div>
            <h3 className="font-medium mb-1">Select Delivery Area:</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="location"
                  value="inside"
                  checked={locationType === "inside"}
                  onChange={() => setLocationType("inside")}
                />
                Inside Dhaka (৳80)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="location"
                  value="outside"
                  checked={locationType === "outside"}
                  onChange={() => setLocationType("outside")}
                />
                Outside Dhaka (৳120)
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <span className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </span>
                </div>
                <p className="font-semibold">
                  ৳
                  {(
                    (item.price - (item.price * item.sale) / 100) *
                    item.qty
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right space-y-1">
            <p>Subtotal: ৳{subtotal.toFixed(2)}</p>
            <p>Shipping Fee: ৳{shippingFee}</p>
            <p className="font-bold text-lg">Total: ৳{total.toFixed(2)}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-3 mt-6 rounded-md text-lg font-semibold hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;

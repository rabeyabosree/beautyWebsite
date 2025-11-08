import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prev, { ...product, qty }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // Update quantity
  const updateQty = (productId, qty) => {
    setCartItems((prev) => {
      const updatedCart = prev.map((item) =>
        item._id === productId ? { ...item, qty } : item
      );

      // 🔹 Recalculate total quantity (cart length)
      const totalItems = updatedCart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(totalItems);

      return updatedCart;
    });
  };

  // Total price
  const totalPrice = cartItems.reduce((acc, item) => {
    const priceAfterSale = item.price - (item.price * item.sale) / 100;
    return acc + priceAfterSale * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        totalPrice,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { CartContext } from "../../context/CartProvider";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const { cartCount } = useContext(CartContext)

  const navMenu = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-transparent text-green-950 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navMenu.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              className="hover:text-pink-200 transition-all duration-300"
            >
              {menu.name}
            </Link>
          ))}
          <button onClick={() => navigate('/cart')} className="text-2xl relative hover:text-pink-300 transition-all">
            <CiShoppingCart />
            <span className="absolute right-0 -top-3 bg-gray-100 px-1 rounded-full text-gray-950 text-sm">{cartCount > 0 && cartCount}</span>
          </button>
          <button onClick={()=> navigate("/admin")} className="bg-gray-100 text-gray-950 font-semibold rounded-4xl px-4 py-2">Dashboard</button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center gap-4">
          <button className="text-2xl">
            <CiShoppingCart />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl focus:outline-none"
          >
            {open ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full left-0 w-full bg-black/70 backdrop-blur-md flex flex-col items-center py-6 gap-4 text-lg md:hidden transition-all duration-500">
            {navMenu.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                onClick={() => setOpen(false)}
                className="hover:text-pink-200"
              >
                {menu.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

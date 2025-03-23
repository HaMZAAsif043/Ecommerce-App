import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../../context/CartContext";
import { useLocation } from "react-router";
import Chatbot from "../chatbot/Chatbot"
const Layout = ({ children }) => {
  const location = useLocation();
  const { isCartOpen, closeCart, cartItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Header />
      )}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} items={cartItems} />
      {
        location.pathname !== "/login" && location.pathname !== "/signup" && (
          <Footer />
        )
      }
    </div>
  );
};

export default Layout;

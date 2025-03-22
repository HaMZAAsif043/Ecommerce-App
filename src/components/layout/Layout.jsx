import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";
import { useCart } from "../../context/CartContext";

const Layout = ({ children }) => {
  const { isCartOpen, closeCart, cartItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} items={cartItems} />
      <Footer />
    </div>
  );
};

export default Layout;

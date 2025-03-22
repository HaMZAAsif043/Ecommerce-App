import React, { createContext, useContext, useState } from "react";
import { useCart } from "./CartContext";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const generateOrderId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${randomNum}`;
  };

  const saveShippingInfo = (info) => {
    setShippingInfo(info);
    return true;
  };

  const savePaymentInfo = (info) => {
    setPaymentInfo(info);
    return true;
  };

  const placeOrder = () => {
    if (!shippingInfo || !paymentInfo || cartItems.length === 0) {
      return { success: false, error: "Missing required information" };
    }

    const newOrder = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items: [...cartItems],
      shipping: shippingInfo,
      payment: {
        ...paymentInfo,
        cardNumber: `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`,
      },
      status: "processing",
      subtotal: getCartTotal(),
      tax: getCartTotal() * 0.08,
      shipping: getCartTotal() > 100 ? 0 : 9.99,
      total:
        getCartTotal() +
        getCartTotal() * 0.08 +
        (getCartTotal() > 100 ? 0 : 9.99),
      estimatedDelivery: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCurrentOrder(newOrder);
    clearCart();

    // Save to localStorage
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem(
        "orders",
        JSON.stringify([...savedOrders, newOrder]),
      );
    } catch (error) {
      console.error("Failed to save order to localStorage:", error);
    }

    return { success: true, orderId: newOrder.id };
  };

  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId) || null;
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider
      value={{
        currentOrder,
        shippingInfo,
        paymentInfo,
        saveShippingInfo,
        savePaymentInfo,
        placeOrder,
        getOrderById,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

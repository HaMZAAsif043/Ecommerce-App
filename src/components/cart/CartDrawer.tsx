import React, { useState } from "react";
import { ShoppingCart, X, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// Define the CartItem component inline since there seems to be an issue with importing it
const CartItem = ({
  id = "1",
  name = "Product Name",
  price = 99.99,
  quantity = 1,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
  onRemove = () => {},
  onUpdateQuantity = () => {},
}) => {
  return (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{name}</h3>
          <p className="ml-4">${price.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <button
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="px-2 py-1 text-gray-800">{quantity}</span>
            <button
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="font-medium text-primary hover:text-primary/80"
            onClick={() => onRemove(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  items?: CartItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onCheckout?: () => void;
}

const CartDrawer = ({
  items = [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80",
    },
  ],
  isOpen = false,
  onClose = () => {},
  onCheckout = () => {},
}: CartDrawerProps) => {
  const [open, setOpen] = useState(isOpen);
  const [cartItems, setCartItems] = useState(items);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleCheckout = () => {
    setOpen(false);
    onCheckout();
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-white"
          onClick={() => setOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {cartItems.reduce((count, item) => count + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] max-w-md mx-auto bg-white">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold">Your Cart</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
          <p className="text-sm text-gray-500">
            {cartItems.length === 0
              ? "Your cart is empty"
              : `${cartItems.reduce((count, item) => count + item.quantity, 0)} items in your cart`}
          </p>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                Your cart is empty. Add some products to get started.
              </p>
              <Button className="mt-4" onClick={handleClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItem
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <DrawerFooter className="border-t bg-white">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4" onClick={handleCheckout}>
                <span>Checkout</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleClose}
              >
                Continue Shopping
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;

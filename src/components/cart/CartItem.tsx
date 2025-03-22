import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

const CartItem = ({
  id = "1",
  name = "Product Name",
  price = 29.99,
  quantity = 1,
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
  onRemove = () => {},
  onUpdateQuantity = () => {},
}: CartItemProps) => {
  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-white w-full">
      <div className="relative w-20 h-20 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
        <p className="text-sm font-medium text-gray-900 mt-1">
          ${price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <Input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            className="h-8 w-12 text-center border-none focus:ring-0 p-0"
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={handleIncrement}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="text-sm font-medium text-gray-900 min-w-[70px] text-right">
        ${(price * quantity).toFixed(2)}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-red-500"
        onClick={handleRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;

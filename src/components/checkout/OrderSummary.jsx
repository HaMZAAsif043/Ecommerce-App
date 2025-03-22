import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderSummary = ({ cartItems, subtotal, tax, shipping, total }) => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="max-h-60 overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded overflow-hidden mr-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Subtotal</p>
              <p className="text-sm">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Tax (8%)</p>
              <p className="text-sm">${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Shipping</p>
              <p className="text-sm">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            <p>
              Free shipping on orders over $100. Standard delivery 3-5 business
              days.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

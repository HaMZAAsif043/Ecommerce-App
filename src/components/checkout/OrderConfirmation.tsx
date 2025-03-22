import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Truck, Calendar, ArrowLeft, Package } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderConfirmationProps {
  orderId?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  items?: OrderItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  shippingInfo?: ShippingInfo;
  paymentMethod?: string;
}

const OrderConfirmation = ({
  orderId = "ORD-12345-ABCDE",
  orderDate = new Date().toLocaleDateString(),
  estimatedDelivery = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString(),
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
  ],
  subtotal = 379.98,
  shipping = 0,
  tax = 30.4,
  total = 410.38,
  shippingInfo = {
    name: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "United States",
  },
  paymentMethod = "Credit Card ending in 1234",
}: OrderConfirmationProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-green-100 rounded-full p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2">Order Confirmed!</h1>
      <p className="text-center text-muted-foreground mb-8">
        Thank you for your purchase. We've received your order and will begin
        processing it right away.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order #{orderId}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Order Date</span>
              </div>
              <span className="font-medium">{orderDate}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Estimated Delivery</span>
              </div>
              <span className="font-medium">{estimatedDelivery}</span>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Payment Method</span>
              </div>
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{shippingInfo.name}</p>
              <p>{shippingInfo.address}</p>
              <p>
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
              </p>
              <p>{shippingInfo.country}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" className="w-full sm:w-auto" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>

        <Button className="w-full sm:w-auto" asChild>
          <Link to="/account/orders">View Order History</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { useOrder } from "../../context/OrderContext";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrder();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const orderData = getOrderById(orderId);
      setOrder(orderData);
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <p className="mb-6">We couldn't find the order you're looking for.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been received.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{formatDate(order.date)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium capitalize">{order.status}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Shipping Address</h3>
                <p className="text-sm text-gray-600">
                  {order.shipping.fullName}
                  <br />
                  {order.shipping.address}
                  <br />
                  {order.shipping.city}, {order.shipping.state}{" "}
                  {order.shipping.zipCode}
                  <br />
                  {order.shipping.country}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Payment Method</h3>
                <p className="text-sm text-gray-600">
                  {order.payment.cardType} ending in{" "}
                  {order.payment.cardNumber.slice(-4)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(order.estimatedDelivery)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-4 border-b"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm">${order.subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Tax</p>
            <p className="text-sm">${order.tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">Shipping</p>
            <p className="text-sm">
              {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
            </p>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
          </Button>
        </Link>
        <Link to="/products">
          <Button className="w-full sm:w-auto">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;

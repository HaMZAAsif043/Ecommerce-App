import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";

const OrdersPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const { getAllOrders } = useOrder();
  const navigate = useNavigate();
  const orders = getAllOrders();

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">Loading...</div>
      </Layout>
    );
  }

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {order.status}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/order-confirmation/${order.id}`)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <p className="text-sm text-gray-600">
                          {order.shippingInfo.fullName}
                          <br />
                          {order.shippingInfo.addressLine1}
                          {order.shippingInfo.addressLine2 && (
                            <>
                              <br />
                              {order.shippingInfo.addressLine2}
                            </>
                          )}
                          <br />
                          {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                          {order.shippingInfo.zipCode}
                          <br />
                          {order.shippingInfo.country}
                          <br />
                          {order.shippingInfo.phone}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Order Summary</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>
                              {order.shipping === 0
                                ? "Free"
                                : `$${order.shipping.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>${order.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium pt-1 border-t">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Items</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center border-b pb-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              You haven't placed any orders yet
            </h2>
            <p className="text-gray-500 mb-8">
              Once you place an order, you'll be able to track it here.
            </p>
            <Button onClick={() => navigate("/products")}>
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;

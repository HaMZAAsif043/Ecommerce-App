import React from "react";
import { Truck, Package, RefreshCw, Clock } from "lucide-react";
import Layout from "../components/layout/Layout";

const ShippingPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Shipping & Returns
        </h1>

        <div className="space-y-12">
          {/* Shipping Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Delivery Options</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Standard Shipping</h4>
                    <p className="text-gray-600">3-5 business days</p>
                    <p className="text-gray-600">
                      $5.99 (Free on orders over $100)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Express Shipping</h4>
                    <p className="text-gray-600">1-2 business days</p>
                    <p className="text-gray-600">$12.99</p>
                  </div>

                  <div>
                    <h4 className="font-medium">International Shipping</h4>
                    <p className="text-gray-600">7-14 business days</p>
                    <p className="text-gray-600">
                      Rates calculated at checkout
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Shipping Policies</h3>
                  </div>
                </div>

                <div className="space-y-4 text-gray-600">
                  <p>
                    All orders are processed and shipped within 1-2 business
                    days after payment confirmation.
                  </p>
                  <p>
                    Shipping times are estimates and not guaranteed. Delays may
                    occur due to customs, weather, or other factors outside our
                    control.
                  </p>
                  <p>
                    For international orders, customers are responsible for any
                    customs fees, duties, or taxes imposed by their country.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Returns Information */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Returns & Exchanges</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Return Policy</h3>
                  </div>
                </div>

                <div className="space-y-4 text-gray-600">
                  <p>
                    We accept returns within 30 days of delivery for a full
                    refund or exchange.
                  </p>
                  <p>
                    Items must be in original condition with tags attached and
                    original packaging.
                  </p>
                  <p>
                    To initiate a return, please go to your order history and
                    select "Return Item" or contact our customer service team.
                  </p>
                  <p>
                    Return shipping costs are the responsibility of the customer
                    unless the item is defective or we made an error.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Refund Process</h3>
                  </div>
                </div>

                <div className="space-y-4 text-gray-600">
                  <p>
                    Once we receive your return, we'll inspect the item and
                    process your refund within 3-5 business days.
                  </p>
                  <p>
                    Refunds will be issued to the original payment method used
                    for the purchase.
                  </p>
                  <p>
                    It may take an additional 5-10 business days for the refund
                    to appear in your account, depending on your payment
                    provider.
                  </p>
                  <p>
                    For exchanges, we'll ship the new item once we receive and
                    process your return.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">
                    Can I change my shipping address after placing an order?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    We can only change your shipping address if your order
                    hasn't been processed yet. Please contact customer service
                    immediately if you need to make changes.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Do you ship to PO boxes?</h3>
                  <p className="text-gray-600 mt-1">
                    Yes, we ship to PO boxes for standard shipping only. Express
                    shipping requires a physical address.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">How do I track my order?</h3>
                  <p className="text-gray-600 mt-1">
                    Once your order ships, you'll receive a confirmation email
                    with tracking information. You can also view tracking
                    details in your account under "Order History."
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">
                    What if my package is damaged or missing items?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Please contact our customer service team within 48 hours of
                    delivery with photos of the damaged package or details about
                    missing items. We'll work quickly to resolve the issue.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center">
            <p className="text-gray-600">
              If you have any other questions about shipping or returns, please{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPage;

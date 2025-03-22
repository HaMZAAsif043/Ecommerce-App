import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { CreditCard, Truck, ShoppingBag, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";

// Define schemas for each step
const shippingSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  addressLine1: z.string().min(5, { message: "Address is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(5, { message: "Valid zip code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
});

const paymentSchema = z.object({
  cardName: z.string().min(2, { message: "Name on card is required" }),
  cardNumber: z.string().min(16, { message: "Valid card number is required" }),
  expiryDate: z.string().min(5, { message: "Valid expiry date is required" }),
  cvv: z.string().min(3, { message: "Valid CVV is required" }),
  billingAddress: z.string().min(5, { message: "Billing address is required" }),
});

const CartSummary = () => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="max-h-60 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 mb-3 pb-3 border-b"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const ShippingForm = ({ onNext }) => {
  const { saveShippingInfo } = useOrder();

  const form = useForm({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    },
  });

  function onSubmit(values) {
    saveShippingInfo(values);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apt 4B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(555) 123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue to Payment
        </Button>
      </form>
    </Form>
  );
};

const PaymentForm = ({ onNext, onBack }) => {
  const { savePaymentInfo } = useOrder();

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
    },
  });

  function onSubmit(values) {
    savePaymentInfo(values);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name on Card</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input placeholder="4242 4242 4242 4242" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input placeholder="123" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="billingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Address</FormLabel>
              <FormControl>
                <Input placeholder="Same as shipping address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Review Order
          </Button>
        </div>
      </form>
    </Form>
  );
};

const OrderReview = ({ onComplete, onBack }) => {
  const { shippingInfo, paymentInfo, placeOrder } = useOrder();

  const handlePlaceOrder = () => {
    const result = placeOrder();
    if (result.success) {
      onComplete(result.orderId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> {shippingInfo?.fullName}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {shippingInfo?.addressLine1}
            {shippingInfo?.addressLine2 ? `, ${shippingInfo.addressLine2}` : ""}
          </p>
          <p>
            <span className="font-medium">City:</span> {shippingInfo?.city},{" "}
            {shippingInfo?.state} {shippingInfo?.zipCode}
          </p>
          <p>
            <span className="font-medium">Country:</span>{" "}
            {shippingInfo?.country === "us"
              ? "United States"
              : shippingInfo?.country === "ca"
                ? "Canada"
                : shippingInfo?.country === "uk"
                  ? "United Kingdom"
                  : shippingInfo?.country === "au"
                    ? "Australia"
                    : shippingInfo?.country}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {shippingInfo?.phone}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Card:</span> •••• •••• ••••{" "}
            {paymentInfo?.cardNumber.slice(-4)}
          </p>
          <p>
            <span className="font-medium">Expiry:</span>{" "}
            {paymentInfo?.expiryDate}
          </p>
          <p>
            <span className="font-medium">Billing Address:</span>{" "}
            {paymentInfo?.billingAddress}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-1" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

const CheckoutFlow = () => {
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const steps = [
    { id: "cart", label: "Cart", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "shipping", label: "Shipping", icon: <Truck className="h-4 w-4" /> },
    {
      id: "payment",
      label: "Payment",
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: "review",
      label: "Review",
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ];

  const handleComplete = (newOrderId) => {
    setOrderId(newOrderId);
    navigate(`/order-confirmation/${newOrderId}`);
  };

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cartItems.length === 0 && !orderId) {
      navigate("/");
    }
  }, [cartItems, navigate, orderId]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Checkout</h1>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${i <= step ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-500"}`}
                >
                  {s.icon}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${i <= step ? "text-primary font-medium" : "text-gray-500"}`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-1 mx-2 ${i < step ? "bg-primary" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                  {cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 border-b pb-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      <Button onClick={() => setStep(1)} className="w-full">
                        Proceed to Checkout
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="mb-4">Your cart is empty</p>
                      <Button onClick={() => navigate("/products")}>
                        Browse Products
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {step === 1 && <ShippingForm onNext={() => setStep(2)} />}

              {step === 2 && (
                <PaymentForm
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 3 && (
                <OrderReview
                  onComplete={handleComplete}
                  onBack={() => setStep(2)}
                />
              )}
            </motion.div>
          </div>

          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFlow;

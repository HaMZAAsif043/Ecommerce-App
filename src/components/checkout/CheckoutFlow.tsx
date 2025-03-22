import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface CartSummaryProps {
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  items = [
    {
      id: "1",
      name: "Product 1",
      price: 99.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
    {
      id: "2",
      name: "Product 2",
      price: 49.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&q=80",
    },
  ],
  subtotal = 249.97,
  shipping = 9.99,
  tax = 20.0,
  total = 279.96,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="max-h-60 overflow-y-auto mb-4">
        {items.map((item) => (
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
          <span>${shipping.toFixed(2)}</span>
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

interface ShippingFormProps {
  onNext: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onNext = () => {} }) => {
  const form = useForm<z.infer<typeof shippingSchema>>({
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

  function onSubmit(values: z.infer<typeof shippingSchema>) {
    // In a real app, you would save the shipping info here
    console.log(values);
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

interface PaymentFormProps {
  onNext: () => void;
  onBack: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onNext = () => {},
  onBack = () => {},
}) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof paymentSchema>) {
    // In a real app, you would process payment here
    console.log(values);
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

interface OrderReviewProps {
  onComplete: () => void;
  onBack: () => void;
}

const OrderReview: React.FC<OrderReviewProps> = ({
  onComplete = () => {},
  onBack = () => {},
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Name:</span> John Doe
          </p>
          <p>
            <span className="font-medium">Address:</span> 123 Main St, Apt 4B
          </p>
          <p>
            <span className="font-medium">City:</span> New York, NY 10001
          </p>
          <p>
            <span className="font-medium">Country:</span> United States
          </p>
          <p>
            <span className="font-medium">Phone:</span> (555) 123-4567
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Card:</span> •••• •••• •••• 4242
          </p>
          <p>
            <span className="font-medium">Expiry:</span> 12/25
          </p>
          <p>
            <span className="font-medium">Billing Address:</span> Same as
            shipping
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-1" onClick={onComplete}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

interface OrderConfirmationProps {
  orderNumber?: string;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber = "ORD-12345-ABCDE",
}) => {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
      <p className="text-gray-600">Your order has been placed successfully.</p>
      <div className="bg-gray-50 p-4 rounded-lg inline-block">
        <p className="text-sm text-gray-500">Order Number</p>
        <p className="font-mono font-medium">{orderNumber}</p>
      </div>
      <p className="text-sm text-gray-500">
        A confirmation email has been sent to your email address. You can track
        your order status in your account.
      </p>
      <div className="pt-4">
        <Button>Continue Shopping</Button>
      </div>
    </div>
  );
};

interface CheckoutFlowProps {
  initialStep?: number;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ initialStep = 0 }) => {
  const [step, setStep] = useState(initialStep);
  const [orderComplete, setOrderComplete] = useState(false);

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

  const handleComplete = () => {
    setOrderComplete(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Checkout</h1>

        {!orderComplete ? (
          <>
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
                      <div className="space-y-4">
                        {/* Cart items would go here */}
                        <p className="text-gray-500">
                          Your cart items are displayed here
                        </p>
                        <Button onClick={() => setStep(1)} className="w-full">
                          Proceed to Checkout
                        </Button>
                      </div>
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
          </>
        ) : (
          <OrderConfirmation />
        )}
      </div>
    </div>
  );
};

export default CheckoutFlow;

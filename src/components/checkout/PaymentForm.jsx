import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Lock } from "lucide-react";

const PaymentForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    cardType: initialData?.cardType || "Visa",
    cardNumber: initialData?.cardNumber || "",
    cardholderName: initialData?.cardholderName || "",
    expiryMonth: initialData?.expiryMonth || "",
    expiryYear: initialData?.expiryYear || "",
    cvv: initialData?.cvv || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Generate month options
  const months = [];
  for (let i = 1; i <= 12; i++) {
    const month = i.toString().padStart(2, "0");
    months.push(
      <SelectItem key={month} value={month}>
        {month}
      </SelectItem>,
    );
  }

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    const year = (currentYear + i).toString();
    years.push(
      <SelectItem key={year} value={year}>
        {year}
      </SelectItem>,
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardType">Card Type</Label>
          <Select
            value={formData.cardType}
            onValueChange={(value) => handleSelectChange("cardType", value)}
          >
            <SelectTrigger id="cardType">
              <SelectValue placeholder="Select card type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Visa">Visa</SelectItem>
              <SelectItem value="Mastercard">Mastercard</SelectItem>
              <SelectItem value="American Express">American Express</SelectItem>
              <SelectItem value="Discover">Discover</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className="pl-10"
              required
              maxLength={19}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cardholderName">Cardholder Name</Label>
          <Input
            id="cardholderName"
            name="cardholderName"
            placeholder="John Doe"
            value={formData.cardholderName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Expiration Date</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={formData.expiryMonth}
                onValueChange={(value) =>
                  handleSelectChange("expiryMonth", value)
                }
              >
                <SelectTrigger id="expiryMonth">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>{months}</SelectContent>
              </Select>

              <Select
                value={formData.expiryYear}
                onValueChange={(value) =>
                  handleSelectChange("expiryYear", value)
                }
              >
                <SelectTrigger id="expiryYear">
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>{years}</SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="cvv">CVV</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
                className="pl-10"
                required
                maxLength={4}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 flex items-center">
        <Lock className="h-4 w-4 mr-2 text-gray-500" />
        Your payment information is encrypted and secure. We never store your
        full card details.
      </div>

      <Button type="submit" className="w-full">
        Continue to Review
      </Button>
    </form>
  );
};

export default PaymentForm;

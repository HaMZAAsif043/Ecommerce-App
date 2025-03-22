import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Package,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductDetailProps {
  product?: {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    features: string[];
    specifications: Record<string, string>;
    images: string[];
    colors: string[];
    sizes: string[];
    inStock: boolean;
    deliveryEstimate: string;
  };
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const defaultProduct = {
    id: "prod-001",
    name: "Premium Comfort Sneakers",
    price: 129.99,
    rating: 4.5,
    reviewCount: 127,
    description:
      "These premium comfort sneakers are designed for all-day wear with cushioned insoles and breathable materials. Perfect for casual outings or light exercise, they combine style and functionality in one sleek package.",
    features: [
      "Breathable mesh upper",
      "Memory foam insole",
      "Shock-absorbing midsole",
      "Non-slip rubber outsole",
      "Lightweight design (8.5 oz)",
      "Eco-friendly materials",
    ],
    specifications: {
      Material: "Synthetic mesh, recycled rubber",
      Closure: "Lace-up",
      "Heel Height": "1.5 inches",
      "Care Instructions": "Spot clean with mild soap and water",
      Origin: "Imported",
      "Item Number": "SN-2023-456",
    },
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    colors: ["Black", "White", "Blue", "Red"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    deliveryEstimate: "2-4 business days",
  };

  const productData = product || defaultProduct;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + productData.images.length) % productData.images.length,
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : i < rating ? "fill-yellow-400 text-yellow-400 fill-opacity-50" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={productData.images[currentImageIndex]}
              alt={`${productData.name} - View ${currentImageIndex + 1}`}
              className="object-cover w-full h-full"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productData.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${currentImageIndex === index ? "border-primary" : "border-transparent"}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${productData.name} thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {productData.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(productData.rating)}
              </div>
              <span className="text-sm text-gray-500">
                {productData.reviewCount} reviews
              </span>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold">
                ${productData.price.toFixed(2)}
              </span>
            </div>
          </div>

          <Separator />

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {productData.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                  className="min-w-20"
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="min-w-16"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button className="flex-1 gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Delivery Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Free shipping</p>
                  <p className="text-xs text-gray-500">
                    Estimated delivery: {productData.deliveryEstimate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">
                    {productData.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Ships from our warehouse
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-4">
            <p className="text-gray-700">{productData.description}</p>
          </TabsContent>
          <TabsContent value="features" className="p-4">
            <ul className="list-disc pl-5 space-y-2">
              {productData.features.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(productData.specifications).map(
                ([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-medium w-40">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ),
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;

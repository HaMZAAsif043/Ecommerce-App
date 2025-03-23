import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProduct } from "../context/ProductContext";

const DealsPage = () => {
  const { getAllProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const [dealType, setDealType] = useState("all");

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();

      // For demo purposes, let's assume some products have discounts
      const productsWithDeals =
        allProducts?.map((product) => ({
          ...product,
          originalPrice: product.price,
          price: product.price * (Math.random() > 0.5 ? 0.7 : 1), // 30% discount on some products
          discountPercentage: Math.random() > 0.5 ? 30 : 0,
          dealType:
            Math.random() > 0.7
              ? "clearance"
              : Math.random() > 0.5
                ? "flash"
                : "weekly",
        })) || [];

      setProducts(
        productsWithDeals.length > 0
          ? productsWithDeals
          : [
              {
                id: "deal1",
                name: "Wireless Noise-Cancelling Headphones",
                description:
                  "Premium wireless headphones with active noise cancellation.",
                price: 149.99,
                originalPrice: 249.99,
                discountPercentage: 40,
                dealType: "flash",
                image:
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
              },
              {
                id: "deal2",
                name: "Smart Fitness Tracker",
                description:
                  "Track your fitness goals with this advanced smart watch.",
                price: 79.99,
                originalPrice: 129.99,
                discountPercentage: 38,
                dealType: "weekly",
                image:
                  "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=500&q=80",
              },
              {
                id: "deal3",
                name: "Portable Bluetooth Speaker",
                description:
                  "Waterproof portable speaker with 20-hour battery life.",
                price: 39.99,
                originalPrice: 69.99,
                discountPercentage: 43,
                dealType: "clearance",
                image:
                  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
              },
              {
                id: "deal4",
                name: "Coffee Maker with Grinder",
                description:
                  "Automatic coffee maker with built-in bean grinder.",
                price: 89.99,
                originalPrice: 149.99,
                discountPercentage: 40,
                dealType: "weekly",
                image:
                  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80",
              },
              {
                id: "deal5",
                name: "4K Ultra HD Smart TV",
                description:
                  "55-inch 4K smart TV with HDR and built-in streaming apps.",
                price: 399.99,
                originalPrice: 599.99,
                discountPercentage: 33,
                dealType: "flash",
                image:
                  "https://images.unsplash.com/photo-1593784991095-a205069533cd?w=500&q=80",
              },
              {
                id: "deal6",
                name: "Robot Vacuum Cleaner",
                description:
                  "Smart robot vacuum with mapping technology and app control.",
                price: 199.99,
                originalPrice: 349.99,
                discountPercentage: 43,
                dealType: "clearance",
                image:
                  "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500&q=80",
              },
            ],
      );
    };

    fetchProducts();
  }, [getAllProducts]);

  // Filter products based on selected deal type
  const filteredProducts =
    dealType === "all"
      ? products.filter((product) => product.discountPercentage > 0)
      : products.filter(
          (product) =>
            product.dealType === dealType && product.discountPercentage > 0,
        );

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Special Deals & Offers</h1>
          <p className="text-gray-500">
            Discover amazing discounts on top products
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setDealType}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Deals</TabsTrigger>
            <TabsTrigger value="flash">Flash Sales</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Offers</TabsTrigger>
            <TabsTrigger value="clearance">Clearance</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group"
              >
                <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {product.discountPercentage}% OFF
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <p className="font-bold">${product.price.toFixed(2)}</p>
                      <p className="text-gray-500 line-through ml-2 text-sm">
                        ${product.originalPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 mb-4">
                No deals available in this category at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DealsPage;

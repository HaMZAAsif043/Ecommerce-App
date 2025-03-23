import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "../context/ProductContext";

const CategoriesPage = () => {
  const { getAllCategories, getProductsByCategory } = useProduct();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all categories
    const fetchCategories = async () => {
      const allCategories = await getAllCategories();
      setCategories(
        allCategories || [
          {
            id: "electronics",
            name: "Electronics",
            image:
              "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
          },
          {
            id: "clothing",
            name: "Clothing",
            image:
              "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
          },
          {
            id: "home",
            name: "Home & Kitchen",
            image:
              "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80",
          },
          {
            id: "books",
            name: "Books",
            image:
              "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
          },
          {
            id: "beauty",
            name: "Beauty & Personal Care",
            image:
              "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
          },
          {
            id: "sports",
            name: "Sports & Outdoors",
            image:
              "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80",
          },
        ],
      );
    };

    fetchCategories();
  }, [getAllCategories]);

  useEffect(() => {
    // Fetch products when a category is selected
    if (selectedCategory) {
      const fetchProducts = async () => {
        const categoryProducts = await getProductsByCategory(
          selectedCategory.id,
        );
        setProducts(categoryProducts || []);
      };

      fetchProducts();
    }
  }, [selectedCategory, getProductsByCategory]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>

        {selectedCategory ? (
          <div>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:underline flex items-center mr-4"
              >
                ← Back to Categories
              </button>
              <h2 className="text-2xl font-semibold">
                {selectedCategory.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {product.description}
                        </p>
                        <p className="font-bold mt-2">
                          ${product.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 mb-4">
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-center">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoriesPage;

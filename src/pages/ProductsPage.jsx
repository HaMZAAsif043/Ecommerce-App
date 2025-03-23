import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductGrid from "../components/products/ProductGrid";
import { useProduct } from "../context/ProductContext";

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const categoryParam = queryParams.get("category");

  const { getAllProducts, searchProducts, getProductsByCategory } =
    useProduct();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("All Products");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let fetchedProducts = [];

      if (searchQuery) {
        fetchedProducts = await searchProducts(searchQuery);
        setTitle(`Search Results for "${searchQuery}"`);
      } else if (categoryParam) {
        fetchedProducts = await getProductsByCategory(categoryParam);
        setTitle(
          `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products`,
        );
      } else {
        fetchedProducts = await getAllProducts();
        setTitle("All Products");
      }

      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [
    searchQuery,
    categoryParam,
    getAllProducts,
    searchProducts,
    getProductsByCategory,
  ]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? `No products found matching "${searchQuery}"`
                : categoryParam
                  ? `No products found in the ${categoryParam} category`
                  : "No products available at the moment."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;

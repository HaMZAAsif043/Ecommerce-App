import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProductDetail from "../components/products/ProductDetail";
import { useProduct } from "../context/ProductContext";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { getProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setError(null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, getProductById]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading product...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{error}</p>
            <Link to="/products" className="text-primary hover:underline">
              Browse all products
            </Link>
          </div>
        ) : (
          <ProductDetail product={product} />
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import ProductGrid from "./products/ProductGrid";
import ProductDetail from "./products/ProductDetail";
import CartDrawer from "./cart/CartDrawer";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 249.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
  ]);

  // Sample products data
  const products: Product[] = [
    {
      id: "prod-001",
      name: "Premium Wireless Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      rating: 4.5,
      category: "Audio",
    },
    {
      id: "prod-002",
      name: "Smartphone Stand with Wireless Charger",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
      rating: 4.2,
      category: "Accessories",
    },
    {
      id: "prod-003",
      name: "Ultra-Slim Laptop Sleeve",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
      rating: 4.0,
      category: "Accessories",
    },
    {
      id: "prod-004",
      name: "Bluetooth Portable Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
      rating: 4.7,
      category: "Audio",
    },
    {
      id: "prod-005",
      name: "Ergonomic Mechanical Keyboard",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80",
      rating: 4.8,
      category: "Computing",
    },
    {
      id: "prod-006",
      name: "Wireless Gaming Mouse",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80",
      rating: 4.6,
      category: "Computing",
    },
    {
      id: "prod-007",
      name: "4K Ultra HD Monitor",
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
      rating: 4.9,
      category: "Computing",
    },
    {
      id: "prod-008",
      name: "Smart Fitness Tracker",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=400&q=80",
      rating: 4.3,
      category: "Wearables",
    },
  ];

  const handleAddToCart = (productId: string) => {
    const productToAdd = products.find((product) => product.id === productId);

    if (!productToAdd) return;

    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        return [
          ...prevItems,
          {
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 1,
            image: productToAdd.image,
          },
        ];
      }
    });

    // Open cart drawer when adding item
    setIsCartOpen(true);
  };

  const handleViewProductDetails = (productId: string) => {
    setSelectedProduct(productId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    // Navigate to checkout page or show checkout flow
    console.log("Proceeding to checkout");
    // This would typically navigate to a checkout page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        onCartClick={handleCartClick}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        {selectedProduct ? (
          <div className="mb-8">
            <button
              onClick={handleBackToProducts}
              className="mb-4 text-sm font-medium text-primary flex items-center"
            >
              ← Back to products
            </button>
            <ProductDetail
              product={{
                id: selectedProduct,
                name:
                  products.find((p) => p.id === selectedProduct)?.name || "",
                price:
                  products.find((p) => p.id === selectedProduct)?.price || 0,
                rating:
                  products.find((p) => p.id === selectedProduct)?.rating || 0,
                reviewCount: 127,
                description:
                  "This premium product is designed for comfort and functionality. Perfect for everyday use, it combines style and performance in one sleek package.",
                features: [
                  "High-quality materials",
                  "Ergonomic design",
                  "Long battery life",
                  "Water resistant",
                  "1-year warranty",
                ],
                specifications: {
                  Material: "Premium materials",
                  Dimensions: "Standard size",
                  Weight: "Light weight",
                  "Battery Life": "Up to 20 hours",
                  Warranty: "1 year limited",
                },
                images: [
                  products.find((p) => p.id === selectedProduct)?.image || "",
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
                  "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
                ],
                colors: ["Black", "White", "Blue", "Red"],
                sizes: ["Small", "Medium", "Large"],
                inStock: true,
                deliveryEstimate: "2-4 business days",
              }}
            />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
              Featured Products
            </h1>
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewProductDetails}
            />
          </div>
        )}
      </main>

      <CartDrawer
        items={cartItems}
        isOpen={isCartOpen}
        onClose={handleCartClose}
        onCheckout={handleCheckout}
      />

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ShopEase</h3>
              <p className="text-sm text-gray-600">
                Your one-stop shop for quality products at affordable prices.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/products"
                    className="text-gray-600 hover:text-primary"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-600 hover:text-primary"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/deals"
                    className="text-gray-600 hover:text-primary"
                  >
                    Deals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/account"
                    className="text-gray-600 hover:text-primary"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="text-gray-600 hover:text-primary"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="text-gray-600 hover:text-primary"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-gray-600 hover:text-primary"
                  >
                    Shipping & Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2023 ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

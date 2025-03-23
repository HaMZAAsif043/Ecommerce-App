import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shop the Latest Products at Amazing Prices
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover a wide range of high-quality products with fast shipping
            and excellent customer service.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white" asChild>
              <Link to="/deals">View Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link
              to="/categories?category=electronics"
              className="group text-center"
            >
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80"
                  alt="Electronics"
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="font-medium group-hover:text-primary">
                  Electronics
                </h3>
              </div>
            </Link>
            <Link
              to="/categories?category=clothing"
              className="group text-center"
            >
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80"
                  alt="Clothing"
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="font-medium group-hover:text-primary">
                  Clothing
                </h3>
              </div>
            </Link>
            <Link to="/categories?category=home" className="group text-center">
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80"
                  alt="Home & Kitchen"
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="font-medium group-hover:text-primary">
                  Home & Kitchen
                </h3>
              </div>
            </Link>
            <Link to="/categories?category=books" className="group text-center">
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80"
                  alt="Books"
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="font-medium group-hover:text-primary">Books</h3>
              </div>
            </Link>
            <Link
              to="/categories?category=beauty"
              className="group text-center"
            >
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80"
                  alt="Beauty"
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="font-medium group-hover:text-primary">
                  Beauty & Personal Care
                </h3>
              </div>
            </Link>
            <Link
              to="/categories?category=sports"
              className="group text-center"
            >
              <div className="bg-white rounded-lg shadow-md p-6 transition-transform group-hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&q=80"
                  alt="Sports"
                  className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="font-medium group-hover:text-primary">
                  Sports & Outdoors
                </h3>
              </div>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link to="/products/1" className="group">
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
                    alt="Wireless Headphones"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                    Wireless Headphones
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    Premium wireless headphones with noise cancellation.
                  </p>
                  <p className="font-bold mt-2">$149.99</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/products/2" className="group">
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
                    alt="Smart Watch"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                    Smart Watch
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    Track your fitness and stay connected with this smart watch.
                  </p>
                  <p className="font-bold mt-2">$199.99</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/products/3" className="group">
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80"
                    alt="Casual T-Shirt"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                    Casual T-Shirt
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    Comfortable cotton t-shirt for everyday wear.
                  </p>
                  <p className="font-bold mt-2">$24.99</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/products/4" className="group">
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80"
                    alt="Coffee Maker"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1 group-hover:text-primary">
                    Coffee Maker
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    Automatic coffee maker with timer and multiple settings.
                  </p>
                  <p className="font-bold mt-2">$89.99</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
                    alt="Headphones Deal"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2 text-white">
                  <h3 className="text-2xl font-bold mb-2">Flash Sale!</h3>
                  <p className="text-lg mb-2">Wireless Headphones</p>
                  <p className="mb-4">
                    Get 30% off on premium noise-cancelling headphones.
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">$149.99</span>
                    <span className="text-lg line-through ml-2 opacity-75">
                      $199.99
                    </span>
                  </div>
                  <Button variant="secondary" asChild>
                    <Link to="/products/1">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
                    alt="Smart Watch Deal"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Limited Time Offer!
                  </h3>
                  <p className="text-lg mb-2">Smart Watches</p>
                  <p className="mb-4">
                    Buy one get one 50% off on all smart watches.
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold">$199.99</span>
                    <span className="text-lg ml-2 opacity-75">
                      +50% off second watch
                    </span>
                  </div>
                  <Button variant="secondary" asChild>
                    <Link to="/products/2">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/deals">View All Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="Customer"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">John D.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The delivery was incredibly fast, and the product quality
                exceeded my expectations. Will definitely shop here again!"
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="Customer"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah M.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Customer service was outstanding when I needed to exchange an
                item. The process was smooth and hassle-free."
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                    alt="Customer"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The prices are unbeatable and the quality is top-notch. I've
                recommended this store to all my friends and family."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest products, deals, and
            exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex">
            <Input
              type="email"
              placeholder="Your email address"
              className="rounded-r-none"
              required
            />
            <Button type="submit" className="rounded-l-none">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;

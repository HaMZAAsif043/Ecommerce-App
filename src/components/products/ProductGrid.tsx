import React, { useState } from "react";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductGrid = ({
  products = [
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
  ],
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products based on search, price range, and categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default: // featured or any other case
        return 0; // maintain original order
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Filter Products</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price Range Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="mb-6">
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={500}
                  step={10}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">
          Showing {sortedProducts.length}{" "}
          {sortedProducts.length === 1 ? "product" : "products"}
        </p>
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategories([])}
            className="text-xs"
          >
            Clear filters
          </Button>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No products found matching your criteria.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setPriceRange([0, 500]);
              setSelectedCategories([]);
            }}
            className="mt-2"
          >
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

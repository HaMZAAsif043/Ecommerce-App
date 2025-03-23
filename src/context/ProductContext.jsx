import React, { createContext, useContext, useState, useEffect } from "react";

// Sample product data
const initialProducts = [
  {
    id: "prod-001",
    name: "Premium Wireless Headphones",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    rating: 4.5,
    category: "Audio",
    description:
      "These premium wireless headphones deliver exceptional sound quality with deep bass and crystal-clear highs. Featuring active noise cancellation, they provide an immersive listening experience in any environment.",
    features: [
      "Active noise cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Comfortable over-ear design",
      "Quick charge (10 min for 5 hours playback)",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz-20kHz",
      Impedance: "32 Ohm",
      Weight: "250g",
      "Charging Port": "USB-C",
      Warranty: "2 years",
    },
    colors: ["Black", "White", "Blue", "Red"],
    inStock: true,
    deliveryEstimate: "2-4 business days",
    reviewCount: 127,
  },
  {
    id: "prod-002",
    name: "Smartphone Stand with Wireless Charger",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80",
    rating: 4.2,
    category: "Accessories",
    description:
      "This versatile smartphone stand doubles as a wireless charger, allowing you to keep your device powered up while watching videos or making video calls. The adjustable angle ensures optimal viewing comfort.",
    features: [
      "10W fast wireless charging",
      "Adjustable viewing angle",
      "Compatible with all Qi-enabled devices",
      "Anti-slip base",
      "LED charging indicator",
      "Compact and portable design",
    ],
    specifications: {
      Input: "5V/2A, 9V/1.67A",
      Output: "10W max",
      Material: "Aluminum alloy and silicone",
      Dimensions: "4.5 x 3.5 x 3 inches",
      Weight: "180g",
      Warranty: "1 year",
    },
    colors: ["Silver", "Black", "Rose Gold"],
    inStock: true,
    deliveryEstimate: "1-3 business days",
    reviewCount: 84,
  },
  {
    id: "prod-003",
    name: "Ultra-Slim Laptop Sleeve",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    rating: 4.0,
    category: "Accessories",
    description:
      "Protect your laptop in style with this ultra-slim sleeve featuring water-resistant material and a plush interior lining to prevent scratches. The minimalist design makes it perfect for professionals and students alike.",
    features: [
      "Water-resistant exterior",
      "Soft microfiber interior lining",
      "Slim profile fits easily in backpacks",
      "YKK zipper for durability",
      "Front pocket for accessories",
      "Available in multiple sizes",
    ],
    specifications: {
      Material: "Polyester with water-resistant coating",
      "Sizes Available": "13-inch, 14-inch, 15-inch, 16-inch",
      Thickness: "0.5 inches",
      Weight: "160g",
      Colors: "Multiple options available",
      Care: "Spot clean only",
    },
    colors: ["Gray", "Black", "Navy", "Pink"],
    inStock: true,
    deliveryEstimate: "1-3 business days",
    reviewCount: 56,
  },
  {
    id: "prod-004",
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
    rating: 4.7,
    category: "Audio",
    description:
      "This compact Bluetooth speaker delivers surprisingly powerful sound in a portable package. With its waterproof design and long battery life, it's perfect for outdoor adventures or poolside parties.",
    features: [
      "360° immersive sound",
      "IPX7 waterproof rating",
      "12-hour battery life",
      "Built-in microphone for calls",
      "Bluetooth 5.0 with 100ft range",
      "Durable drop-resistant design",
    ],
    specifications: {
      "Speaker Output": "20W",
      "Battery Capacity": "3600mAh",
      "Charging Time": "3 hours",
      Dimensions: "3.5 x 3.5 x 7 inches",
      Weight: "540g",
      Warranty: "1 year",
    },
    colors: ["Black", "Blue", "Red", "Teal"],
    inStock: true,
    deliveryEstimate: "2-4 business days",
    reviewCount: 203,
  },
  {
    id: "prod-005",
    name: "Ergonomic Mechanical Keyboard",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80",
    rating: 4.8,
    category: "Computing",
    description:
      "Experience superior typing comfort with this ergonomic mechanical keyboard featuring customizable RGB lighting and programmable keys. The premium switches provide satisfying tactile feedback for both gaming and productivity.",
    features: [
      "Mechanical switches rated for 50 million keystrokes",
      "Fully programmable keys with macro support",
      "Per-key RGB lighting with 16.8 million colors",
      "Detachable wrist rest for comfort",
      "N-key rollover for gaming",
      "Durable aluminum frame",
    ],
    specifications: {
      "Switch Type": "Cherry MX Brown",
      Layout: "Full-size with numpad",
      Connectivity: "USB-C (detachable cable)",
      Dimensions: "17.3 x 5.2 x 1.4 inches",
      Weight: "1.1kg",
      Warranty: "2 years",
    },
    colors: ["Black", "White"],
    inStock: true,
    deliveryEstimate: "2-4 business days",
    reviewCount: 89,
  },
  {
    id: "prod-006",
    name: "Wireless Gaming Mouse",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80",
    rating: 4.6,
    category: "Computing",
    description:
      "Gain a competitive edge with this wireless gaming mouse featuring an ultra-precise sensor and customizable weight system. The ergonomic design ensures comfort during extended gaming sessions.",
    features: [
      "25,000 DPI optical sensor",
      "1ms response rate",
      "70-hour battery life",
      "8 programmable buttons",
      "Adjustable weight system",
      "RGB lighting with 16.8 million colors",
    ],
    specifications: {
      Sensor: "Hero 25K",
      Battery: "Rechargeable Li-Po",
      Connectivity: "2.4GHz wireless or USB-C",
      Weight: "114g (adjustable)",
      "Polling Rate": "1000Hz",
      Warranty: "2 years",
    },
    colors: ["Black", "White"],
    inStock: true,
    deliveryEstimate: "2-4 business days",
    reviewCount: 142,
  },
  {
    id: "prod-007",
    name: "4K Ultra HD Monitor",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    rating: 4.9,
    category: "Computing",
    description:
      "Elevate your visual experience with this 4K Ultra HD monitor featuring vibrant colors and a wide viewing angle. The virtually borderless design maximizes screen space while adding a touch of elegance to your workspace.",
    features: [
      "4K UHD resolution (3840 x 2160)",
      "27-inch IPS panel",
      "99% sRGB color accuracy",
      "HDR10 support",
      "Adaptive sync technology",
      "Multiple connectivity options",
    ],
    specifications: {
      "Panel Type": "IPS",
      "Refresh Rate": "60Hz",
      "Response Time": "5ms",
      Ports: "HDMI 2.0, DisplayPort 1.4, USB-C",
      "VESA Mount": "100 x 100mm",
      Warranty: "3 years",
    },
    colors: ["Black"],
    inStock: true,
    deliveryEstimate: "3-5 business days",
    reviewCount: 76,
  },
  {
    id: "prod-008",
    name: "Smart Fitness Tracker",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?w=400&q=80",
    rating: 4.3,
    category: "Wearables",
    description:
      "Track your health and fitness goals with this advanced smart tracker featuring heart rate monitoring, sleep analysis, and workout detection. The sleek design makes it suitable for both exercise and everyday wear.",
    features: [
      "24/7 heart rate monitoring",
      "Sleep stage tracking",
      "50+ workout modes",
      "Water resistant to 50m",
      "7-day battery life",
      "Smartphone notifications",
    ],
    specifications: {
      Display: "1.1-inch AMOLED",
      Sensors: "Optical heart rate, accelerometer, gyroscope",
      Battery: "180mAh Li-Po",
      "Water Resistance": "5 ATM",
      Connectivity: "Bluetooth 5.0",
      Warranty: "1 year",
    },
    colors: ["Black", "Blue", "Pink", "Green"],
    inStock: true,
    deliveryEstimate: "1-3 business days",
    reviewCount: 218,
  },
];

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);
// Also provide a plural alias for better developer experience
export const useProducts = useProduct;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  // Get a product by ID
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId) || null;
  };

  // Get products by category
  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  // Search products by name
  const searchProducts = (searchTerm) => {
    if (!searchTerm) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  // Filter products by price range
  const filterByPriceRange = (minPrice, maxPrice) => {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
  };

  // Sort products by different criteria
  const sortProducts = (products, sortBy) => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case "price-low-high":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "rating":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case "name-a-z":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case "name-z-a":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      default: // 'featured' or any other case
        return sortedProducts;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        getProductById,
        getProductsByCategory,
        searchProducts,
        filterByPriceRange,
        sortProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

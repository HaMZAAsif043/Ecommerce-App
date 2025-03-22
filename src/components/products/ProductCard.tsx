import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  rating?: number;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard = ({
  id = "prod-001",
  name = "Premium Wireless Headphones",
  price = 129.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
  rating = 4.5,
  onAddToCart = () => {},
  onViewDetails = () => {},
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(id);
  };

  const handleCardClick = () => {
    onViewDetails(id);
  };

  // Generate full stars based on rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50"
          />,
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card
      className="w-full max-w-[320px] overflow-hidden transition-all hover:shadow-lg cursor-pointer bg-white"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Button
          size="icon"
          className="absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-4 w-4 text-gray-800" />
        </Button>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center space-x-1">
          {renderRating()}
          <span className="ml-1 text-xs text-gray-500">
            {rating.toFixed(1)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-lg font-bold">${price.toFixed(2)}</div>
        <Button size="sm" onClick={handleAddToCart} className="text-xs">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

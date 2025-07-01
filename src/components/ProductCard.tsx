
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Zap, Gift, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
  inStock: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} added. You'll be entered into the monthly draw!`,
      duration: 3000,
    });
    
    setIsAdding(false);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Gift className="w-3 h-3 mr-1" />
              Free Entry
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="bg-red-500">
              <Percent className="w-3 h-3 mr-1" />
              {discountPercentage}% OFF
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
          </div>
        </div>

        {/* Prize entry highlight */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-200">
          <div className="flex items-center mb-2">
            <Zap className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">Bonus Prize Entry</span>
          </div>
          <p className="text-xs text-blue-700">
            Purchase this item and get automatically entered into this month's draw for a chance to win a Tesla Model 3!
          </p>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all"
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now & Enter Draw
            </>
          )}
        </Button>

        {!product.inStock && (
          <p className="text-red-500 text-sm mt-2 text-center">Out of Stock</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;

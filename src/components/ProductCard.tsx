
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Zap, Gift, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCreateOrder } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { useCurrency } from '@/hooks/useCurrency';
import { Product } from '@/hooks/useProducts';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { convertPrice } = useCurrency();
  const createOrderMutation = useCreateOrder();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "يرجى تسجيل الدخول",
        description: "يجب تسجيل الدخول أولاً لإتمام عملية الشراء",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    
    try {
      await createOrderMutation.mutateAsync({
        product_id: product.id,
        quantity: 1,
        price: product.price
      });
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const discountPercentage = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:bg-white/30">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image_url || '/placeholder.svg'} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex space-x-2">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg backdrop-blur-sm">
              <Gift className="w-3 h-3 mr-1" />
              دخول مجاني
            </Badge>
            <WishlistButton productId={product.id} productName={product.name} />
          </div>
          {discountPercentage > 0 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg backdrop-blur-sm">
                <Percent className="w-3 h-3 mr-1" />
                خصم {discountPercentage}%
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{product.name}</h3>
          <p className="text-white/80 text-sm mb-3">{product.description}</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
              {convertPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-lg text-white/60 line-through">
                {convertPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>

        {/* Prize entry highlight */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/30 shadow-lg">
          <div className="flex items-center mb-2">
            <Zap className="w-4 h-4 text-yellow-300 mr-2" />
            <span className="text-sm font-semibold text-yellow-300">دخول مكافأة في السحب</span>
          </div>
          <p className="text-xs text-white/80">
            اشتر هذا المنتج وادخل تلقائياً في سحب هذا الشهر للفوز بتسلا موديل ٣!
          </p>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={!product.in_stock || isAdding || createOrderMutation.isPending}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm border border-white/20"
        >
          {isAdding || createOrderMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              جاري الإضافة...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              اشتر الآن وادخل السحب
            </>
          )}
        </Button>

        {!product.in_stock && (
          <p className="text-red-300 text-sm mt-2 text-center">نفدت الكمية</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;

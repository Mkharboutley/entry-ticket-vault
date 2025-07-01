
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Zap, Gift, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCreateOrder } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/hooks/useProducts';

interface TicketCardProps {
  product: Product;
}

const TicketCard: React.FC<TicketCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const createOrderMutation = useCreateOrder();

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "يرجى تسجيل الدخول",
        description: "يجب تسجيل الدخول أولاً لإتمام عملية الشراء",
        variant: "destructive",
      });
      return;
    }

    try {
      await createOrderMutation.mutateAsync({
        product_id: product.id,
        quantity: 1,
        price: product.price
      });
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const discountPercentage = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="relative group perspective-1000">
      {/* Ticket-shaped container with metallic gradient */}
      <div className="relative bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 rounded-3xl p-1 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1">
        {/* Inner ticket content */}
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl overflow-hidden border-2 border-gray-300 shadow-inner">
          
          {/* Wing decorations */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 shadow-lg"></div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-l from-yellow-400 to-orange-500 rounded-full opacity-70 shadow-lg"></div>
          
          {/* Perforated edge effect */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50">
            <div className="h-full bg-gradient-to-b from-transparent via-white to-transparent" style={{
              backgroundImage: 'radial-gradient(circle, transparent 30%, white 30%)',
              backgroundSize: '4px 8px'
            }}></div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50">
            <div className="h-full bg-gradient-to-b from-transparent via-white to-transparent" style={{
              backgroundImage: 'radial-gradient(circle, transparent 30%, white 30%)',
              backgroundSize: '4px 8px'
            }}></div>
          </div>

          <CardHeader className="p-0 relative">
            <div className="relative overflow-hidden">
              <img 
                src={product.image_url || '/placeholder.svg'} 
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg backdrop-blur-sm border border-white/30">
                  <Gift className="w-3 h-3 mr-1" />
                  دخول مجاني
                </Badge>
              </div>
              {discountPercentage > 0 && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg backdrop-blur-sm border border-white/30">
                    <Percent className="w-3 h-3 mr-1" />
                    خصم {discountPercentage}%
                  </Badge>
                </div>
              )}
              
              {/* Metallic brand strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-center py-2 shadow-lg">
                <span className="text-white font-bold text-lg drop-shadow-lg tracking-wider">KHUDA DRAW</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 relative">
            {/* Decorative pattern */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 text-center">{product.description}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">${product.price}</span>
                {product.original_price && (
                  <span className="text-lg text-gray-500 line-through">${product.original_price}</span>
                )}
              </div>
            </div>

            {/* Prize entry highlight with ticket design */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border-2 border-dashed border-blue-300 shadow-inner relative">
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-300"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-300"></div>
              
              <div className="flex items-center mb-2">
                <Zap className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm font-semibold text-blue-700">دخول مكافأة في السحب</span>
              </div>
              <p className="text-xs text-gray-700">
                اشتر هذا المنتج وادخل تلقائياً في سحب هذا الشهر للفوز بتسلا موديل ٣!
              </p>
            </div>

            <Button 
              onClick={handleAddToCart}
              disabled={!product.in_stock || createOrderMutation.isPending}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border border-yellow-600"
            >
              {createOrderMutation.isPending ? (
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
              <p className="text-red-500 text-sm mt-2 text-center font-semibold">نفدت الكمية</p>
            )}
          </CardContent>
        </div>
      </div>

      {/* Ticket number at bottom */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-1 rounded-full text-xs font-mono shadow-lg">
        #{product.id.slice(0, 8).toUpperCase()}
      </div>
    </div>
  );
};

export default TicketCard;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WishlistButtonProps {
  productId: string;
  productName: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId, productName }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!isWishlisted) {
      savedWishlist.push({ id: productId, name: productName, addedAt: new Date() });
      toast({
        title: "تمت الإضافة للمفضلة",
        description: `تم إضافة ${productName} إلى قائمة المفضلة`,
      });
    } else {
      const updatedWishlist = savedWishlist.filter((item: any) => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        title: "تم الحذف من المفضلة",
        description: `تم حذف ${productName} من قائمة المفضلة`,
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleWishlist}
      className={`${isWishlisted ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
    >
      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default WishlistButton;

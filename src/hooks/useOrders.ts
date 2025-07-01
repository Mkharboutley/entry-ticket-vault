
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, doc, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CreateOrderData {
  product_id: string;
  quantity: number;
  price: number;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      if (!user) throw new Error('User not authenticated');

      // Create order
      const orderRef = await addDoc(collection(db, 'orders'), {
        user_id: user.uid,
        total_amount: orderData.price * orderData.quantity,
        status: 'pending',
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });

      // Create order item
      await addDoc(collection(db, 'order_items'), {
        order_id: orderRef.id,
        product_id: orderData.product_id,
        quantity: orderData.quantity,
        price: orderData.price,
        created_at: serverTimestamp()
      });

      // Complete the order
      await updateDoc(doc(db, 'orders', orderRef.id), {
        status: 'completed',
        updated_at: serverTimestamp()
      });

      // Create draw entry
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const entryCode = `DRAW${currentYear}${currentMonth.toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

      await addDoc(collection(db, 'draw_entries'), {
        user_id: user.uid,
        order_id: orderRef.id,
        entry_code: entryCode,
        draw_month: currentMonth,
        draw_year: currentYear,
        created_at: serverTimestamp()
      });

      // Update total entries count in current draw
      const drawsRef = collection(db, 'draws');
      // You might need to implement a way to find and update the current draw
      // This is a simplified version - in production you'd want to handle this more robustly

      return { id: orderRef.id };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['draw-entries'] });
      toast({
        title: "تم الشراء بنجاح!",
        description: "تم إدخالك في السحب الشهري تلقائياً!",
      });
    },
    onError: (error) => {
      console.error('Order creation failed:', error);
      toast({
        title: "فشل في إتمام الشراء",
        description: "حدث خطأ، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });
};

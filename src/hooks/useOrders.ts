
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CreateOrderData {
  product_id: string;
  quantity: number;
  price: number;
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: orderData.price * orderData.quantity,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: order.id,
          product_id: orderData.product_id,
          quantity: orderData.quantity,
          price: orderData.price
        });

      if (itemError) throw itemError;

      // Complete the order (this will trigger the draw entry creation)
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', order.id);

      if (updateError) throw updateError;

      return order;
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

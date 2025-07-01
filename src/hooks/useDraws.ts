
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Draw {
  id: string;
  month: number;
  year: number;
  prize_name: string;
  draw_date: string;
  winner_id: string | null;
  winning_entry_code: string | null;
  total_entries: number;
  status: string;
}

export const useCurrentDraw = () => {
  return useQuery({
    queryKey: ['current-draw'],
    queryFn: async () => {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const { data, error } = await supabase
        .from('draws')
        .select('*')
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .single();

      if (error) throw error;
      return data as Draw;
    },
  });
};

export const useRecentWinners = () => {
  return useQuery({
    queryKey: ['recent-winners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('draws')
        .select(`
          *,
          winner:auth.users!draws_winner_id_fkey(email)
        `)
        .eq('status', 'completed')
        .order('draw_date', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });
};

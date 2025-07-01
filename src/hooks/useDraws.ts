
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

      const drawsRef = collection(db, 'draws');
      const q = query(
        drawsRef,
        where('month', '==', currentMonth),
        where('year', '==', currentYear)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new Error('No current draw found');
      }

      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Draw;
    },
  });
};

export const useRecentWinners = () => {
  return useQuery({
    queryKey: ['recent-winners'],
    queryFn: async () => {
      const drawsRef = collection(db, 'draws');
      const q = query(
        drawsRef,
        where('status', '==', 'completed'),
        orderBy('draw_date', 'desc'),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      const winners: any[] = [];

      for (const drawDoc of querySnapshot.docs) {
        const drawData = drawDoc.data();
        let winner_email = 'Winner';
        
        if (drawData.winner_id) {
          const userDoc = await getDoc(doc(db, 'users', drawData.winner_id));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            winner_email = userData.email || 'Winner';
          }
        }

        winners.push({
          id: drawDoc.id,
          ...drawData,
          winner_email
        });
      }

      return winners;
    },
  });
};

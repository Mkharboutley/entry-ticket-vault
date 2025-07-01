import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, User, Award } from 'lucide-react';
import { useRecentWinners } from '@/hooks/useDraws';
import DrawTicket from './DrawTicket';

const DrawHistory = () => {
  const { data: recentWinners, isLoading } = useRecentWinners();

  // Fallback data for demonstration
  const fallbackWinners = [
    {
      id: 1,
      prize_name: "آيفون ١٥ برو",
      winner_email: "م.ج. من كاليفورنيا",
      draw_date: "2024-06-01",
      winning_entry_code: "DRAW202406-****789",
      total_entries: 1456
    },
    {
      id: 2,
      prize_name: "ماك بوك برو",
      winner_email: "س.ل. من نيويورك",
      draw_date: "2024-05-01",
      winning_entry_code: "DRAW202405-****234",
      total_entries: 1234
    },
    {
      id: 3,
      prize_name: "٥٠٠٠ دولار نقداً",
      winner_email: "أ.ر. من تكساس",
      draw_date: "2024-04-01",
      winning_entry_code: "DRAW202404-****567",
      total_entries: 2100
    }
  ];

  const winners = recentWinners?.length ? recentWinners : fallbackWinners;

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            الفائزون الأخيرون
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg drop-shadow-md">
            الشفافية هي مفتاح منصتنا. شاهد فائزينا الأخيرين ومشاركاتهم الفائزة.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <DrawTicket key={winner.id || index} winner={winner} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button className="text-yellow-300 hover:text-yellow-200 font-semibold transition-colors drop-shadow-md">
            عرض تاريخ السحوبات الكامل ←
          </button>
        </div>
      </div>
    </section>
  );
};

export default DrawHistory;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, User, Award } from 'lucide-react';
import { useRecentWinners } from '@/hooks/useDraws';

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {winners.map((winner, index) => (
              <Card key={winner.id || index} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/30 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white drop-shadow-md">
                    {winner.prize_name}
                  </CardTitle>
                  <Badge className="bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-400/30">
                    <Award className="w-3 h-3 mr-1" />
                    فائز مؤكد
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-white/80">
                    <User className="w-4 h-4 mr-2" />
                    <span>{winner.winner_email || winner.winner?.email || 'مجهول'}</span>
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(winner.draw_date).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-xs text-white/60 mb-1">كود المشاركة الفائزة</p>
                    <p className="font-mono text-sm font-semibold text-white">{winner.winning_entry_code}</p>
                  </div>
                  <div className="text-center pt-2">
                    <p className="text-xs text-white/60">
                      إجمالي المشاركات: <span className="font-semibold text-white">{winner.total_entries.toLocaleString('ar-SA')}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
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

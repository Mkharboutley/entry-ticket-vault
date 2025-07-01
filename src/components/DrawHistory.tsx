
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, User, Award } from 'lucide-react';

const DrawHistory = () => {
  const recentWinners = [
    {
      id: 1,
      prize: "iPhone 15 Pro",
      winner: "M.J. from California",
      date: "2024-06-01",
      entryCode: "DRAW202406-****789",
      totalEntries: 1456
    },
    {
      id: 2,
      prize: "MacBook Pro",
      winner: "S.L. from New York",
      date: "2024-05-01",
      entryCode: "DRAW202405-****234",
      totalEntries: 1234
    },
    {
      id: 3,
      prize: "$5,000 Cash",
      winner: "A.R. from Texas",
      date: "2024-04-01",
      entryCode: "DRAW202404-****567",
      totalEntries: 2100
    }
  ];

  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recent Winners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparency is key to our platform. See our recent winners and their winning entries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentWinners.map((winner) => (
            <Card key={winner.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {winner.prize}
                </CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Award className="w-3 h-3 mr-1" />
                  Winner Verified
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{winner.winner}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(winner.date).toLocaleDateString()}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Winning Entry Code</p>
                  <p className="font-mono text-sm font-semibold">{winner.entryCode}</p>
                </div>
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">
                    Total Entries: <span className="font-semibold">{winner.totalEntries.toLocaleString()}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-800 font-semibold">
            View Complete Draw History →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DrawHistory;

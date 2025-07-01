
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, User, Award } from 'lucide-react';

interface DrawTicketProps {
  winner: {
    id: number;
    prize_name: string;
    winner_email: string;
    draw_date: string;
    winning_entry_code: string;
    total_entries: number;
  };
  index: number;
}

const DrawTicket: React.FC<DrawTicketProps> = ({ winner, index }) => {
  return (
    <div className="relative group perspective-1000">
      {/* Metallic ticket container */}
      <div className="relative bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400 rounded-3xl p-1 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1">
        {/* Inner ticket content */}
        <div className="bg-gradient-to-br from-white via-amber-50 to-yellow-100 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-inner">
          
          {/* Wing decorations - Golden */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full opacity-80 shadow-xl"></div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-l from-yellow-500 to-amber-600 rounded-full opacity-80 shadow-xl"></div>
          
          {/* Perforated edge effect */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-50">
            <div className="h-full bg-gradient-to-b from-transparent via-white to-transparent" style={{
              backgroundImage: 'radial-gradient(circle, transparent 30%, white 30%)',
              backgroundSize: '4px 8px'
            }}></div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-transparent via-amber-300 to-transparent opacity-50">
            <div className="h-full bg-gradient-to-b from-transparent via-white to-transparent" style={{
              backgroundImage: 'radial-gradient(circle, transparent 30%, white 30%)',
              backgroundSize: '4px 8px'
            }}></div>
          </div>

          {/* Header section */}
          <div className="text-center p-6 pb-4 relative">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400"></div>
            
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white">
              <Trophy className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            
            {/* KHUDA DRAW branding */}
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-full mb-3 shadow-lg">
              <span className="font-bold text-lg tracking-wider drop-shadow-lg">KHUDA DRAW</span>
            </div>
            
            <h3 className="text-xl font-bold text-amber-900 mb-2">{winner.prize_name}</h3>
            <Badge className="bg-green-500/20 backdrop-blur-sm text-green-700 border border-green-400/30">
              <Award className="w-3 h-3 mr-1" />
              فائز مؤكد
            </Badge>
          </div>

          {/* Content section */}
          <div className="p-6 pt-0 space-y-3">
            <div className="flex items-center text-sm text-amber-800">
              <User className="w-4 h-4 mr-2" />
              <span>{winner.winner_email}</span>
            </div>
            <div className="flex items-center text-sm text-amber-800">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(winner.draw_date).toLocaleDateString('ar-SA')}</span>
            </div>
            
            {/* Winning code section - ticket stub style */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-3 border-2 border-dashed border-amber-400 shadow-inner relative">
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-amber-400"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-amber-400"></div>
              
              <p className="text-xs text-amber-700 mb-1 font-semibold">كود المشاركة الفائزة</p>
              <p className="font-mono text-sm font-bold text-amber-900">{winner.winning_entry_code}</p>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-xs text-amber-700">
                إجمالي المشاركات: <span className="font-semibold text-amber-900">{winner.total_entries.toLocaleString('ar-SA')}</span>
              </p>
            </div>
          </div>

          {/* Bottom metallic strip */}
          <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 p-2 text-center">
            <span className="text-white text-xs font-bold tracking-wider drop-shadow-lg">WINNER VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Serial number at bottom */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-700 to-yellow-800 text-white px-4 py-1 rounded-full text-xs font-mono shadow-lg">
        #WIN{String(winner.id).padStart(4, '0')}
      </div>
    </div>
  );
};

export default DrawTicket;

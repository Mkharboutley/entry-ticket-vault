
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, ShoppingCart, Star } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface HeroSectionProps {
  currentPrize: string;
  nextDrawDate: Date;
}

const HeroSection: React.FC<HeroSectionProps> = ({ currentPrize, nextDrawDate }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            عرض لفترة محدودة
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
            اشتر منتجات مميزة،
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              اربح جوائز مذهلة
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-lg">
            كل عملية شراء تدخلك تلقائياً في سحب الجوائز الشهري. 
            جائزة هذا الشهر الكبرى هي <span className="font-bold text-yellow-300">{currentPrize}</span>!
          </p>

          {/* Current prize highlight */}
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/30 shadow-2xl">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-300 mr-3 drop-shadow-lg" />
              <h2 className="text-2xl font-bold drop-shadow-lg">جائزة هذا الشهر الكبرى</h2>
            </div>
            <p className="text-3xl font-bold text-yellow-300 mb-4 drop-shadow-lg">{currentPrize}</p>
            <div className="text-lg">
              <p className="mb-2">تاريخ السحب: <CountdownTimer targetDate={nextDrawDate} /></p>
              <p className="text-white/80">سيتم الإعلان عن الفائز مباشرة على منصتنا</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 backdrop-blur-sm"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              تسوق الآن ادخل السحب
            </Button>
            <Button 
              size="lg" 
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 font-semibold px-8 py-4 text-lg shadow-xl transition-all"
            >
              <Zap className="w-5 h-5 mr-2" />
              كيف يعمل
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              متوافق قانونياً
            </div>
            <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              مدفوعات آمنة
            </div>
            <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              عادل وشفاف
            </div>
            <div className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              لا يتطلب شراء*
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Star className="w-3 h-3 mr-1" />
            Limited Time Offer
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Buy Premium Products,
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Win Amazing Prizes
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Every purchase automatically enters you into our monthly prize draw. 
            This month's grand prize is a <span className="font-bold text-yellow-400">{currentPrize}</span>!
          </p>

          {/* Current prize highlight */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold">This Month's Grand Prize</h2>
            </div>
            <p className="text-3xl font-bold text-yellow-400 mb-4">{currentPrize}</p>
            <div className="text-lg">
              <p className="mb-2">Draw Date: <CountdownTimer targetDate={nextDrawDate} /></p>
              <p className="text-blue-200">Winner announced live on our platform</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shop Now & Enter Draw
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              How It Works
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Legally Compliant
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Secure Payments
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Fair & Transparent
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              No Purchase Required*
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

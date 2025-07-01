
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, ShoppingCart, Users, Zap, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';
import CountdownTimer from '@/components/CountdownTimer';
import StatsCard from '@/components/StatsCard';
import HeroSection from '@/components/HeroSection';
import DrawHistory from '@/components/DrawHistory';

const Index = () => {
  const { toast } = useToast();
  const [totalEntries, setTotalEntries] = useState(1247);
  const [activePlayers, setActivePlayers] = useState(892);
  const [currentPrize, setCurrentPrize] = useState("Tesla Model 3");

  // Mock data for demonstration
  const products = [
    {
      id: 1,
      name: "Premium Water Bottle",
      price: 15.99,
      originalPrice: 2.99,
      image: "/placeholder.svg",
      description: "Crystal clear spring water in a premium bottle",
      inStock: true,
      category: "beverages"
    },
    {
      id: 2,
      name: "Energy Drink",
      price: 12.99,
      originalPrice: 3.99,
      image: "/placeholder.svg",
      description: "High-energy drink with natural ingredients",
      inStock: true,
      category: "beverages"
    },
    {
      id: 3,
      name: "Artisan Coffee",
      price: 18.99,
      originalPrice: 4.99,
      image: "/placeholder.svg",
      description: "Premium single-origin coffee beans",
      inStock: true,
      category: "beverages"
    }
  ];

  const nextDrawDate = new Date();
  nextDrawDate.setDate(nextDrawDate.getDate() + 15);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTotalEntries(prev => prev + Math.floor(Math.random() * 3));
      setActivePlayers(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PrizeDraw POS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Users className="w-3 h-3 mr-1" />
                {activePlayers} Active
              </Badge>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                My Entries
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection currentPrize={currentPrize} nextDrawDate={nextDrawDate} />

      {/* Stats Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              icon={<Trophy className="w-6 h-6 text-yellow-600" />}
              title="Current Prize"
              value={currentPrize}
              description="Monthly Grand Prize"
              className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
            />
            <StatsCard
              icon={<Users className="w-6 h-6 text-blue-600" />}
              title="Total Entries"
              value={totalEntries.toLocaleString()}
              description="This month"
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200"
            />
            <StatsCard
              icon={<Zap className="w-6 h-6 text-green-600" />}
              title="Active Players"
              value={activePlayers.toLocaleString()}
              description="Currently online"
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
            />
            <StatsCard
              icon={<Clock className="w-6 h-6 text-purple-600" />}
              title="Next Draw"
              value={<CountdownTimer targetDate={nextDrawDate} />}
              description="Days remaining"
              className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Purchase any item and get automatically entered into our monthly prize draw. 
              Every purchase includes a <span className="font-semibold text-blue-600">FREE entry</span> to win amazing prizes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Legal Notice */}
          <div className="mt-12 bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
            <div className="flex items-start space-x-3">
              <Gift className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-2">Free Entry Available</p>
                <p>
                  No purchase necessary to enter. For a free entry, send your name and email to 
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-1">freeentry@prizedraw.com</span>
                  . Limit one free entry per person per month. See terms and conditions for full details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Draw History */}
      <DrawHistory />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">PrizeDraw POS</h3>
              </div>
              <p className="text-gray-400">
                The most trusted platform for premium product purchases with exciting prize draws.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prize History</a></li>
                <li><a href="#" className="hover:text-white transition-colors">My Account</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Draw Rules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Responsible Gaming</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@prizedraw.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Mon-Fri 9AM-6PM EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PrizeDraw POS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

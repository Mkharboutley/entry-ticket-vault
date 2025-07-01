
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
  const [currentPrize, setCurrentPrize] = useState("تسلا موديل ٣");

  // Mock data for demonstration
  const products = [
    {
      id: 1,
      name: "زجاجة مياه مميزة",
      price: 15.99,
      originalPrice: 2.99,
      image: "/placeholder.svg",
      description: "مياه صافية من الينابيع الطبيعية في زجاجة مميزة",
      inStock: true,
      category: "beverages"
    },
    {
      id: 2,
      name: "مشروب الطاقة",
      price: 12.99,
      originalPrice: 3.99,
      image: "/placeholder.svg",
      description: "مشروب طاقة عالي الجودة بمكونات طبيعية",
      inStock: true,
      category: "beverages"
    },
    {
      id: 3,
      name: "قهوة حرفية",
      price: 18.99,
      originalPrice: 4.99,
      image: "/placeholder.svg",
      description: "حبوب قهوة مميزة من منشأ واحد",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 font-tajawal relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/20 backdrop-blur-md border-b border-white/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Yaa Khoodeh Draw
              </h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                <Users className="w-3 h-3 ml-1" />
                {activePlayers} نشط
              </Badge>
              <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300">
                لوحة التحكم
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg backdrop-blur-sm">
                <ShoppingCart className="w-4 h-4 ml-2" />
                تسوق الآن
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection currentPrize={currentPrize} nextDrawDate={nextDrawDate} />

      {/* Stats Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard
              icon={<Trophy className="w-6 h-6 text-yellow-600" />}
              title="الجائزة الحالية"
              value={currentPrize}
              description="الجائزة الكبرى الشهرية"
              className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl"
            />
            <StatsCard
              icon={<Users className="w-6 h-6 text-blue-600" />}
              title="إجمالي المشاركات"
              value={totalEntries.toLocaleString('ar-SA')}
              description="هذا الشهر"
              className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl"
            />
            <StatsCard
              icon={<Zap className="w-6 h-6 text-green-600" />}
              title="اللاعبون النشطون"
              value={activePlayers.toLocaleString('ar-SA')}
              description="متصل حالياً"
              className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl"
            />
            <StatsCard
              icon={<Clock className="w-6 h-6 text-purple-600" />}
              title="السحب القادم"
              value={<CountdownTimer targetDate={nextDrawDate} />}
              description="الأيام المتبقية"
              className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              منتجات مميزة
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto text-lg drop-shadow-md">
              اشتر أي منتج واحصل على مشاركة مجانية في سحب الجوائز الشهري. 
              كل عملية شراء تتضمن <span className="font-semibold text-yellow-300">مشاركة مجانية</span> لكسب جوائز رائعة!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Legal Notice */}
          <div className="mt-12 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-start space-x-3 space-x-reverse">
              <Gift className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
              <div className="text-sm text-white/90">
                <p className="font-semibold mb-2 text-yellow-300">مشاركة مجانية متاحة</p>
                <p>
                  لا يلزم الشراء للمشاركة. للحصول على مشاركة مجانية، أرسل اسمك وبريدك الإلكتروني إلى 
                  <span className="font-mono bg-white/20 px-2 py-1 rounded mr-1">freeentry@yaakhoodeh.com</span>
                  . مشاركة مجانية واحدة لكل شخص شهرياً. راجع الشروط والأحكام للتفاصيل الكاملة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Draw History */}
      <DrawHistory />

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md text-white py-12 border-t border-white/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Yaa Khoodeh Draw</h3>
              </div>
              <p className="text-white/70">
                المنصة الأكثر موثوقية لشراء المنتجات المميزة مع سحوبات جوائز مثيرة.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">كيف يعمل</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تاريخ الجوائز</a></li>
                <li><a href="#" className="hover:text-white transition-colors">حسابي</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الدعم</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">قانوني</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">قوانين السحب</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اللعب المسؤول</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">اتصل بنا</h4>
              <ul className="space-y-2 text-white/70">
                <li>support@yaakhoodeh.com</li>
                <li>+1 (555) 123-4567</li>
                <li>الإثنين-الجمعة ٩ص-٦م بتوقيت الشرق</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; ٢٠٢٤ Yaa Khoodeh Draw. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

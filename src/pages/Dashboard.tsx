
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useCurrentDraw } from '@/hooks/useDraws';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import TicketCard from '@/components/TicketCard';
import DrawHistory from '@/components/DrawHistory';
import CurrencySelector from '@/components/CurrencySelector';
import Newsletter from '@/components/Newsletter';
import ReviewSection from '@/components/ReviewSection';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: currentDraw } = useCurrentDraw();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Yaa Khoodeh Draw" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-white">Yaa Khoodeh Draw</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <CurrencySelector />
              
              <Button
                variant="ghost"
                onClick={handleProfileClick}
                className="text-white hover:bg-white/20"
              >
                <User className="w-4 h-4 mr-2" />
                الملف الشخصي
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            مرحباً {user?.displayName || user?.email?.split('@')[0]}!
          </h2>
          <p className="text-white/90 text-lg drop-shadow-md max-w-2xl mx-auto">
            اكتشف منتجاتنا المميزة وادخل في السحوبات للفوز بجوائز رائعة
          </p>
        </section>

        {/* Current Draw Info */}
        {currentDraw && (
          <section className="mb-12">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">السحب الحالي</h3>
              <p className="text-white/90 text-lg mb-2">{currentDraw.prize_name}</p>
              <p className="text-white/80">
                تاريخ السحب: {new Date(currentDraw.draw_date).toLocaleDateString('ar-SA')}
              </p>
              <p className="text-white/80">
                إجمالي المشاركات: {currentDraw.total_entries || 0}
              </p>
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">
            المنتجات المتاحة
          </h3>
          
          {loadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-white/20 rounded mb-4"></div>
                  <div className="h-6 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          
          {!loadingProducts && (!products || products.length === 0) && (
            <div className="text-center py-12">
              <p className="text-white/80 text-lg">لا توجد منتجات متاحة حالياً</p>
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mb-12">
          <Newsletter />
        </section>

        {/* Review Section */}
        <section className="mb-12">
          <ReviewSection />
        </section>

        {/* Draw History */}
        <DrawHistory />
      </main>
    </div>
  );
};

export default Dashboard;

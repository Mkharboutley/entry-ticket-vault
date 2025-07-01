
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  ShoppingCart, 
  Clock, 
  Star, 
  Gift, 
  Users, 
  TrendingUp, 
  Award,
  Ticket,
  Calendar,
  DollarSign,
  Target
} from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const nextDrawDate = new Date();
  nextDrawDate.setDate(nextDrawDate.getDate() + 15);

  const userStats = {
    totalPurchases: 15,
    totalSpent: 234.50,
    entriesThisMonth: 8,
    totalEntries: 23,
    winStreak: 0,
    lastPurchase: "2024-01-15"
  };

  const myEntries = [
    { id: 1, code: "YKD-2024-001234", date: "2024-01-15", product: "زجاجة مياه مميزة", amount: 15.99 },
    { id: 2, code: "YKD-2024-001189", date: "2024-01-12", product: "مشروب الطاقة", amount: 12.99 },
    { id: 3, code: "YKD-2024-001156", date: "2024-01-10", product: "قهوة حرفية", amount: 18.99 },
  ];

  const upcomingDraws = [
    { id: 1, prize: "تسلا موديل ٣", date: nextDrawDate, entries: 2, totalPool: 1247 },
    { id: 2, prize: "آيفون ١٥ برو ماكس", date: new Date(2024, 1, 15), entries: 0, totalPool: 856 },
    { id: 3, prize: "١٠٠٠٠ دولار نقداً", date: new Date(2024, 2, 15), entries: 0, totalPool: 432 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 font-tajawal">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/20 backdrop-blur-md border-b border-white/30 relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Yaa Khoodeh Draw
              </h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                الرئيسية
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                لوحة التحكم
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">لوحة التحكم</h1>
          <p className="text-white/80 text-lg drop-shadow-md">تتبع مشاركاتك وفرصك في الفوز</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
              { id: 'entries', label: 'مشاركاتي', icon: Ticket },
              { id: 'draws', label: 'السحوبات', icon: Trophy },
              { id: 'purchases', label: 'مشترياتي', icon: ShoppingCart }
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id 
                    ? 'bg-white/30 backdrop-blur-md text-white' 
                    : 'bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20'
                } border border-white/30 transition-all`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">المشاركات هذا الشهر</p>
                      <p className="text-2xl font-bold text-white">{userStats.entriesThisMonth}</p>
                    </div>
                    <Ticket className="w-8 h-8 text-yellow-300" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">إجمالي الإنفاق</p>
                      <p className="text-2xl font-bold text-white">${userStats.totalSpent}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-300" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">إجمالي المشاركات</p>
                      <p className="text-2xl font-bold text-white">{userStats.totalEntries}</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-300" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">الجوائز المكتسبة</p>
                      <p className="text-2xl font-bold text-white">0</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-300" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Draw */}
            <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-300" />
                  السحب القادم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">تسلا موديل ٣</h3>
                    <p className="text-white/80 mb-4">قيمة الجائزة: ٤٥٠٠٠ دولار</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-white/70">
                        <span>مشاركاتك</span>
                        <span>٨ من ١٢٤٧</span>
                      </div>
                      <Progress value={0.64} className="bg-white/20" />
                      <p className="text-xs text-white/60">فرصتك: ٠.٦٤%</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 mb-2">الوقت المتبقي</p>
                    <CountdownTimer targetDate={nextDrawDate} />
                    <Button className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      زيد فرصتك
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Entries Tab */}
        {activeTab === 'entries' && (
          <div className="space-y-6">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">مشاركاتي الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myEntries.map((entry) => (
                    <div key={entry.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-mono text-sm text-yellow-300">{entry.code}</p>
                          <p className="text-white font-medium">{entry.product}</p>
                          <p className="text-white/70 text-sm">{entry.date}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold">${entry.amount}</p>
                          <Badge className="bg-green-500/20 text-green-300 border border-green-400/30">
                            نشط
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Draws Tab */}
        {activeTab === 'draws' && (
          <div className="space-y-6">
            <div className="grid gap-6">
              {upcomingDraws.map((draw) => (
                <Card key={draw.id} className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{draw.prize}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-white/70">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{draw.date.toLocaleDateString('ar-SA')}</span>
                          </div>
                          <div className="flex items-center text-white/70">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{draw.totalPool.toLocaleString('ar-SA')} مشارك</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-white/70 text-sm">مشاركاتك</p>
                        <p className="text-2xl font-bold text-yellow-300">{draw.entries}</p>
                        {draw.entries === 0 && (
                          <Button size="sm" className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600">
                            اشترك الآن
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">تاريخ المشتريات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myEntries.map((purchase) => (
                    <div key={purchase.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">{purchase.product}</p>
                          <p className="text-white/70 text-sm">{purchase.date}</p>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold">${purchase.amount}</p>
                          <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30">
                            مكتمل
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">الإجمالي</span>
                    <span className="text-xl font-bold text-yellow-300">${userStats.totalSpent}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

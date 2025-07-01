
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { User, Settings, Gift, Trophy, Star } from 'lucide-react';

interface UserData {
  displayName?: string;
  email?: string;
  loyaltyPoints: number;
  membershipLevel: string;
  totalPurchases: number;
  campaignsWon: number;
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    loyaltyPoints: 1250,
    membershipLevel: 'Silver',
    totalPurchases: 15,
    campaignsWon: 2
  });

  const getMembershipColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'blue': return 'bg-blue-500';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-500';
      case 'platinum': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Summary */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <CardTitle>{user?.displayName || user?.email?.split('@')[0]}</CardTitle>
              <Badge className={`${getMembershipColor(userData.membershipLevel)} text-white`}>
                {userData.membershipLevel} Member
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>نقاط الولاء</span>
                <span className="font-bold text-yellow-600">{userData.loyaltyPoints}</span>
              </div>
              <div className="flex justify-between">
                <span>إجمالي المشتريات</span>
                <span className="font-bold">{userData.totalPurchases}</span>
              </div>
              <div className="flex justify-between">
                <span>الحملات التي فزت بها</span>
                <span className="font-bold text-green-600">{userData.campaignsWon}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Gift className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold">نقاط الولاء</h3>
                <p className="text-2xl font-bold text-yellow-600">{userData.loyaltyPoints}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-gold-500" />
                <h3 className="font-semibold">الانتصارات</h3>
                <p className="text-2xl font-bold text-green-600">{userData.campaignsWon}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-semibold">مستوى العضوية</h3>
                <p className="text-lg font-bold">{userData.membershipLevel}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <h3 className="font-semibold">إجمالي المشتريات</h3>
                <p className="text-2xl font-bold">{userData.totalPurchases}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="loyalty">نقاط الولاء</TabsTrigger>
            <TabsTrigger value="campaigns">حملاتي</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>نظرة عامة على الحساب</CardTitle>
              </CardHeader>
              <CardContent>
                <p>مرحباً بك في ملفك الشخصي! هنا يمكنك إدارة حسابك ومراجعة نشاطك.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty">
            <Card>
              <CardHeader>
                <CardTitle>نقاط الولاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>رصيدك الحالي: <span className="font-bold text-yellow-600">{userData.loyaltyPoints} نقطة</span></p>
                  <p>يمكنك استخدام نقاط الولاء للحصول على خصومات في المشتريات القادمة.</p>
                  <Button>استبدال النقاط</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>حملاتي</CardTitle>
              </CardHeader>
              <CardContent>
                <p>إجمالي الحملات المشارك فيها: {userData.totalPurchases}</p>
                <p>إجمالي الحملات التي فزت بها: {userData.campaignsWon}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" value={user?.email || ''} disabled />
                </div>
                <div>
                  <Label htmlFor="name">الاسم</Label>
                  <Input id="name" value={user?.displayName || ''} />
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;

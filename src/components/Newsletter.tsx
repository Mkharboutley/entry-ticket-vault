
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribed(true);
    toast({
      title: "تم الاشتراك بنجاح!",
      description: "سنرسل لك آخر الأخبار والعروض",
    });
    setEmail('');
  };

  if (isSubscribed) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <Bell className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            شكراً لك على الاشتراك!
          </h3>
          <p className="text-green-700">
            ستصلك رسائل بآخر الحملات والعروض الجديدة
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="text-center">
        <Mail className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <CardTitle className="text-xl text-blue-800">
          اشترك في النشرة الإخبارية
        </CardTitle>
        <p className="text-blue-700">
          احصل على آخر الأخبار والعروض الحصرية
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              اشترك
            </Button>
          </div>
          <p className="text-xs text-gray-600 text-center">
            بالاشتراك، أنت توافق على تلقي رسائل بريد إلكتروني تسويقية
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default Newsletter;

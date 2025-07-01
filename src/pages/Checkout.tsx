
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Shield, Gift, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const cartItems = [
    {
      id: 1,
      name: "زجاجة مياه مميزة",
      price: 15.99,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    toast({
      title: "تم الدفع بنجاح!",
      description: "لقد تم إدراجك في سحب الجوائز لهذا الشهر!",
      duration: 5000,
    });

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 py-8 font-tajawal relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse backdrop-blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000 backdrop-blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300/15 rounded-full blur-3xl animate-pulse delay-2000 backdrop-blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" className="ml-4 text-white hover:bg-white/20 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للمتجر
          </Button>
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">الدفع الآمن</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <Card className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <div className="w-8 h-8 bg-blue-100/20 backdrop-blur-sm rounded-full flex items-center justify-center ml-3 border border-white/30">
                      <span className="text-white font-semibold">١</span>
                    </div>
                    معلومات الاتصال
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white/90">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white/90">الاسم الأول</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white/90">الاسم الأخير</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <div className="w-8 h-8 bg-blue-100/20 backdrop-blur-sm rounded-full flex items-center justify-center ml-3 border border-white/30">
                      <span className="text-white font-semibold">٢</span>
                    </div>
                    عنوان الشحن
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-white/90">عنوان الشارع</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-white/90">المدينة</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-white/90">الرمز البريدي</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <div className="w-8 h-8 bg-blue-100/20 backdrop-blur-sm rounded-full flex items-center justify-center ml-3 border border-white/30">
                      <span className="text-white font-semibold">٣</span>
                    </div>
                    معلومات الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-white/90">رقم البطاقة</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="text-white/90">تاريخ الانتهاء</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-white/90">رمز الأمان</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/60"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg shadow-2xl backdrop-blur-xl border border-white/10"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جاري معالجة الدفع...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 ml-2" />
                    إتمام الشراء والدخول في السحب
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 space-x-reverse">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white">{item.name}</p>
                      <p className="text-white/60 text-xs">الكمية: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-white">${item.price}</p>
                  </div>
                ))}

                <Separator className="bg-white/20" />

                {/* Prize Entry Highlight */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-400/30 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <Gift className="w-4 h-4 text-green-300 ml-2" />
                    <span className="font-semibold text-green-200">مكافأة مضمنة</span>
                  </div>
                  <p className="text-sm text-green-100">
                    🎉 مشاركة مجانية في سحب تسلا موديل ٣ الشهري!
                  </p>
                </div>

                <Separator className="bg-white/20" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/80">
                    <span>المجموع الفرعي</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/80">
                    <span>الضريبة</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/20 text-white">
                    <span>الإجمالي</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center text-sm text-white/70">
                    <Shield className="w-4 h-4 ml-2" />
                    <span>تشفير آمن ٢٥٦ بت SSL</span>
                  </div>
                  <div className="flex items-center text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 ml-2" />
                    <span>ضمان استرداد الأموال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

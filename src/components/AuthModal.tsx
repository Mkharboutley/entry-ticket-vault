
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          // Handle specific error messages
          let errorMessage = error.message;
          if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.';
          } else if (error.message.includes('Email not confirmed')) {
            errorMessage = 'يرجى تأكيد بريدك الإلكتروني أولاً.';
          }
          throw new Error(errorMessage);
        }
        toast({
          title: "تم تسجيل الدخول بنجاح!",
          description: "أهلاً بك في Yaa Khoodeh Draw",
        });
        onClose();
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await signUp(email, password, { 
          full_name: fullName,
          emailRedirectTo: redirectUrl 
        });
        if (error) {
          // Handle specific error messages
          let errorMessage = error.message;
          if (error.message.includes('User already registered')) {
            errorMessage = 'هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول.';
          } else if (error.message.includes('Password should be at least')) {
            errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
          } else if (error.message.includes('Invalid email')) {
            errorMessage = 'البريد الإلكتروني غير صالح.';
          }
          throw new Error(errorMessage);
        }
        toast({
          title: "تم إنشاء الحساب بنجاح!",
          description: "يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب",
        });
        onClose();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "خطأ في المصادقة",
        description: error.message || 'حدث خطأ غير متوقع',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-gray-900">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="fullName" className="text-gray-700">الاسم الكامل</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 focus:border-blue-500"
                placeholder="أدخل اسمك الكامل"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email" className="text-gray-700">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/90 backdrop-blur-sm border border-gray-200 focus:border-blue-500"
              placeholder="أدخل بريدك الإلكتروني"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700">كلمة المرور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/90 backdrop-blur-sm border border-gray-200 focus:border-blue-500"
              placeholder="أدخل كلمة المرور"
              minLength={6}
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 mt-1">كلمة المرور يجب أن تكون 6 أحرف على الأقل</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                جاري المعالجة...
              </>
            ) : (
              isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'ليس لديك حساب؟ أنشئ واحداً' : 'لديك حساب؟ سجل الدخول'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

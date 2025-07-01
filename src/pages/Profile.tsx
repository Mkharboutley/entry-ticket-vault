
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للرئيسية
            </Button>
            
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="Yaa Khoodeh Draw" className="h-10 w-auto" />
              <h1 className="text-2xl font-bold text-white">الملف الشخصي</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <UserProfile />
    </div>
  );
};

export default Profile;

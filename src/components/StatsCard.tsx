
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  description: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, description, className }) => {
  return (
    <Card className={cn("border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 font-tajawal", className)}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-3">
          <div className="p-2 rounded-lg bg-white/50">
            {icon}
          </div>
          <h3 className="font-semibold text-gray-700">{title}</h3>
        </div>
        <div className="mb-2">
          <div className="text-2xl font-bold text-gray-900">
            {value}
          </div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

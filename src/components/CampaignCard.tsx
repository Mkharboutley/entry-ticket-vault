
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    prizeValue: number;
    drawDate: string;
    totalTickets: number;
    soldTickets: number;
    status: 'active' | 'sold_out' | 'completed';
    image: string;
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { convertPrice } = useCurrency();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'sold_out': return 'bg-red-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'sold_out': return 'نفدت التذاكر';
      case 'completed': return 'انتهت';
      default: return 'غير معروف';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={campaign.image || '/placeholder.svg'} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <Badge className={`absolute top-3 right-3 ${getStatusColor(campaign.status)} text-white`}>
          {getStatusText(campaign.status)}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl">{campaign.title}</CardTitle>
        <p className="text-gray-600 text-sm">{campaign.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-yellow-600">
              {convertPrice(campaign.prizeValue)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              {campaign.soldTickets}/{campaign.totalTickets}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>تاريخ السحب: {new Date(campaign.drawDate).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${(campaign.soldTickets / campaign.totalTickets) * 100}%` }}
          />
        </div>

        <Button 
          className="w-full" 
          disabled={campaign.status === 'sold_out' || campaign.status === 'completed'}
        >
          {campaign.status === 'active' ? 'شارك في الحملة' : 'غير متاح'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;

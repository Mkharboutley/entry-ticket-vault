
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewSection: React.FC = () => {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'أحمد محمد',
      rating: 5,
      comment: 'تجربة رائعة! وصلني المنتج بسرعة وجودة ممتازة.',
      date: '2024-01-15'
    },
    {
      id: '2',
      userName: 'فاطمة أحمد',
      rating: 4,
      comment: 'منصة موثوقة وسهلة الاستخدام.',
      date: '2024-01-12'
    }
  ]);

  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى كتابة تعليق",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "شكراً لك!",
      description: "تم إرسال تقييمك بنجاح",
    });

    setNewReview({ rating: 5, comment: '' });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>التقييمات والمراجعات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Review */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">أضف تقييمك</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">التقييم</label>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview({ ...newReview, rating })
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">التعليق</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="اكتب تجربتك مع المنتج أو الخدمة..."
                  rows={3}
                />
              </div>
              <Button onClick={handleSubmitReview}>إرسال التقييم</Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">التقييمات السابقة</h3>
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{review.userName}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSection;

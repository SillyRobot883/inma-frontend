import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Calendar, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

function EventsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const filter = searchParams.get('filter');

  useEffect(() => {
    if (filter === 'registered' && !isAuthenticated) {
      navigate('/login', {
        state: { from: { pathname: '/events', search: '?filter=registered' } },
        replace: true,
      });
    }
  }, [filter, isAuthenticated, navigate]);

  const isShowingRegisteredEvents = filter === 'registered' && isAuthenticated;

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-trust-blue text-3xl font-bold">
            {isShowingRegisteredEvents ? 'فعالياتي المسجلة' : 'الفعاليات'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isShowingRegisteredEvents
              ? 'الفعاليات التي سجلت بها مسبقاً'
              : 'اكتشف وشارك في الفعاليات الطلابية المتنوعة'}
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </div>

      {isShowingRegisteredEvents ? (
        // Registered Events View
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-trust-blue flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                فعالياتي المسجلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                لم تقم بالتسجيل في أي فعاليات بعد. تصفح الفعاليات المتاحة وسجل الآن!
              </p>
              <Button
                className="bg-trust-blue hover:bg-trust-blue/90 mt-4"
                onClick={() => navigate('/events')}
              >
                تصفح الفعاليات
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        // All Events View
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-trust-blue flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                ورشة تطوير الويب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                تعلم أساسيات تطوير المواقع الإلكترونية باستخدام أحدث التقنيات
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span>15 يونيو 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الوقت:</span>
                  <span>2:00 - 5:00 مساءً</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المكان:</span>
                  <span>قاعة 101</span>
                </div>
              </div>
              <Button className="bg-growth-green hover:bg-growth-green/90 mt-4 w-full">
                سجل الآن
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-trust-blue flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                ملتقى ريادة الأعمال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                لقاء مع رواد الأعمال الناجحين لمشاركة خبراتهم وتجاربهم
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span>20 يونيو 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الوقت:</span>
                  <span>6:00 - 8:00 مساءً</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المكان:</span>
                  <span>المسرح الرئيسي</span>
                </div>
              </div>
              <Button className="bg-growth-green hover:bg-growth-green/90 mt-4 w-full">
                سجل الآن
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-trust-blue flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                دورة الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                مقدمة شاملة في الذكاء الاصطناعي وتطبيقاته العملية
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span>25 يونيو 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الوقت:</span>
                  <span>10:00 ص - 12:00 ظ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المكان:</span>
                  <span>مختبر الحاسوب</span>
                </div>
              </div>
              <Button className="bg-growth-green hover:bg-growth-green/90 mt-4 w-full">
                سجل الآن
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default EventsPage;

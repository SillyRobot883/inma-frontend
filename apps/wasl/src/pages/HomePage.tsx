import { useNavigate } from 'react-router-dom';

import { CalendarCheck, Trophy, Users } from 'lucide-react';

import CategoryCard from '@/components/common/CategoryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col gap-12 pb-12">
      <section className="from-trust-blue to-excellence-navy w-full bg-gradient-to-r py-12 text-white md:py-24 lg:py-32">
        <div className="container mx-auto flex max-w-6xl flex-col items-center space-y-4 px-4 text-center md:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold tracking-tighter text-white md:text-5xl">
            وصل - منصة فعاليات الجامعة
          </h1>
          <p className="max-w-[700px] text-lg text-white/90 md:text-xl">
            اكتشف وشارك في الفعاليات الطلابية وانضم إلى الأندية الجامعية في مكان واحد
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {isAuthenticated ? (
              <>
                <Button
                  size="lg"
                  className="bg-growth-green hover:bg-growth-green/90 text-white"
                  onClick={() => navigate('/events')}
                >
                  <CalendarCheck className="ml-2 h-5 w-5" />
                  استكشف الفعاليات
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => navigate('/clubs')}
                >
                  <Users className="ml-2 h-5 w-5" />
                  تصفح الأندية الطلابية
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="bg-growth-green hover:bg-growth-green/90 text-white"
                onClick={() => navigate('/login')}
              >
                ابدأ الآن
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-muted w-full py-12">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-6">
                <div className="bg-growth-green/20 mb-4 rounded-full p-3">
                  <CalendarCheck className="text-growth-green h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">+200</h3>
                <p className="text-muted-foreground">فعالية سنوياً</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-6">
                <div className="bg-trust-blue/20 mb-4 rounded-full p-3">
                  <Users className="text-trust-blue h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">+50</h3>
                <p className="text-muted-foreground">نادي طلابي نشط</p>
              </CardContent>
            </Card>
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center p-6">
                <div className="bg-secondary-blue/20 mb-4 rounded-full p-3">
                  <Trophy className="text-secondary-blue h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold">+4000</h3>
                <p className="text-muted-foreground">طالب مشارك</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">تصنيفات الفعاليات</h2>
          <p className="text-muted-foreground">استكشف الفعاليات حسب التصنيف</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { key: 'bootcamp', label: 'معسكر تدريبي' },
            { key: 'workshop', label: 'ورشة عمل' },
            { key: 'meeting', label: 'اجتماع' },
            { key: 'hackathon', label: 'هاكاثون' },
            { key: 'seminar', label: 'ندوة' },
            { key: 'conference', label: 'مؤتمر' },
            { key: 'networking', label: 'تواصل' },
          ].map((category) => (
            <div
              key={category.key}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
            >
              <CategoryCard
                category={category.label}
                onClick={() => navigate(`/events?category=${category.key}`)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

import { Search, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ClubsPage() {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-trust-blue text-3xl font-bold">الأندية الطلابية</h1>
          <p className="text-muted-foreground mt-2">
            اكتشف الأندية الطلابية وانضم للأنشطة التي تهمك
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Search className="h-4 w-4" />
          بحث
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder clubs */}
        <Card className="border-trust-blue/20 hover:border-trust-blue/40 transition-colors">
          <CardHeader>
            <CardTitle className="text-trust-blue flex items-center gap-2">
              <Users className="h-5 w-5" />
              نادي البرمجة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              نادي متخصص في تطوير البرمجيات وتعلم لغات البرمجة المختلفة
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الأعضاء:</span>
                <span>156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفئة:</span>
                <span>تقنية</span>
              </div>
            </div>
            <Button className="bg-trust-blue hover:bg-trust-blue/90 mt-4 w-full">
              انضم للنادي
            </Button>
          </CardContent>
        </Card>

        <Card className="border-secondary-blue/20 hover:border-secondary-blue/40 transition-colors">
          <CardHeader>
            <CardTitle className="text-trust-blue flex items-center gap-2">
              <Users className="h-5 w-5" />
              نادي ريادة الأعمال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              نادي يهتم بتطوير مهارات ريادة الأعمال والابتكار
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الأعضاء:</span>
                <span>89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفئة:</span>
                <span>أعمال</span>
              </div>
            </div>
            <Button className="bg-trust-blue hover:bg-trust-blue/90 mt-4 w-full">
              انضم للنادي
            </Button>
          </CardContent>
        </Card>

        <Card className="border-growth-green/20 hover:border-growth-green/40 transition-colors">
          <CardHeader>
            <CardTitle className="text-trust-blue flex items-center gap-2">
              <Users className="h-5 w-5" />
              نادي التطوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              نادي مخصص للأنشطة التطوعية وخدمة المجتمع
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الأعضاء:</span>
                <span>203</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفئة:</span>
                <span>تطوع</span>
              </div>
            </div>
            <Button className="bg-trust-blue hover:bg-trust-blue/90 mt-4 w-full">
              انضم للنادي
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ClubsPage;

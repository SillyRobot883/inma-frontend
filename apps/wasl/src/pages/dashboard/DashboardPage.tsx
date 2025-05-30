import { BarChart3, Calendar, Settings, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="from-excellence-navy to-trust-blue rounded-lg bg-gradient-to-r p-6 text-white">
        <h1 className="mb-2 text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-white/90">مرحباً {user?.displayName} - مشرف النظام</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">+10% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفعاليات النشطة</CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-muted-foreground text-xs">+5 فعاليات جديدة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الأندية المسجلة</CardTitle>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-muted-foreground text-xs">عبر الجامعة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المراجعات المعلقة</CardTitle>
            <Settings className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-muted-foreground text-xs">تحتاج مراجعة</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ميزات لوحة التحكم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-dashed p-4 text-center">
              <Calendar className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <h3 className="font-medium">إدارة الفعاليات</h3>
              <p className="text-muted-foreground text-sm">إنشاء وتعديل الفعاليات</p>
            </div>
            <div className="rounded-lg border border-dashed p-4 text-center">
              <Users className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <h3 className="font-medium">إدارة المستخدمين</h3>
              <p className="text-muted-foreground text-sm">مراجعة وإدارة الحسابات</p>
            </div>
            <div className="rounded-lg border border-dashed p-4 text-center">
              <BarChart3 className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <h3 className="font-medium">التقارير والإحصائيات</h3>
              <p className="text-muted-foreground text-sm">تحليلات مفصلة للنشاط</p>
            </div>
            <div className="rounded-lg border border-dashed p-4 text-center">
              <Settings className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
              <h3 className="font-medium">إعدادات النظام</h3>
              <p className="text-muted-foreground text-sm">تكوين إعدادات المنصة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPage;

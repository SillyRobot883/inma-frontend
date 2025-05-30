import { useNavigate } from 'react-router-dom';

import { Mail, Trophy } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  displayName?: string;
  email?: string;
  profileImage?: string;
  uniId?: string;
  phoneNumber?: string;
  globalRole?: string;
}

type EventStatusType = 'upcoming' | 'ongoing' | 'registration_open' | 'completed' | 'cancelled';

interface UserEvent {
  id: number;
  eventEnd: string;
  eventStart: string;
  status: EventStatusType;
}

interface ProfileSidebarProps {
  user: User | null;
  completedEvents: UserEvent[];
  registeredEvents: UserEvent[];
  myClubs: { id: number }[];
}

export function ProfileSidebar({
  user,
  completedEvents,
  registeredEvents,
  myClubs,
}: ProfileSidebarProps) {
  const navigate = useNavigate();

  const getUserRoleLabel = (role?: string) => {
    switch (role) {
      case 'INMA_ADMIN':
        return 'مشرف إنماء';
      case 'UNI_ADMIN':
        return 'مشرف جامعة';
      case 'SUPERVISOR':
        return 'مشرف';
      default:
        return 'مستخدم';
    }
  };

  const calculateTotalHours = () => {
    return completedEvents.reduce(
      (total, event) =>
        total +
        Math.ceil(
          (new Date(event.eventEnd).getTime() - new Date(event.eventStart).getTime()) /
            (1000 * 60 * 60)
        ),
      0
    );
  };

  return (
    <div className="space-y-6 lg:order-1">
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.profileImage} alt={user?.displayName} />
              <AvatarFallback className="bg-trust-blue text-xl text-white">
                {user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold">{user?.displayName}</h3>
            <p className="text-muted-foreground mt-1 flex items-center justify-center gap-1 text-sm">
              <Mail className="h-3 w-3" />
              {user?.email}
            </p>
          </div>

          <div className="mb-4 space-y-3">
            {user?.uniId && (
              <div className="text-center">
                <p className="text-muted-foreground text-xs">الرقم الجامعي</p>
                <p className="text-sm font-medium">{user.uniId}</p>
              </div>
            )}
            <div className="text-center">
              <p className="text-muted-foreground text-xs">رقم الهاتف</p>
              <p className="text-sm font-medium">{user?.phoneNumber}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1 text-xs">نوع الحساب</p>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {getUserRoleLabel(user?.globalRole)}
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => navigate('/settings')}>
            تعديل الملف الشخصي
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            إحصائياتي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">الفعاليات المكتملة</span>
              <span className="font-medium">{completedEvents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الفعاليات القادمة</span>
              <span className="font-medium">{registeredEvents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الأندية المنضمة</span>
              <span className="font-medium">{myClubs.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ساعات المشاركة</span>
              <span className="font-medium">{calculateTotalHours()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

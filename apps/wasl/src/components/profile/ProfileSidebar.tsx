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
      {/* Profile Card */}
      <Card className="border-trust-blue/30 from-trust-blue/5 to-excellence-navy/5 bg-gradient-to-br">
        <CardContent className="pt-6">
          <div className="mb-6 flex justify-center">
            <Avatar className="ring-3 ring-trust-blue/30 h-24 w-24">
              <AvatarImage src={user?.profileImage} alt={user?.displayName} />
              <AvatarFallback className="bg-trust-blue/15 text-trust-blue text-2xl font-bold">
                {user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-trust-blue text-xl font-bold">{user?.displayName}</h2>
            <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
              <Mail className="text-trust-blue/70 h-4 w-4" />
              {user?.email}
            </p>
          </div>

          <div className="mb-6 space-y-4">
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
              <p className="text-muted-foreground mb-2 text-xs">نوع الحساب</p>
              <span className="bg-trust-blue/15 text-trust-blue inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                {getUserRoleLabel(user?.globalRole)}
              </span>
            </div>
          </div>

          <Button
            className="bg-trust-blue hover:bg-trust-blue/90 w-full text-white"
            onClick={() => navigate('/settings')}
          >
            تعديل الملف الشخصي
          </Button>
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <Card className="border-trust-blue/30 border-l-trust-blue border-l-4">
        <CardHeader>
          <CardTitle className="text-trust-blue flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            إحصائياتي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">الفعاليات المكتملة</span>
              <span className="text-growth-green font-medium">{completedEvents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الفعاليات القادمة</span>
              <span className="text-secondary-blue font-medium">{registeredEvents.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الأندية المنضمة</span>
              <span className="text-trust-blue font-medium">{myClubs.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ساعات المشاركة</span>
              <span className="text-excellence-navy font-medium">{calculateTotalHours()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

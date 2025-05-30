import { Calendar, Users } from 'lucide-react';

import { ClubsList } from '@/components/profile/ClubsList';
import { EventsList } from '@/components/profile/EventsList';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

type EventStatusType = 'upcoming' | 'ongoing' | 'registration_open' | 'completed' | 'cancelled';
type EventRegistrationStatusType = 'pending' | 'accepted' | 'rejected';

interface UserEvent {
  id: number;
  uuid: string;
  name: string;
  location: string;
  eventStart: string;
  eventEnd: string;
  club: {
    name: string;
  };
  status: EventStatusType;
  registrationStatus?: EventRegistrationStatusType;
}

interface UserClub {
  id: number;
  name: string;
  role: 'CLUB_ADMIN' | 'HR' | 'MEMBER';
}

function ProfilePage() {
  const { user } = useAuth();

  const registeredEvents: UserEvent[] = [
    {
      id: 1,
      uuid: 'event-1',
      name: 'ورشة تطوير الويب',
      location: 'قاعة 101',
      eventStart: '2025-06-02T14:00:00Z',
      eventEnd: '2025-06-02T17:00:00Z',
      club: { name: 'نادي البرمجة' },
      status: 'upcoming',
      registrationStatus: 'accepted',
    },
    {
      id: 2,
      uuid: 'event-2',
      name: 'لقاء ريادة الأعمال',
      location: 'قاعة 205',
      eventStart: '2025-06-05T16:00:00Z',
      eventEnd: '2025-06-05T18:00:00Z',
      club: { name: 'نادي ريادة الأعمال' },
      status: 'upcoming',
      registrationStatus: 'accepted',
    },
  ];

  const completedEvents: UserEvent[] = [
    {
      id: 3,
      uuid: 'event-3',
      name: 'ورشة تصميم الجرافيك',
      location: 'معمل التصميم',
      eventStart: '2025-05-15T14:00:00Z',
      eventEnd: '2025-05-15T17:00:00Z',
      club: { name: 'نادي التصميم' },
      status: 'completed',
    },
    {
      id: 4,
      uuid: 'event-4',
      name: 'مؤتمر الذكاء الاصطناعي',
      location: 'القاعة الكبرى',
      eventStart: '2025-05-01T10:00:00Z',
      eventEnd: '2025-05-01T16:00:00Z',
      club: { name: 'نادي التقنية' },
      status: 'completed',
    },
  ];

  const myClubs: UserClub[] = [
    { id: 1, name: 'نادي البرمجة', role: 'MEMBER' },
    { id: 2, name: 'نادي ريادة الأعمال', role: 'MEMBER' },
  ];

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <ProfileHeader user={user} />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:order-2 lg:col-span-3">
          <Tabs defaultValue="registered" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">سجل الفعاليات</TabsTrigger>
              <TabsTrigger value="registered">فعالياتي المسجلة</TabsTrigger>
            </TabsList>

            <TabsContent value="registered" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    فعالياتي المسجلة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventsList events={registeredEvents} type="registered" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    سجل الفعاليات المكتملة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventsList events={completedEvents} type="completed" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                أنديتي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClubsList clubs={myClubs} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:order-1">
          <ProfileSidebar
            user={user}
            completedEvents={completedEvents}
            registeredEvents={registeredEvents}
            myClubs={myClubs}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

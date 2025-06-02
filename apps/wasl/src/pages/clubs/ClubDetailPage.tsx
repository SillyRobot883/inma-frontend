import { Link, useParams } from 'react-router-dom';

import { MembershipStatus } from '@inmaa-wasl/api-client';
import { ArrowLeft, Calendar, Clock, ExternalLink, MapPin, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';

import { ClubDetailSkeleton, EventCardSkeleton } from '@/components/common/ClubDetailSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useJoinClub, useLeaveClub, useUserMembershipStatus } from '@/hooks/useClubMembership';
import { useClubDetails } from '@/hooks/useClubs';
import { useClubEvents } from '@/hooks/useEvents';
import { formatArabicDate, formatArabicTime } from '@/lib/utils';

export function ClubDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();

  const { data: club, isLoading: clubLoading, error: clubError } = useClubDetails(id!);

  const {
    data: clubEvents = [],
    isLoading: eventsLoading,
    error: eventsError,
  } = useClubEvents(id!);

  // Membership hooks
  const joinClubMutation = useJoinClub();
  const leaveClubMutation = useLeaveClub();
  const {
    isMember,
    membershipStatus,
    isLoading: membershipLoading,
  } = useUserMembershipStatus(id!, user?.uuid);

  const handleJoinClub = () => {
    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول للانضمام للنادي');
      return;
    }
    joinClubMutation.mutate(id!);
  };

  const handleLeaveClub = () => {
    if (!isAuthenticated) {
      toast.error('يجب تسجيل الدخول أولاً');
      return;
    }
    leaveClubMutation.mutate(id!);
  };

  if (clubLoading) {
    return <ClubDetailSkeleton />;
  }

  if (clubError) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">خطأ في تحميل تفاصيل النادي</h2>
          <p className="mb-6 text-gray-600">
            {clubError.message || 'حدث خطأ غير متوقع أثناء تحميل بيانات النادي'}
          </p>
          <Link to="/clubs">
            <Button variant="outline">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة للأندية
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-600">النادي غير موجود</h2>
          <p className="mb-6 text-gray-500">لم يتم العثور على النادي المطلوب</p>
          <Link to="/clubs">
            <Button variant="outline">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة للأندية
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نادي نشط</Badge>;
      case 'inactive':
        return <Badge variant="secondary">نادي غير نشط</Badge>;
      case 'archived':
        return <Badge variant="destructive">نادي مؤرشف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'specialized':
        return <Badge className="bg-blue-100 text-blue-800">نادي متخصص</Badge>;
      case 'general':
        return <Badge className="bg-purple-100 text-purple-800">نادي عام</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Link to="/clubs" className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900">
        <ArrowLeft className="ml-2 h-4 w-4" />
        العودة للأندية
      </Link>

      {/* Club Header */}
      <div className="from-trust-blue/5 to-trust-blue/10 relative overflow-hidden rounded-lg border bg-gradient-to-r p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Club Logo */}
          <div className="flex-shrink-0">
            <div className="h-24 w-24 overflow-hidden rounded-xl border-2 border-white shadow-md">
              <img
                src={club.logo}
                alt={club.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center';
                }}
              />
            </div>
          </div>

          {/* Club Info */}
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-start gap-2">
              <h1 className="text-trust-blue text-2xl font-bold md:text-3xl">{club.name}</h1>
              {getStatusBadge(club.status)}
              {getTypeBadge(club.type)}
            </div>

            <p className="mb-4 text-lg text-gray-600">{club.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {club.foundingDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>تأسس في {formatArabicDate(club.foundingDate)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>آخر تحديث {formatArabicDate(club.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Join/Leave Club Button */}
          {isAuthenticated && (
            <div className="flex-shrink-0">
              {membershipLoading ? (
                <Button disabled>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  جاري التحقق...
                </Button>
              ) : isMember ? (
                <div className="space-y-2">
                  <div className="text-center">
                    <Badge
                      variant={
                        membershipStatus === MembershipStatus.ACTIVE ? 'default' : 'secondary'
                      }
                      className="mb-2"
                    >
                      {membershipStatus === MembershipStatus.ACTIVE && 'عضو نشط'}
                      {membershipStatus === MembershipStatus.PENDING && 'في انتظار الموافقة'}
                      {membershipStatus === MembershipStatus.INACTIVE && 'عضوية معطلة'}
                      {membershipStatus === MembershipStatus.DENIED && 'مرفوض'}
                    </Badge>
                  </div>
                  {membershipStatus === MembershipStatus.ACTIVE && (
                    <Button
                      variant="outline"
                      onClick={handleLeaveClub}
                      disabled={leaveClubMutation.isPending}
                    >
                      {leaveClubMutation.isPending ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                          جاري المغادرة...
                        </>
                      ) : (
                        'مغادرة النادي'
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleJoinClub}
                  disabled={joinClubMutation.isPending}
                  className="bg-trust-blue hover:bg-trust-blue/90"
                >
                  {joinClubMutation.isPending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      جاري الانضمام...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      انضم للنادي
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Club Events Section */}
      <div className="mt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">فعاليات النادي</h2>
          <Link to={`/events?clubId=${club.uuid}`}>
            <Button variant="outline" size="sm">
              <ExternalLink className="ml-2 h-4 w-4" />
              عرض جميع الفعاليات
            </Button>
          </Link>
        </div>

        {eventsLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : eventsError ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">خطأ في تحميل فعاليات النادي</p>
            </CardContent>
          </Card>
        ) : Array.isArray(clubEvents) && clubEvents.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">لا توجد فعاليات</h3>
              <p className="text-gray-500">لم يتم إنشاء أي فعاليات لهذا النادي بعد</p>
            </CardContent>
          </Card>
        ) : Array.isArray(clubEvents) ? (
          <div className="grid gap-4 md:grid-cols-2">
            {clubEvents.slice(0, 4).map((event) => (
              <Link key={event.uuid} to={`/events/${event.uuid}`}>
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-2 text-lg">{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-600">{event.description}</p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatArabicDate(event.eventStart)}</span>
                        <span>{formatArabicTime(event.eventStart)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.seatsRemaining} مقعد متاح من أصل {event.seatsAvailable}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">خطأ في تحميل فعاليات النادي</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  AlertCircle,
  ArrowLeft,
  Bell,
  BellOff,
  Bookmark,
  Calendar,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Facebook,
  Heart,
  Linkedin,
  MapPin,
  Share2,
  Twitter,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

import { EventDetailSkeleton } from '@/components/events/EventDetailSkeleton';
import { useRegisterForEvent, useUnregisterFromEvent } from '@/hooks/useEventMutations';
import { useEventDetails, useEvents } from '@/hooks/useEvents';
import {
  getCategoryColor,
  getCategoryLabel,
  getStatusColor,
  getStatusLabel,
} from '@/lib/translations';
import { formatArabicDate, formatArabicTime } from '@/lib/utils';

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // API hooks
  const { data: event, isLoading: isLoadingEvent, error: eventError } = useEventDetails(id || '');

  const { data: allEvents = [] } = useEvents();

  const relatedEvents =
    Array.isArray(allEvents) && event
      ? allEvents.filter((e) => e.category === event.category && e.uuid !== event.uuid).slice(0, 3)
      : [];

  const registerMutation = useRegisterForEvent({
    onSuccess: () => {
      toast.success('تم التسجيل بنجاح!', {
        description: 'ستتلقى رسالة تأكيد عبر البريد الإلكتروني',
      });
    },
    onError: (error) => {
      toast.error('خطأ في التسجيل', {
        description: error.message || 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.',
      });
    },
  });

  const unregisterMutation = useUnregisterFromEvent({
    onSuccess: () => {
      toast.success('تم إلغاء التسجيل بنجاح');
    },
    onError: (error) => {
      toast.error('خطأ في إلغاء التسجيل', {
        description: error.message || 'حدث خطأ أثناء إلغاء التسجيل.',
      });
    },
  });

  // Loading state
  if (isLoadingEvent) {
    return <EventDetailSkeleton />;
  }

  // Error state
  if (eventError || !event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900">خطأ في تحميل الفعالية</h2>
          <p className="mb-4 text-gray-600">
            {eventError?.message || 'عذراً، لم يتم العثور على الفعالية المطلوبة'}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-trust-blue hover:bg-trust-blue/90 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-white"
            >
              إعادة المحاولة
            </button>
            <Link
              to="/events"
              className="border-trust-blue text-trust-blue hover:bg-trust-blue inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors hover:text-white"
            >
              العودة للفعاليات
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getSeatsPercentage = () => {
    return ((event.seatsAvailable - event.seatsRemaining) / event.seatsAvailable) * 100;
  };

  const isRegistrationOpen = event.status === 'registration_open';
  const canRegister = isRegistrationOpen && event.seatsRemaining > 0;
  const isRegistering = registerMutation.isPending;
  const _isUnregistering = unregisterMutation.isPending;

  const handleRegister = () => {
    if (event?.uuid) {
      registerMutation.mutate(event.uuid);
    }
  };

  const _handleUnregister = () => {
    if (event?.uuid) {
      unregisterMutation.mutate(event.uuid);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: event.description,
        url: window.location.href,
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      toast.success('تم نسخ الرابط بنجاح');
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      toast.success('تم نسخ الرابط بنجاح');
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${event.name} - ${event.description}`);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);

    const message = !isNotificationEnabled
      ? 'تم تفعيل التنبيهات لهذه الفعالية'
      : 'تم إيقاف التنبيهات لهذه الفعالية';

    toast.success(message);
  };

  const handleMapView = () => {
    const encodedAddress = encodeURIComponent(event.location);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(`maps://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link
            to="/events"
            className="text-trust-blue hover:text-trust-blue/80 mb-4 inline-flex items-center gap-2 font-medium"
          >
            العودة للفعاليات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="relative h-64 md:h-80">
            <img src={event.poster} alt={event.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="flex-1">
                  <h1 className="mb-2 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    {event.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border bg-white/90 px-2 py-1 text-xs font-medium sm:text-sm ${getStatusColor(event.status)}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium sm:text-sm ${getCategoryColor(event.category)} bg-white/90`}
                    >
                      {getCategoryLabel(event.category)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                  <div className="relative">
                    <button
                      onClick={handleShare}
                      className="rounded-lg bg-white/90 p-2 text-gray-700 transition-colors hover:bg-white"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>

                    {showShareMenu && (
                      <div className="absolute left-0 top-full z-10 mt-2 min-w-48 rounded-lg border bg-white p-3 shadow-lg">
                        <div className="space-y-2">
                          <button
                            onClick={() => handleSocialShare('twitter')}
                            className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                          >
                            <Twitter className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={() => handleSocialShare('facebook')}
                            className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                          >
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </button>
                          <button
                            onClick={() => handleSocialShare('linkedin')}
                            className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                          >
                            <Linkedin className="h-4 w-4 text-blue-700" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <hr className="my-1" />
                          <button
                            onClick={handleCopyLink}
                            className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                          >
                            {copySuccess ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="text-sm">
                              {copySuccess ? 'تم النسخ!' : 'نسخ الرابط'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleBookmark}
                    className={`rounded-lg p-2 transition-colors ${
                      isBookmarked
                        ? 'bg-amber-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={handleLike}
                    className={`rounded-lg p-2 transition-colors ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={handleNotificationToggle}
                    className={`rounded-lg p-2 transition-colors ${
                      isNotificationEnabled
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-white'
                    }`}
                    title={isNotificationEnabled ? 'إيقاف التنبيهات' : 'تفعيل التنبيهات'}
                  >
                    {isNotificationEnabled ? (
                      <Bell className="h-5 w-5" />
                    ) : (
                      <BellOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:order-2 lg:col-span-2 lg:space-y-8">
            <div className="rounded-xl border bg-white p-4 shadow-sm lg:p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900 lg:text-xl">عن الفعالية</h2>
              <p className="leading-relaxed text-gray-700">{event.description}</p>
            </div>

            <div className="rounded-xl border bg-white p-4 shadow-sm lg:p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900 lg:text-xl">التوقيت والمكان</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-trust-blue mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">تاريخ الفعالية</h3>
                    <p className="text-sm text-gray-600 sm:text-base">
                      من {event.eventStart ? formatArabicDate(event.eventStart) : 'غير محدد'} إلى{' '}
                      {event.eventEnd ? formatArabicDate(event.eventEnd) : 'غير محدد'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-trust-blue mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">الوقت</h3>
                    <p className="text-sm text-gray-600 sm:text-base">
                      من {event.eventStart ? formatArabicTime(event.eventStart) : 'غير محدد'} إلى{' '}
                      {event.eventEnd ? formatArabicTime(event.eventEnd) : 'غير محدد'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-trust-blue mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">المكان</h3>
                    <p className="text-gray-600">{event.location}</p>
                    <button
                      onClick={handleMapView}
                      className="text-trust-blue hover:text-trust-blue/80 mt-1 inline-flex items-center gap-1 text-sm"
                    >
                      عرض على الخريطة
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                {event.registrationStart && event.registrationEnd
                  ? 'فترة التسجيل'
                  : 'تفاصيل الفعالية'}
              </h2>
              <div className="space-y-3">
                {event.registrationStart && (
                  <div className="flex items-center gap-2" dir="rtl">
                    <span className="text-gray-600">بداية التسجيل:</span>
                    <span className="font-medium">{formatArabicDate(event.registrationStart)}</span>
                  </div>
                )}
                {event.registrationEnd && (
                  <div className="flex items-center gap-2" dir="rtl">
                    <span className="text-gray-600">نهاية التسجيل:</span>
                    <span className="font-medium">{formatArabicDate(event.registrationEnd)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2" dir="rtl">
                  <span className="text-gray-600">بداية الفعالية:</span>
                  <span className="font-medium">
                    {event.eventStart ? formatArabicDate(event.eventStart) : 'غير محدد'}
                  </span>
                </div>
                <div className="flex items-center gap-2" dir="rtl">
                  <span className="text-gray-600">نهاية الفعالية:</span>
                  <span className="font-medium">
                    {event.eventEnd ? formatArabicDate(event.eventEnd) : 'غير محدد'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:order-1">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">التسجيل</h3>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                  <span>المقاعد المحجوزة</span>
                  <span>
                    {event.seatsAvailable - event.seatsRemaining} / {event.seatsAvailable}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200">
                  <div
                    className="bg-trust-blue h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getSeatsPercentage()}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {event.seatsRemaining > 0
                    ? `${event.seatsRemaining} مقعد متاح`
                    : 'المقاعد ممتلئة'}
                </p>
              </div>

              {canRegister ? (
                <button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className="bg-trust-blue hover:bg-trust-blue/90 disabled:bg-trust-blue/50 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-white transition-colors disabled:cursor-not-allowed"
                >
                  {isRegistering && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  {isRegistering ? 'جاري التسجيل...' : 'سجل الآن'}
                </button>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                  <div className="font-medium text-gray-600">
                    {!isRegistrationOpen && 'التسجيل مغلق'}
                    {isRegistrationOpen && event.seatsRemaining === 0 && 'المقاعد ممتلئة'}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">إحصائيات الفعالية</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">إجمالي المقاعد</span>
                  </div>
                  <span className="font-medium">{event.seatsAvailable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">حالة الفعالية</span>
                  </div>
                  <span className="font-medium">{getStatusLabel(event.status)}</span>
                </div>
              </div>
            </div>

            {event?.club && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-gray-900">النادي المنظم</h3>
                <div className="flex items-center gap-3">
                  {event.club.logo && (
                    <img
                      src={event.club.logo}
                      alt={event.club.name}
                      className="h-12 w-12 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{event.club.name || 'غير محدد'}</h4>
                    <p className="text-sm text-gray-500">النادي المنظم للفعالية</p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">فعاليات مشابهة</h3>
              <div className="space-y-3">
                {relatedEvents.length > 0 ? (
                  relatedEvents.map((relatedEvent) => (
                    <Link
                      key={relatedEvent.uuid}
                      to={`/events/${relatedEvent.uuid}`}
                      className="block rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <h4 className="line-clamp-1 text-sm font-medium text-gray-900">
                        {relatedEvent.name}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        {relatedEvent.eventStart
                          ? formatArabicDate(relatedEvent.eventStart)
                          : 'غير محدد'}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">لا توجد فعاليات مشابهة</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

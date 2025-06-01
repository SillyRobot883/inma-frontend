import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Calendar } from 'lucide-react';

import { EventFilters } from '@/components/events/EventFilters';
import { EventGrid } from '@/components/events/EventGrid';
import { EventGridSkeleton } from '@/components/events/EventGridSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents, useUserRegisteredEvents } from '@/hooks/useEvents';

function EventsPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') ?? 'all';
  const categoryParam = searchParams.get('category') ?? 'all';
  const statusParam = searchParams.get('status') ?? 'all';
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const hasAppliedInitialParams = useRef(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedStatus, setSelectedStatus] = useState<string>(statusParam);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const [myEventsSearchTerm, setMyEventsSearchTerm] = useState('');
  const [selectedRegistrationStatus, setSelectedRegistrationStatus] = useState<string>(statusParam);

  // Fetch all events
  const { data: allEvents = [], isLoading: isLoadingEvents, isError: isEventsError } = useEvents();

  // Conditionally fetch user registered events only when authenticated and on registered tab
  const shouldFetchUserEvents = isAuthenticated && tab === 'registered';
  const {
    data: userRegisteredEvents = [],
    isLoading: isLoadingUserEvents,
    isError: isUserEventsError,
  } = useUserRegisteredEvents(shouldFetchUserEvents);

  useEffect(() => {
    if (tab === 'registered' && !isAuthenticated) {
      navigate('/login', {
        state: { from: { pathname: '/events', search: '?tab=registered' } },
        replace: true,
      });
    }
  }, [tab, isAuthenticated, navigate]);

  useEffect(() => {
    hasAppliedInitialParams.current = false;
  }, [tab, categoryParam, statusParam]);

  useEffect(() => {
    if (!hasAppliedInitialParams.current) {
      if (tab === 'upcoming') {
        setSelectedStatus('upcoming');
        setSelectedCategory('all');
        setSearchTerm('');
      } else if (categoryParam && categoryParam !== 'all') {
        setSelectedCategory(categoryParam);
        setSelectedStatus(statusParam);
        setSearchTerm('');
      } else if (!tab && !categoryParam) {
        setSelectedCategory('all');
        setSelectedStatus('all');
        setSearchTerm('');
      }

      hasAppliedInitialParams.current = true;
    }
  }, [tab, categoryParam, statusParam, selectedCategory, selectedStatus]);

  useEffect(() => {
    if (tab === 'registered') {
      const validRegistrationStatuses = ['all', 'accepted', 'pending', 'rejected'];
      if (!validRegistrationStatuses.includes(statusParam)) {
        setSelectedRegistrationStatus('all');
      } else {
        setSelectedRegistrationStatus(statusParam);
      }
    }
  }, [tab, statusParam]);

  const isShowingRegisteredEvents = tab === 'registered' && isAuthenticated;

  // Filter all events based on search and filter criteria
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filter user registered events
  const filteredMyEvents = userRegisteredEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(myEventsSearchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(myEventsSearchTerm.toLowerCase());
    const matchesRegistrationStatus =
      selectedRegistrationStatus === 'all' ||
      event.registrationStatus === selectedRegistrationStatus;
    return matchesSearch && matchesRegistrationStatus;
  });

  // Calculate registration statistics
  const registrationStats = {
    pending: userRegisteredEvents.filter((e) => e.registrationStatus === 'pending').length,
    accepted: userRegisteredEvents.filter((e) => e.registrationStatus === 'accepted').length,
    rejected: userRegisteredEvents.filter((e) => e.registrationStatus === 'rejected').length,
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    navigate(`/events?tab=${tab}&status=${selectedStatus}&category=${category}`, { replace: true });
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    navigate(`/events?tab=${tab}&status=${status}&category=${selectedCategory}`, { replace: true });
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleViewModeChange = (mode: 'grid' | 'compact') => {
    setViewMode(mode);
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-trust-blue text-3xl font-bold">الفعاليات</h1>
          <p className="text-muted-foreground mt-2">اكتشف وشارك في الفعاليات الطلابية المتنوعة</p>
        </div>
      </div>

      <Tabs
        value={isShowingRegisteredEvents ? 'registered' : 'all'}
        onValueChange={(value) => {
          if (value === 'registered') {
            navigate(
              `/events?tab=registered&status=${selectedStatus}&category=${selectedCategory}`
            );
          } else {
            navigate(`/events?tab=all&status=${selectedStatus}&category=${selectedCategory}`);
          }
        }}
        className="w-full"
      >
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="registered" className="flex-1" disabled={!isAuthenticated}>
            فعالياتي المسجلة
          </TabsTrigger>
          <TabsTrigger value="all" className="flex-1">
            جميع الفعاليات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <EventFilters
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            selectedStatus={selectedStatus}
            setSelectedStatus={handleStatusChange}
            viewMode={viewMode}
            setViewMode={handleViewModeChange}
            resultsCount={isLoadingEvents ? 0 : filteredEvents.length}
          />

          {isEventsError ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-destructive text-center">
                  حدث خطأ في تحميل الفعاليات. يرجى المحاولة مرة أخرى.
                </p>
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
                </div>
              </CardContent>
            </Card>
          ) : isLoadingEvents ? (
            <EventGridSkeleton variant={viewMode === 'grid' ? 'default' : 'compact'} count={6} />
          ) : (
            <EventGrid
              events={filteredEvents}
              variant={viewMode === 'grid' ? 'default' : 'compact'}
              showRegistrationButton={true}
              onRegister={(_eventId) => {}}
            />
          )}
        </TabsContent>

        <TabsContent value="registered">
          <EventFilters
            searchTerm={myEventsSearchTerm}
            setSearchTerm={setMyEventsSearchTerm}
            selectedCategory="all"
            setSelectedCategory={() => {}}
            selectedStatus={selectedRegistrationStatus}
            setSelectedStatus={setSelectedRegistrationStatus}
            viewMode={viewMode}
            setViewMode={setViewMode}
            resultsCount={isLoadingUserEvents ? 0 : filteredMyEvents.length}
            registrationStats={
              isLoadingUserEvents ? { pending: 0, accepted: 0, rejected: 0 } : registrationStats
            }
            isMyEvents={true}
          />

          {isUserEventsError ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-destructive text-center">
                  حدث خطأ في تحميل فعالياتك المسجلة. يرجى المحاولة مرة أخرى.
                </p>
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
                </div>
              </CardContent>
            </Card>
          ) : isLoadingUserEvents ? (
            <EventGridSkeleton variant={viewMode === 'grid' ? 'registered' : 'compact'} count={3} />
          ) : filteredMyEvents.length === 0 ? (
            userRegisteredEvents.length > 0 ? (
              // User has registered events but none match the current filter
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  لا توجد فعاليات بحالة "
                  {selectedRegistrationStatus === 'accepted'
                    ? 'مؤكدة'
                    : selectedRegistrationStatus === 'pending'
                      ? 'في الانتظار'
                      : selectedRegistrationStatus === 'rejected'
                        ? 'مرفوضة'
                        : 'جميع التسجيلات'}
                  "
                </h3>
                <p className="text-muted-foreground mb-6">جرب تغيير الحالة لعرض فعاليات أخرى</p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedRegistrationStatus('all')}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  عرض جميع الفعاليات
                </Button>
              </div>
            ) : (
              // User has no registered events at all
              <div className="space-y-6">
                <Card className="rtl text-right">
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
                      onClick={() => navigate('/events?tab=all')}
                    >
                      تصفح الفعاليات
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )
          ) : (
            <EventGrid
              events={filteredMyEvents}
              variant={viewMode === 'grid' ? 'registered' : 'compact'}
              showRegistrationButton={false}
              showRegistrationStatus={true}
              onUnregister={(eventId) => alert(`إلغاء التسجيل: ${eventId}`)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default EventsPage;

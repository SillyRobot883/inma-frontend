import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Calendar } from 'lucide-react';

import { EventFilters } from '@/components/events/EventFilters';
import { EventGrid } from '@/components/events/EventGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockEvents, mockRegisteredEvents } from '@/data/mockEvents';

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

  const eventsToShow = isShowingRegisteredEvents ? mockEvents : mockEvents;
  const registeredEventsToShow = mockRegisteredEvents;

  const filteredEvents = eventsToShow.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredMyEvents = registeredEventsToShow.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(myEventsSearchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(myEventsSearchTerm.toLowerCase());
    const matchesRegistrationStatus =
      selectedRegistrationStatus === 'all' ||
      event.registrationStatus === selectedRegistrationStatus;
    return matchesSearch && matchesRegistrationStatus;
  });

  const registrationStats = {
    pending: registeredEventsToShow.filter((e) => e.registrationStatus === 'pending').length,
    accepted: registeredEventsToShow.filter((e) => e.registrationStatus === 'accepted').length,
    rejected: registeredEventsToShow.filter((e) => e.registrationStatus === 'rejected').length,
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
            resultsCount={filteredEvents.length}
          />

          <EventGrid
            events={filteredEvents}
            variant={viewMode === 'grid' ? 'default' : 'compact'}
            showRegistrationButton={true}
            onRegister={(_eventId) => {}}
          />
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
            resultsCount={filteredMyEvents.length}
            registrationStats={registrationStats}
            isMyEvents={true}
          />

          {filteredMyEvents.length === 0 ? (
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

import type { Event } from '@inmaa-wasl/api-client';

export type EventRegistrationStatusType = 'pending' | 'accepted' | 'rejected';

export const mockEvents: Event[] = [
  {
    id: 1,
    uuid: 'event-1',
    name: 'ورشة تطوير تطبيقات الويب باستخدام React',
    description:
      'ورشة عملية شاملة لتعلم أساسيات React وبناء تطبيقات تفاعلية حديثة. ستتعلم المفاهيم الأساسية مثل Components، State Management، والتفاعل مع APIs.',
    poster: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    location: 'مركز التقنية - قاعة المؤتمرات الرئيسية',
    eventStart: '2024-02-15T14:00:00Z',
    eventEnd: '2024-02-15T18:00:00Z',
    seatsAvailable: 50,
    seatsRemaining: 12,
    status: 'registration_open',
    category: 'workshop',
    club: {
      name: 'نادي البرمجة',
      uuid: 'club-1',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    },
  },
  {
    id: 2,
    uuid: 'event-2',
    name: 'مؤتمر الذكاء الاصطناعي والتقنيات الناشئة',
    description:
      'مؤتمر تقني رائد يجمع خبراء الذكاء الاصطناعي وروّاد التقنية لمناقشة أحدث الاتجاهات والابتكارات في هذا المجال المتطور.',
    poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
    location: 'مركز الملك عبد العزيز للمؤتمرات',
    eventStart: '2024-02-25T09:00:00Z',
    eventEnd: '2024-02-27T17:00:00Z',
    seatsAvailable: 200,
    seatsRemaining: 45,
    status: 'registration_open',
    category: 'conference',
    club: {
      name: 'نادي البرمجة',
      uuid: 'club-1',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    },
  },
  {
    id: 3,
    uuid: 'event-3',
    name: 'هاكاثون الابتكار التقني 2024',
    description:
      'تحدي برمجي مثير لمدة 48 ساعة حيث يتنافس المطورون والمصممون لابتكار حلول تقنية إبداعية للمشاكل الحقيقية في المجتمع.',
    poster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
    location: 'حديقة التقنية - مبنى الابتكار',
    eventStart: '2024-03-15T18:00:00Z',
    eventEnd: '2024-03-17T18:00:00Z',
    seatsAvailable: 100,
    seatsRemaining: 0,
    status: 'registration_open',
    category: 'hackathon',
    club: {
      name: 'نادي التقنية',
      uuid: 'club-2',
      logo: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop',
    },
  },
  {
    id: 4,
    uuid: 'event-4',
    name: 'دورة تدريبية مكثفة في الأمن السيبراني',
    description:
      'برنامج تدريبي شامل يغطي أساسيات الأمن السيبراني، اختبار الاختراق، والدفاع ضد التهديدات الإلكترونية مع تطبيقات عملية.',
    poster: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    location: 'معهد التقنية المتقدمة - مختبر الأمن',
    eventStart: '2024-04-01T09:00:00Z',
    eventEnd: '2024-04-05T17:00:00Z',
    seatsAvailable: 30,
    seatsRemaining: 18,
    status: 'upcoming',
    category: 'bootcamp',
    club: {
      name: 'نادي الأمن السيبراني',
      uuid: 'club-3',
      logo: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=100&h=100&fit=crop',
    },
  },
  {
    id: 5,
    uuid: 'event-5',
    name: 'ندوة ريادة الأعمال التقنية',
    description:
      'لقاء إلهامي مع رواد الأعمال الناجحين في المجال التقني لمشاركة تجاربهم ونصائحهم للجيل القادم من المبدعين.',
    poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    location: 'مركز ريادة الأعمال - القاعة الذهبية',
    eventStart: '2024-02-10T19:00:00Z',
    eventEnd: '2024-02-10T21:00:00Z',
    seatsAvailable: 150,
    seatsRemaining: 32,
    status: 'completed',
    category: 'seminar',
    club: {
      name: 'نادي ريادة الأعمال',
      uuid: 'club-4',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
    },
  },
  {
    id: 6,
    uuid: 'event-6',
    name: 'لقاء الشبكات المهنية التقنية',
    description:
      'فرصة ذهبية للتواصل مع المتخصصين والخبراء في المجال التقني، وبناء علاقات مهنية قيمة في بيئة ودية ومحفزة.',
    poster: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop',
    location: 'فندق الإنتركونتيننتال - صالة الاستقبال',
    eventStart: '2024-03-25T17:00:00Z',
    eventEnd: '2024-03-25T21:00:00Z',
    seatsAvailable: 80,
    seatsRemaining: 25,
    status: 'registration_open',
    category: 'networking',
    club: {
      name: 'نادي التواصل المهني',
      uuid: 'club-5',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
  },
  {
    id: 7,
    uuid: 'event-7',
    name: 'اجتماع النادي الشهري - فبراير',
    description:
      'اجتماع دوري لأعضاء النادي لمناقشة الأنشطة المقبلة، تقييم الفعاليات السابقة، والتخطيط للمشاريع الجديدة.',
    poster: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop',
    location: 'مكتب النادي - قاعة الاجتماعات',
    eventStart: '2024-03-02T15:00:00Z',
    eventEnd: '2024-03-02T17:00:00Z',
    seatsAvailable: 25,
    seatsRemaining: 8,
    status: 'ongoing',
    category: 'meeting',
    club: {
      name: 'نادي البرمجة',
      uuid: 'club-1',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    },
  },
  {
    id: 8,
    uuid: 'event-8',
    name: 'ورشة تصميم واجهات المستخدم (UI/UX)',
    description:
      'ورشة تفاعلية تركز على مبادئ التصميم الحديث، تجربة المستخدم، وأفضل الممارسات في تصميم الواجهات الرقمية.',
    poster: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    location: 'استوديو التصميم - مبنى الفنون الرقمية',
    eventStart: '2024-02-22T10:00:00Z',
    eventEnd: '2024-02-22T16:00:00Z',
    seatsAvailable: 40,
    seatsRemaining: 40,
    status: 'cancelled',
    category: 'workshop',
    club: {
      name: 'نادي التصميم',
      uuid: 'club-6',
      logo: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop',
    },
  },
];

// Upcoming events
export const upcomingEvents = mockEvents.filter((event) =>
  ['registration_open', 'upcoming', 'ongoing'].includes(event.status)
);

// Completed events
export const completedEvents = mockEvents.filter((event) => event.status === 'completed');

// Events by category
export const eventsByCategory = {
  workshop: mockEvents.filter((event) => event.category === 'workshop'),
  conference: mockEvents.filter((event) => event.category === 'conference'),
  hackathon: mockEvents.filter((event) => event.category === 'hackathon'),
  bootcamp: mockEvents.filter((event) => event.category === 'bootcamp'),
  seminar: mockEvents.filter((event) => event.category === 'seminar'),
  networking: mockEvents.filter((event) => event.category === 'networking'),
  meeting: mockEvents.filter((event) => event.category === 'meeting'),
};

// Mock registered events with registration statuses
export interface RegisteredEvent extends Event {
  registrationStatus: EventRegistrationStatusType;
}

export const mockRegisteredEvents: RegisteredEvent[] = [
  {
    ...mockEvents.find((e) => e.uuid === 'event-1')!,
    registrationStatus: 'accepted',
  },
  {
    ...mockEvents.find((e) => e.uuid === 'event-4')!,
    registrationStatus: 'pending',
  },
  {
    ...mockEvents.find((e) => e.uuid === 'event-6')!,
    registrationStatus: 'accepted',
  },
  {
    ...mockEvents.find((e) => e.uuid === 'event-8')!,
    registrationStatus: 'rejected',
  },
];

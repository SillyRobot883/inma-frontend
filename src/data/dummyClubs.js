// Dummy data for clubs
export const clubs = [
  {
    id: 1,
    name: 'نادي تيكنيشن',
    members: 45,
    activeMembers: 32,
    totalHours: 156.5,
    pendingTasks: 8,
    needsInfo: 3,
    approvedTasks: 24,
    engagementScore: 30, // Low engagement (15/32 = 0.47)
    recentActivity: [
      {
        id: 1,
        title: 'تنسيق فعالية النادي',
        member: 'فهد السالم',
        status: 'pending',
        hours: '04:00',
        date: '2025-04-05'
      },
      {
        id: 2,
        title: 'إعداد التقرير الشهري',
        member: 'نورة العتيبي',
        status: 'approved',
        hours: '02:30',
        date: '2025-04-04'
      }
    ]
  },
  {
    id: 2,
    name: 'نادي الابتكار',
    members: 38,
    activeMembers: 28,
    totalHours: 142.0,
    pendingTasks: 5,
    needsInfo: 2,
    approvedTasks: 18,
    engagementScore: 20, // Good engagement (20/28 = 0.71)
    recentActivity: [
      {
        id: 3,
        title: 'تنظيم ورشة عمل',
        member: 'عبدالله محمد',
        status: 'needs_info',
        hours: '03:00',
        date: '2025-04-03'
      }
    ]
  },
  {
    id: 3,
    name: 'نادي التصميم',
    members: 42,
    activeMembers: 35,
    totalHours: 168.5,
    pendingTasks: 6,
    needsInfo: 1,
    approvedTasks: 28,
    engagementScore: 25, // Good engagement (25/35 = 0.71)
    recentActivity: [
      {
        id: 4,
        title: 'تصميم شعار النادي',
        member: 'سارة أحمد',
        status: 'approved',
        hours: '05:00',
        date: '2025-04-02'
      }
    ]
  },
  {
    id: 4,
    name: 'نادي التصوير',
    members: 35,
    activeMembers: 25,
    totalHours: 98.0,
    pendingTasks: 4,
    needsInfo: 2,
    approvedTasks: 15,
    engagementScore: 18, // Good engagement (18/25 = 0.72)
    recentActivity: [
      {
        id: 5,
        title: 'تصوير فعالية الجامعة',
        member: 'محمد علي',
        status: 'pending',
        hours: '03:30',
        date: '2025-04-01'
      }
    ]
  },
  {
    id: 5,
    name: 'نادي المسرح',
    members: 50,
    activeMembers: 40,
    totalHours: 245.0,
    pendingTasks: 25,
    needsInfo: 3,
    approvedTasks: 35,
    engagementScore: 22, // Low engagement (22/40 = 0.55)
    recentActivity: [
      {
        id: 6,
        title: 'تدريب الممثلين',
        member: 'ليلى محمد',
        status: 'approved',
        hours: '06:00',
        date: '2025-03-31'
      }
    ]
  },
  {
    id: 6,
    name: 'نادي القراءة',
    members: 30,
    activeMembers: 22,
    totalHours: 75.5,
    pendingTasks: 3,
    needsInfo: 1,
    approvedTasks: 12,
    engagementScore: 15, // Good engagement (15/22 = 0.68)
    recentActivity: [
      {
        id: 7,
        title: 'مناقشة كتاب',
        member: 'أحمد خالد',
        status: 'approved',
        hours: '02:00',
        date: '2025-03-30'
      }
    ]
  },
  {
    id: 7,
    name: 'نادي الرياضة',
    members: 60,
    activeMembers: 45,
    totalHours: 320.0,
    pendingTasks: 22,
    needsInfo: 4,
    approvedTasks: 42,
    engagementScore: 25, // Good engagement (25/45 = 0.56)
    recentActivity: [
      {
        id: 8,
        title: 'تنظيم مباراة',
        member: 'عمر سعد',
        status: 'pending',
        hours: '04:30',
        date: '2025-03-29'
      }
    ]
  },
  {
    id: 8,
    name: 'نادي الفنون',
    members: 40,
    activeMembers: 30,
    totalHours: 145.0,
    pendingTasks: 7,
    needsInfo: 2,
    approvedTasks: 20,
    engagementScore: 20, // Good engagement (20/30 = 0.67)
    recentActivity: [
      {
        id: 9,
        title: 'معرض فني',
        member: 'نور سارة',
        status: 'approved',
        hours: '05:00',
        date: '2025-03-28'
      }
    ]
  },
  {
    id: 9,
    name: 'نادي اللغات',
    members: 55,
    activeMembers: 42,
    totalHours: 198.0,
    pendingTasks: 9,
    needsInfo: 3,
    approvedTasks: 28,
    engagementScore: 30, // Good engagement (30/42 = 0.71)
    recentActivity: [
      {
        id: 10,
        title: 'ورشة محادثة',
        member: 'فاطمة أحمد',
        status: 'pending',
        hours: '03:00',
        date: '2025-03-27'
      }
    ]
  },
  {
    id: 10,
    name: 'نادي البيئة',
    members: 25,
    activeMembers: 18,
    totalHours: 85.0,
    pendingTasks: 4,
    needsInfo: 1,
    approvedTasks: 15,
    engagementScore: 12, // Good engagement (12/18 = 0.67)
    recentActivity: [
      {
        id: 11,
        title: 'حملة تنظيف',
        member: 'خالد محمد',
        status: 'approved',
        hours: '04:00',
        date: '2025-03-26'
      }
    ]
  },
  {
    id: 11,
    name: 'نادي الإعلام',
    members: 35,
    activeMembers: 28,
    totalHours: 120.0,
    pendingTasks: 38, // High pending tasks (38/28 = 1.36)
    needsInfo: 2,
    approvedTasks: 18,
    engagementScore: 15, // Low engagement (15/28 = 0.54)
    recentActivity: [
      {
        id: 12,
        title: 'إعداد نشرة إخبارية',
        member: 'سلمى أحمد',
        status: 'pending',
        hours: '03:30',
        date: '2025-03-15' // Old activity (more than 7 days)
      }
    ]
  },
  {
    id: 12,
    name: 'نادي التطوع',
    members: 45,
    activeMembers: 35,
    totalHours: 280.0,
    pendingTasks: 11,
    needsInfo: 4,
    approvedTasks: 38,
    engagementScore: 25, // Good engagement (25/35 = 0.71)
    recentActivity: [
      {
        id: 13,
        title: 'زيارة دار أيتام',
        member: 'عبدالله سعد',
        status: 'approved',
        hours: '06:00',
        date: '2025-03-10'
      }
    ]
  }
]; 
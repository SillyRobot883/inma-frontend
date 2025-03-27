import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Clock, 
  Activity,
  ChevronDown,
  Search,
  Filter,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
  TrendingUp,
  BarChart3,
  Calendar,
  Tag,
  MessageCircle,
  Eye,
  Trophy,
  Plus,
  Edit2,
  X,
  ArrowRightToLine
} from 'lucide-react';

const ClubDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isInmaAdmin = location.pathname.startsWith('/inma-dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for club details
  const club = {
    id: 1,
    name: 'نادي التطوير',
    logo: 'https://via.placeholder.com/150',
    description: 'نادي التطوير هو نادي طلابي يهدف إلى تطوير مهارات الطلاب في مجال التطوير البرمجي وتنظيم الفعاليات التقنية.',
    establishmentDate: '2023-01-15',
    category: 'تقني',
    supervisor: 'د. أحمد محمد',
    members: 45,
    activeMembers: 32,
    totalHours: '156:30',
    averageHoursPerMember: '3:28',
    pendingTasks: 8,
    needsInfo: 3,
    approvedTasks: 24,
    recentActivity: [
      {
        id: 1,
        title: 'تنسيق فعالية النادي',
        member: 'فهد السالم',
        status: 'pending',
        hours: '04:00',
        date: '2024-03-16',
        description: 'تنسيق فعالية النادي السنوية التي ستقام في نهاية الشهر',
        category: 'مهمة تخدم برامج أو مشاريع النادي',
        attachments: ['agenda.pdf', 'budget.xlsx'],
        comments: [
          {
            id: 1,
            user: 'أحمد محمد',
            text: 'يرجى إضافة جدول زمني للفعالية',
            date: '2024-03-16 14:30'
          }
        ]
      },
      {
        id: 2,
        title: 'إعداد التقرير الشهري',
        member: 'نورة العتيبي',
        status: 'approved',
        hours: '02:30',
        date: '2024-03-15',
        description: 'إعداد التقرير الشهري عن نشاطات النادي وإنجازاته',
        category: 'مهمة تخدم الأنشطة الداخلية في النادي',
        attachments: ['report.pdf'],
        comments: []
      }
    ],
    topPerformers: [
      { name: 'عبدالله محمد', hours: '65:30', tasks: 15 },
      { name: 'سارة أحمد', hours: '58:45', tasks: 12 },
      { name: 'خالد العمري', hours: '52:15', tasks: 10 }
    ],
    taskCategories: {
      'مهمة تخدم برامج أو مشاريع النادي': 12,
      'مهمة تخدم المشاركات داخل الجامعة': 8,
      'مهمة تخدم المشاركات خارج الجامعة': 5,
      'مهمة تخدم مبادرات النادي': 15,
      'مهمة تخدم الأنشطة الداخلية في النادي': 10,
      'مهمة تخدم المشاركات المجتمعية': 7
    },
    upcomingEvents: [
      {
        id: 1,
        title: 'ورشة تطوير تطبيقات الموبايل',
        date: '2024-03-25',
        time: '14:00',
        location: 'قاعة 101',
        attendees: 30
      },
      {
        id: 2,
        title: 'معرض المشاريع التقنية',
        date: '2024-04-05',
        time: '10:00',
        location: 'قاعة المعارض',
        attendees: 50
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'جائزة أفضل نادي تقني',
        date: '2024-02-15',
        description: 'حصل النادي على جائزة أفضل نادي تقني في الجامعة لعام 2024'
      },
      {
        id: 2,
        title: 'تنظيم مؤتمر تقني ناجح',
        date: '2024-01-20',
        description: 'تم تنظيم مؤتمر تقني شارك فيه أكثر من 200 طالب'
      }
    ]
  };

  // Format hours to Hrs:Mins:Secs
  const formatHours = (hours) => {
    const totalSeconds = Math.floor(hours * 3600);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-growth/10 text-growth';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'needs_info':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'needs_info':
        return <Info className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'تمت الموافقة';
      case 'pending':
        return 'قيد المراجعة';
      case 'needs_info':
        return 'يحتاج معلومات إضافية';
      default:
        return status;
    }
  };

  const filteredActivity = club.recentActivity.filter(activity => {
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.member.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <AdminLayout isInmaAdmin={isInmaAdmin}>
      <div className="space-y-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-trust transition-colors"
        >
          <ArrowRightToLine className="h-5 w-5 ml-2" />
          <span>رجوع</span>
        </button>

        {/* Club Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="h-16 w-16 rounded-xl bg-trust/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-trust" />
              </div>
              <div>
                <h2 className="text-2xl font-kaff text-trust">{club.name}</h2>
                <div className="flex items-center mt-2 space-x-2 space-x-reverse">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-trust/10 text-trust">
                    {club.activeMembers} عضو نشط
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-growth/10 text-growth">
                    {formatHours(club.approvedTasks)} ساعة مكتملة
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              {isInmaAdmin && (
                <button className="btn-primary">
                  <Edit2 className="h-5 w-5 ml-2" />
                  تعديل النادي
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-trust text-trust'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                نظرة عامة
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tasks'
                    ? 'border-trust text-trust'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                المهام
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'members'
                    ? 'border-trust text-trust'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                الأعضاء
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-trust text-trust'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                الفعاليات
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Club Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-kaff text-trust mb-4">معلومات النادي</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">الوصف</p>
                      <p className="text-gray-700">{club.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">تاريخ التأسيس</p>
                      <p className="text-gray-700">{club.establishmentDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">التصنيف</p>
                      <p className="text-gray-700">{club.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">المشرف</p>
                      <p className="text-gray-700">{club.supervisor}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">إجمالي الأعضاء</p>
                        <p className="text-2xl font-medium text-trust mt-1">
                          {club.members}
                        </p>
                        <p className="text-sm text-growth mt-2 flex items-center">
                          <TrendingUp className="h-4 w-4 ml-1" />
                          {club.activeMembers} نشط
                        </p>
                      </div>
                      <div className="bg-trust/10 rounded-full p-4">
                        <Users className="h-7 w-7 text-trust" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">الساعات التطوعية</p>
                        <p className="text-2xl font-medium text-trust mt-1">
                          {club.totalHours}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {club.averageHoursPerMember} لكل عضو
                        </p>
                      </div>
                      <div className="bg-trust/10 rounded-full p-4">
                        <Clock className="h-7 w-7 text-trust" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">الساعات المعلقة</p>
                        <p className="text-2xl font-medium text-yellow-600 mt-1">
                          {club.pendingTasks}
                        </p>
                        <p className="text-sm text-blue-600 mt-2">
                          {club.needsInfo} يحتاج معلومات
                        </p>
                      </div>
                      <div className="bg-yellow-100 rounded-full p-4">
                        <AlertCircle className="h-7 w-7 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">الساعات المكتملة</p>
                        <p className="text-2xl font-medium text-growth mt-1">
                          {club.approvedTasks}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {((club.approvedTasks / (club.approvedTasks + club.pendingTasks)) * 100).toFixed(1)}% معدل الإنجاز
                        </p>
                      </div>
                      <div className="bg-growth/10 rounded-full p-4">
                        <CheckCircle2 className="h-7 w-7 text-growth" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-kaff text-trust mb-4">الإنجازات</h3>
                  <div className="space-y-4">
                    {club.achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start space-x-4 space-x-reverse">
                        <div className="h-10 w-10 rounded-full bg-growth/10 flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-growth" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && (
              <div className="space-y-8">
                {/* Task Categories */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-kaff text-trust mb-4">تصنيف المهام</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(club.taskCategories).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Tag className="h-5 w-5 text-trust" />
                          <span className="text-sm text-gray-700">{category}</span>
                        </div>
                        <span className="text-sm font-medium text-trust">{count} مهمة</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-kaff text-trust">آخر النشاطات</h3>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="relative">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="بحث..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust w-64"
                          />
                        </div>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust text-sm font-medium text-gray-700"
                        >
                          <option value="all">جميع الحالات</option>
                          <option value="pending">قيد المراجعة</option>
                          <option value="needs_info">تحتاج معلومات</option>
                          <option value="approved">تمت الموافقة</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredActivity.map((activity) => (
                      <div key={activity.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 space-x-reverse">
                            <div className="flex-shrink-0">
                              <div className="h-12 w-12 rounded-xl bg-trust/10 flex items-center justify-center">
                                <Activity className="h-6 w-6 text-trust" />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <h4 className="text-lg font-medium text-gray-900">
                                  {activity.title}
                                </h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                                  {getStatusIcon(activity.status)}
                                  <span className="mr-1">{getStatusText(activity.status)}</span>
                                </span>
                              </div>
                              <div className="mt-2 flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                                <span>{activity.member}</span>
                                <span>•</span>
                                <span>{activity.hours} ساعة</span>
                                <span>•</span>
                                <span>{activity.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button 
                              className="btn-secondary"
                              onClick={() => setSelectedTask(activity)}
                            >
                              <Eye className="h-5 w-5 ml-2" />
                              عرض التفاصيل
                            </button>
                          </div>
                        </div>

                        {/* Task Details Modal */}
                        {selectedTask?.id === activity.id && (
                          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-kaff text-trust">{activity.title}</h3>
                                <button 
                                  onClick={() => setSelectedTask(null)}
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <X className="h-6 w-6" />
                                </button>
                              </div>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">الوصف</h4>
                                  <p className="text-gray-700">{activity.description}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">التصنيف</h4>
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-trust/10 text-trust">
                                    {activity.category}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">المرفقات</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {activity.attachments.map((attachment, index) => (
                                      <div key={index} className="flex items-center space-x-2 space-x-reverse px-3 py-2 bg-gray-50 rounded-lg">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{attachment}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-2">التعليقات</h4>
                                  <div className="space-y-4">
                                    {activity.comments.map((comment) => (
                                      <div key={comment.id} className="flex items-start space-x-3 space-x-reverse">
                                        <div className="h-8 w-8 rounded-full bg-trust/10 flex items-center justify-center">
                                          <span className="text-sm font-medium text-trust">
                                            {comment.user.charAt(0)}
                                          </span>
                                        </div>
                                        <div>
                                          <div className="flex items-center space-x-2 space-x-reverse">
                                            <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                                            <span className="text-xs text-gray-500">{comment.date}</span>
                                          </div>
                                          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                                        </div>
                                      </div>
                                    ))}
                                    {activity.comments.length === 0 && (
                                      <p className="text-sm text-gray-500">لا توجد تعليقات</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-8">
                {/* Top Performers */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-kaff text-trust mb-4">أفضل الأداء</h3>
                  <div className="space-y-4">
                    {club.topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="h-10 w-10 rounded-full bg-trust/10 flex items-center justify-center">
                            <span className="text-lg font-medium text-trust">
                              {performer.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{performer.name}</h4>
                            <p className="text-sm text-gray-500">{performer.tasks} ساعة</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span className="font-medium text-trust">{performer.hours}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-8">
                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-kaff text-trust">الفعاليات القادمة</h3>
                    <button className="btn-primary">
                      <Plus className="h-5 w-5 ml-2" />
                      إضافة فعالية
                    </button>
                  </div>
                  <div className="space-y-4">
                    {club.upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="h-12 w-12 rounded-xl bg-trust/10 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-trust" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <div className="flex items-center mt-1 space-x-4 space-x-reverse text-sm text-gray-500">
                              <span>{event.date}</span>
                              <span>•</span>
                              <span>{event.time}</span>
                              <span>•</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Users className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">{event.attendees} مشارك</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ClubDetails; 
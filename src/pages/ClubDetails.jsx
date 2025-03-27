import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  ArrowRightToLine,
  UserCircle,
  Timer,
  CalendarDays,
  Clock4,
  Target,
  Award,
  User,
  Mail,
  Phone,
  UserCog,
  UserX
} from 'lucide-react';

const ClubDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clubId } = useParams();
  const isInmaAdmin = location.pathname.startsWith('/inma-dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [taskFilterStatus, setTaskFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Helper functions
  const formatTimeFromDecimal = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutesDecimal = (decimalHours - hours) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.floor((minutesDecimal - minutes) * 60);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 80) return "text-growth";
    if (engagement >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getEngagementBg = (engagement) => {
    if (engagement >= 80) return "bg-growth/10";
    if (engagement >= 60) return "bg-yellow-100";
    return "bg-red-100";
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

  const getCategoryColor = (category) => {
    const colors = {
      'مهمة تخدم برامج أو مشاريع النادي': 'bg-purple-100 text-purple-600',
      'مهمة تخدم المشاركات داخل الجامعة': 'bg-blue-100 text-blue-600',
      'مهمة تخدم المشاركات خارج الجامعة': 'bg-green-100 text-green-600',
      'مهمة تخدم مبادرات النادي': 'bg-pink-100 text-pink-600',
      'مهمة تخدم الأنشطة الداخلية في النادي': 'bg-indigo-100 text-indigo-600',
      'مهمة تخدم المشاركات المجتمعية': 'bg-orange-100 text-orange-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  // Dummy data for club details
  const club = {
    id: parseInt(clubId),
    name: 'نادي التطوير',
    logo: `/src/assets/club-${clubId}.png`,
    description: 'نادي التطوير هو نادي طلابي يهدف إلى تطوير مهارات الطلاب في مجال التطوير البرمجي وتنظيم الفعاليات التقنية.',
    establishmentDate: '2023-01-15',
    category: 'تقني',
    supervisor: 'د. أحمد محمد',
    members: 45,
    activeMembers: 32,
    totalHours: '156:30:00',
    averageHoursPerMember: '03:28:00',
    pendingTasks: 8,
    needsInfo: 3,
    approvedTasks: 24,
    recentActivity: [
      {
        id: 1,
        title: 'تنظيم ورشة عمل Git',
        member: 'فهد السالم',
        status: 'pending',
        hours: '04:00:00',
        date: '2024-03-16',
        description: 'تنظيم ورشة عمل Git للمبتدئين في مجال التطوير',
        category: 'مهمة تخدم برامج أو مشاريع النادي',
        attachments: ['workshop_material.pdf', 'schedule.xlsx'],
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
        title: 'إعداد محتوى تدريبي',
        member: 'نورة العتيبي',
        status: 'approved',
        hours: '02:30:00',
        date: '2024-03-15',
        description: 'إعداد محتوى تدريبي لورشة العمل القادمة',
        category: 'مهمة تخدم الأنشطة الداخلية في النادي',
        attachments: ['training_content.pdf'],
        comments: []
      }
    ],
    topPerformers: [
      { name: 'عبدالله محمد', hours: '65:30:00', tasks: 15 },
      { name: 'سارة أحمد', hours: '58:45:00', tasks: 12 },
      { name: 'خالد العمري', hours: '52:15:00', tasks: 10 }
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
    ],
    membersList: [
      {
        id: 1,
        name: 'عبدالله محمد',
        role: 'عضو',
        hours: '65:30:00',
        tasks: 15,
        engagement: 'عالية',
        joinDate: '2023-09-15',
        department: 'علوم الحاسب',
        level: 'سنة ثالثة',
        status: 'نشط'
      },
      {
        id: 2,
        name: 'سارة أحمد',
        role: 'عضو',
        hours: '58:45:00',
        tasks: 12,
        engagement: 'عالية',
        joinDate: '2023-09-15',
        department: 'نظم المعلومات',
        level: 'سنة رابعة',
        status: 'نشط'
      },
      {
        id: 3,
        name: 'خالد العمري',
        role: 'عضو',
        hours: '52:15:00',
        tasks: 10,
        engagement: 'متوسطة',
        joinDate: '2023-10-01',
        department: 'علوم الحاسب',
        level: 'سنة ثانية',
        status: 'نشط'
      }
    ]
  };

  const filteredActivity = club.recentActivity.filter(activity => {
    const matchesStatus = taskFilterStatus === 'all' || activity.status === taskFilterStatus;
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
        <div className="bg-gradient-to-r from-trust/5 to-trust/10 rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative">
                <div className="h-20 w-20 rounded-xl shadow-md ring-2 ring-trust/20 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    src={club.logo}
                    alt={club.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/src/assets/1-06.png';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-trust/10 rounded-full p-1.5">
                  <Building2 className="h-4 w-4 text-trust" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-kaff font-bold text-trust mb-1">{club.name}</h2>
                <div className="flex items-center space-x-2 space-x-reverse mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-trust/10 text-trust">
                    {club.activeMembers} عضو نشط
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-growth/10 text-growth">
                    {club.totalHours} ساعة مكتملة
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
                طلبات اعتماد الساعات
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
                        <p className="text-sm font-medium text-gray-500">إجمالي الأعضاء</p>
                        <p className="text-2xl font-bold text-trust mt-1">
                          {club.members}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          {club.activeMembers} نشط
                        </p>
                      </div>
                      <div className="bg-trust/10 rounded-full p-3 transition-all duration-300 group-hover:bg-trust/20">
                        <Users className="h-6 w-6 text-trust" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">الساعات التطوعية</p>
                        <p className="text-2xl font-bold text-trust mt-1">
                          {club.totalHours}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          {club.averageHoursPerMember} لكل عضو
                        </p>
                      </div>
                      <div className="bg-trust/10 rounded-full p-3 transition-all duration-300 group-hover:bg-trust/20">
                        <Clock className="h-6 w-6 text-trust" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">الساعات المعلقة</p>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">
                          {club.pendingTasks}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          تحتاج مراجعة
                        </p>
                      </div>
                      <div className="bg-yellow-100 rounded-full p-3 transition-all duration-300 group-hover:bg-yellow-200">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">المهام المكتملة</p>
                        <p className="text-2xl font-bold text-growth mt-1">
                          {club.approvedTasks}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          مهمة منجزة
                        </p>
                      </div>
                      <div className="bg-growth/10 rounded-full p-3 transition-all duration-300 group-hover:bg-growth/20">
                        <CheckCircle2 className="h-6 w-6 text-growth" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="bg-trust/10 rounded-full p-2">
                      <Trophy className="h-6 w-6 text-trust" />
                    </div>
                    <h3 className="text-lg font-kaff text-trust">قائمة المتصدرين</h3>
                  </div>
                  <div className="space-y-4">
                    {club.topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="h-10 w-10 rounded-full bg-trust/10 flex items-center justify-center">
                            <span className="text-lg font-medium text-trust">
                              {performer.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{performer.name}</h4>
                            <p className="text-sm text-gray-500">{performer.tasks} ساعة تطوعية</p>
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
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">الساعات المعلقة</p>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">
                          {club.pendingTasks}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          تحتاج مراجعة
                        </p>
                        </div>
                      <div className="bg-yellow-100 rounded-full p-3 transition-all duration-300 group-hover:bg-yellow-200">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">تحتاج معلومات</p>
                        <p className="text-2xl font-bold text-blue-600 mt-1">
                          {club.needsInfo}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          معلومات إضافية مطلوبة
                        </p>
                      </div>
                      <div className="bg-blue-100 rounded-full p-3 transition-all duration-300 group-hover:bg-blue-200">
                        <Info className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">تمت الموافقة</p>
                        <p className="text-2xl font-bold text-growth mt-1">
                          {club.approvedTasks}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          مهمة منجزة
                        </p>
                      </div>
                      <div className="bg-growth/10 rounded-full p-3 transition-all duration-300 group-hover:bg-growth/20">
                        <CheckCircle2 className="h-6 w-6 text-growth" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">إجمالي الساعات</p>
                        <p className="text-2xl font-bold text-trust mt-1">
                          {(() => {
                            const totalSeconds = club.recentActivity.reduce((acc, curr) => {
                              const [hours, minutes, seconds] = curr.hours.split(':').map(Number);
                              return acc + hours * 3600 + minutes * 60 + seconds;
                            }, 0);
                            
                            const hours = Math.floor(totalSeconds / 3600);
                            const minutes = Math.floor((totalSeconds % 3600) / 60);
                            const seconds = totalSeconds % 60;
                            
                            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                          })()}
                        </p>
                        <p className="text-sm font-medium text-gray-500 mt-1">
                          ساعة عمل
                        </p>
                      </div>
                      <div className="bg-trust/10 rounded-full p-3 transition-all duration-300 group-hover:bg-trust/20">
                        <Clock className="h-6 w-6 text-trust" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-kaff text-trust">طلبات اعتماد الساعات</h3>
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
                          value={taskFilterStatus}
                          onChange={(e) => setTaskFilterStatus(e.target.value)}
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
                      <div 
                        key={activity.id} 
                        className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                          activity.status === 'approved' 
                            ? 'bg-growth/5 border-r-4 border-r-growth' 
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 space-x-reverse">
                            <div className="flex-shrink-0">
                              <div className={`h-10 w-10 rounded-full ${
                                activity.status === 'approved' 
                                  ? 'bg-growth/10' 
                                  : 'bg-trust/10'
                              } flex items-center justify-center`}>
                                <UserCircle className={`h-6 w-6 ${
                                  activity.status === 'approved' 
                                    ? 'text-growth' 
                                    : 'text-trust'
                                }`} />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {activity.title}
                                </h3>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                  {activity.category}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center space-x-3 space-x-reverse text-sm text-gray-500">
                                <span className="flex items-center">
                                  <UserCircle className="h-4 w-4 ml-1" />
                                  {activity.member}
                                </span>
                                <span>•</span>
                                <span className="flex items-center bg-trust/5 px-3 py-1 rounded-full font-medium text-trust">
                                  <Clock4 className="h-4 w-4 ml-1" />
                                  {activity.hours}
                                </span>
                                <span>•</span>
                                <span className="flex items-center">
                                  <CalendarDays className="h-4 w-4 ml-1" />
                                  {activity.date}
                                </span>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                {activity.description}
                              </p>
                              {activity.attachments.length > 0 && (
                                <div className="mt-2 flex items-center space-x-2 space-x-reverse">
                                  <FileText className="h-4 w-4 text-gray-400" />
                          <div className="flex items-center space-x-2 space-x-reverse">
                                    {activity.attachments.map((attachment, index) => (
                                      <span
                                        key={index}
                                        className="text-xs text-trust hover:text-trust-dark cursor-pointer"
                                      >
                                        {attachment}
                                  </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {activity.comments.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {activity.comments.map((comment) => (
                                    <div key={comment.id} className="flex items-start space-x-2 space-x-reverse bg-gray-50 rounded-lg p-3">
                                      <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                                            <span className="text-xs text-gray-500">{comment.date}</span>
                                          </div>
                                        <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                                    )}
                                  </div>
                                </div>
                          <div className="flex items-start space-x-3 space-x-reverse">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              activity.status === 'approved' 
                                ? 'bg-growth text-white' 
                                : getStatusColor(activity.status)
                            }`}>
                              {getStatusIcon(activity.status)}
                              <span className="mr-1">{getStatusText(activity.status)}</span>
                            </span>
                              </div>
                            </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                {/* Search and Filter Section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="بحث عن عضو..."
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
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                    </select>
                  </div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      id: 1,
                      name: "محمد عبدالله السالم",
                      studentId: "444001234",
                      email: "mohammed@example.com",
                      phone: "0501234567",
                      role: "قائد النادي",
                      joinDate: "2023-09-15",
                      totalHours: 85.5,
                      completedTasks: 18,
                      pendingTasks: 3,
                      engagement: 95,
                      lastActive: "2024-03-20",
                      committee: "لجنة البرامج والفعاليات",
                      major: "علوم الحاسب",
                      level: "المستوى السادس",
                      recentActivity: [
                        { id: 1, title: "تنظيم ورشة عمل Git", date: "2024-03-15", hours: 3, status: "approved" },
                        { id: 2, title: "إعداد محتوى تدريبي", date: "2024-03-10", hours: 4, status: "approved" },
                      ],
                    },
                    {
                      id: 2,
                      name: "سارة أحمد العتيبي",
                      studentId: "444002345",
                      email: "sarah@example.com",
                      phone: "0502345678",
                      role: "موارد بشرية",
                      joinDate: "2023-09-20",
                      totalHours: 72.25,
                      completedTasks: 15,
                      pendingTasks: 2,
                      engagement: 88,
                      lastActive: "2024-03-19",
                      committee: "لجنة الموارد البشرية",
                      major: "نظم المعلومات",
                      level: "المستوى الخامس",
                      recentActivity: [
                        { id: 3, title: "تنظيم مقابلات الأعضاء الجدد", date: "2024-03-18", hours: 2, status: "approved" },
                        { id: 4, title: "إعداد تقرير أداء الأعضاء", date: "2024-03-12", hours: 3, status: "approved" },
                      ],
                    },
                    {
                      id: 3,
                      name: "خالد عبدالرحمن العمري",
                      studentId: "444003456",
                      email: "khalid@example.com",
                      phone: "0503456789",
                      role: "عضو",
                      joinDate: "2023-10-05",
                      totalHours: 65.75,
                      completedTasks: 12,
                      pendingTasks: 1,
                      engagement: 82,
                      lastActive: "2024-03-18",
                      committee: "لجنة التسويق والإعلام",
                      major: "هندسة البرمجيات",
                      level: "المستوى السابع",
                      recentActivity: [
                        { id: 5, title: "تصميم منشورات للنادي", date: "2024-03-17", hours: 2.5, status: "approved" },
                        { id: 6, title: "إدارة حسابات التواصل الاجتماعي", date: "2024-03-14", hours: 1.5, status: "pending" },
                      ],
                    },
                    {
                      id: 4,
                      name: "نورة محمد السالم",
                      studentId: "444004567",
                      email: "noura@example.com",
                      phone: "0504567890",
                      role: "عضو",
                      joinDate: "2023-10-10",
                      totalHours: 58.5,
                      completedTasks: 10,
                      pendingTasks: 0,
                      engagement: 78,
                      lastActive: "2024-03-17",
                      committee: "لجنة البرامج والفعاليات",
                      major: "علوم الحاسب",
                      level: "المستوى الرابع",
                      recentActivity: [
                        { id: 7, title: "تنسيق فعالية النادي", date: "2024-03-16", hours: 4, status: "approved" },
                        { id: 8, title: "إعداد التقرير الشهري", date: "2024-03-10", hours: 2.5, status: "approved" },
                      ],
                    },
                    {
                      id: 5,
                      name: "فهد سعد الدوسري",
                      studentId: "444005678",
                      email: "fahad@example.com",
                      phone: "0505678901",
                      role: "عضو",
                      joinDate: "2023-10-15",
                      totalHours: 52.25,
                      completedTasks: 9,
                      pendingTasks: 2,
                      engagement: 75,
                      lastActive: "2024-03-15",
                      committee: "لجنة التطوير التقني",
                      major: "هندسة البرمجيات",
                      level: "المستوى الثامن",
                      recentActivity: [
                        { id: 9, title: "تطوير موقع النادي", date: "2024-03-14", hours: 5, status: "approved" },
                        { id: 10, title: "إصلاح مشاكل تقنية", date: "2024-03-08", hours: 2, status: "approved" },
                      ],
                    },
                    {
                      id: 6,
                      name: "ريم خالد الشمري",
                      studentId: "444006789",
                      email: "reem@example.com",
                      phone: "0506789012",
                      role: "عضو",
                      joinDate: "2023-11-01",
                      totalHours: 48.75,
                      completedTasks: 8,
                      pendingTasks: 1,
                      engagement: 70,
                      lastActive: "2024-03-14",
                      committee: "لجنة التسويق والإعلام",
                      major: "نظم المعلومات",
                      level: "المستوى السادس",
                      recentActivity: [
                        { id: 11, title: "تصميم شعار النادي", date: "2024-03-13", hours: 5, status: "approved" },
                        { id: 12, title: "إعداد استراتيجية تسويقية", date: "2024-03-07", hours: 3, status: "pending" },
                      ],
                    }
                  ].map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Member Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="h-12 w-12 rounded-full bg-trust/10 flex items-center justify-center">
                            <span className="text-lg font-medium text-trust">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.major} - {member.level}</p>
                          </div>
                        </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getEngagementColor(member.engagement)} ${getEngagementBg(member.engagement)}`}>
                          {member.engagement}%
                          </span>
                        </div>

                      {/* Member Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center space-x-2 space-x-reverse text-sm">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{member.studentId}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{member.committee}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-trust/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Clock className="h-4 w-4 text-trust" />
                            <span className="text-sm font-medium text-trust">{formatTimeFromDecimal(member.totalHours)}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">إجمالي الساعات</p>
                        </div>
                        <div className="bg-growth/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <CheckCircle2 className="h-4 w-4 text-growth" />
                            <span className="text-sm font-medium text-growth">{member.completedTasks}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">المهام المكتملة</p>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="border-t border-gray-100 pt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">آخر النشاطات</h5>
                        <div className="space-y-2">
                          {member.recentActivity.slice(0, 2).map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{activity.title}</span>
                              <span className="text-gray-500">{activity.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end space-x-2 space-x-reverse mt-4 pt-4 border-t border-gray-100">
                        <button className="text-trust hover:text-trust-dark transition-colors duration-150 p-2 hover:bg-trust/10 rounded-full">
                          <UserCog className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-colors duration-150 p-2 hover:bg-red-50 rounded-full">
                          <UserX className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
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
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users,
  ChevronLeft,
  Calendar,
  Timer,
  ChevronUp,
  ChevronDown,
  Activity,
  Award,
  Target,
  UserCircle,
  Building2
} from 'lucide-react';

const Dashboard = () => {
  const { clubId } = useParams();
  const { user, currentClub } = useAuth();
  const isAdmin = currentClub?.role === 'leader' || currentClub?.role === 'hr';

  // Dummy data for member stats
  const memberStats = {
    completedTasks: 15,
    totalHours: '45:30',
    pendingTasks: 3,
    recentActivity: [
      {
        id: 1,
        title: 'تنظيم ورشة عمل Git',
        status: 'approved',
        hours: '03:00',
        date: '2024-03-15'
      },
      {
        id: 2,
        title: 'إعداد محتوى تدريبي',
        status: 'pending',
        hours: '02:30',
        date: '2024-03-14'
      }
    ]
  };

  // Additional stats for admins
  const clubStats = {
    totalMembers: 45,
    activeMembers: 38,
    totalClubHours: '650:45',
    averageHoursPerMember: '14:30',
    pendingTasks: 12,
    completedTasks: 156,
    topPerformers: [
      { name: 'عبدالله محمد', hours: '65:30' },
      { name: 'سارة أحمد', hours: '58:45' },
      { name: 'خالد العمري', hours: '52:15' }
    ],
    recentSubmissions: [
      {
        id: 1,
        member: 'فهد السالم',
        title: 'تنسيق فعالية النادي',
        status: 'pending',
        hours: '04:00',
        date: '2024-03-16'
      },
      {
        id: 2,
        member: 'نورة العتيبي',
        title: 'إعداد التقرير الشهري',
        status: 'approved',
        hours: '02:30',
        date: '2024-03-15'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-growth';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Club Header */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                className="h-16 w-16 rounded-xl"
                src={`/src/assets/club-${clubId}.png`}
                alt={currentClub?.name}
              />
              <div>
                <h2 className="text-2xl font-kaff text-trust">{currentClub?.name}</h2>
              </div>
            </div>
            <button className="btn-primary">
              <Clock className="h-5 w-5 ml-2" />
              تسجيل ساعات جديدة
            </button>
          </div>
        </div>

        {/* Personal Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <UserCircle className="h-6 w-6 text-trust" />
            <h2 className="text-xl font-kaff text-trust">معلوماتي الشخصية</h2>
          </div>

          {/* Personal Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-trust/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">المهام المكتملة</p>
                    <p className="text-2xl font-medium text-trust mt-1">
                      {memberStats.completedTasks}
                    </p>
                  </div>
                  <div className="bg-trust/10 rounded-full p-3">
                    <CheckCircle2 className="h-6 w-6 text-trust" />
                  </div>
                </div>
              </div>
              <div className="bg-growth/5 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">إجمالي الساعات</p>
                    <p className="text-2xl font-medium text-growth mt-1">
                      {memberStats.totalHours}
                    </p>
                  </div>
                  <div className="bg-growth/10 rounded-full p-3">
                    <Clock className="h-6 w-6 text-growth" />
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">المهام المعلقة</p>
                    <p className="text-2xl font-medium text-yellow-600 mt-1">
                      {memberStats.pendingTasks}
                    </p>
                  </div>
                  <div className="bg-yellow-100 rounded-full p-3">
                    <AlertCircle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-kaff text-trust mb-4">نشاطاتي الأخيرة</h3>
            <div className="space-y-4">
              {memberStats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {activity.hours} • {activity.date}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(activity.status)}`}>
                    {activity.status === 'approved' ? 'تمت الموافقة' : 'قيد المراجعة'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Club Section - Only visible to admins */}
        {isAdmin && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Building2 className="h-6 w-6 text-trust" />
              <h2 className="text-xl font-kaff text-trust">معلومات النادي</h2>
            </div>

            {/* Club Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-trust/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">عدد الأعضاء</p>
                      <p className="text-2xl font-medium text-trust mt-1">
                        {clubStats.totalMembers}
                      </p>
                      <p className="text-sm text-growth mt-1">
                        {clubStats.activeMembers} نشط
                      </p>
                    </div>
                    <div className="bg-trust/10 rounded-full p-3">
                      <Users className="h-6 w-6 text-trust" />
                    </div>
                  </div>
                </div>
                <div className="bg-growth/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">إجمالي ساعات النادي</p>
                      <p className="text-2xl font-medium text-growth mt-1">
                        {clubStats.totalClubHours}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        معدل {clubStats.averageHoursPerMember} لكل عضو
                      </p>
                    </div>
                    <div className="bg-growth/10 rounded-full p-3">
                      <Activity className="h-6 w-6 text-growth" />
                    </div>
                  </div>
                </div>
                <div className="bg-excellence/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">المهام المكتملة</p>
                      <p className="text-2xl font-medium text-excellence mt-1">
                        {clubStats.completedTasks}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {clubStats.pendingTasks} مهمة معلقة
                      </p>
                    </div>
                    <div className="bg-excellence/10 rounded-full p-3">
                      <Target className="h-6 w-6 text-excellence" />
                    </div>
                  </div>
                </div>
                <div className="bg-trust/5 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">أفضل الأعضاء أداءً</p>
                      <div className="mt-2 space-y-1">
                        {clubStats.topPerformers.map((performer, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{performer.name}</span>
                            <span className="text-trust font-medium">{performer.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-trust/10 rounded-full p-3">
                      <Award className="h-6 w-6 text-trust" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Club Recent Submissions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-kaff text-trust mb-4">آخر المهام المقدمة للنادي</h3>
              <div className="space-y-4">
                {clubStats.recentSubmissions.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex-shrink-0">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activity.member} • {activity.hours} • {activity.date}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(activity.status)}`}>
                      {activity.status === 'approved' ? 'تمت الموافقة' : 'قيد المراجعة'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard; 
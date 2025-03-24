import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
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
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const CollegeAdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for clubs
  const clubs = [
    {
      id: 1,
      name: 'نادي التطوير',
      members: 45,
      activeMembers: 32,
      totalHours: 156.5,
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
          date: '2024-03-16'
        },
        {
          id: 2,
          title: 'إعداد التقرير الشهري',
          member: 'نورة العتيبي',
          status: 'approved',
          hours: '02:30',
          date: '2024-03-15'
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
      recentActivity: [
        {
          id: 3,
          title: 'تنظيم ورشة عمل',
          member: 'عبدالله محمد',
          status: 'needs_info',
          hours: '03:00',
          date: '2024-03-14'
        }
      ]
    }
  ];

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

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout isInmaAdmin={false}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-kaff text-trust">لوحة تحكم الكلية</h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="btn-primary">
                <FileText className="h-5 w-5 ml-2" />
                تقرير شامل
              </button>
              <button className="btn-primary">
                <Plus className="h-5 w-5 ml-2" />
                إضافة نادي جديد
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الأندية</p>
                <p className="text-2xl font-medium text-trust mt-1">
                  {clubs.length}
                </p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Building2 className="h-6 w-6 text-trust" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الأعضاء</p>
                <p className="text-2xl font-medium text-trust mt-1">
                  {clubs.reduce((acc, club) => acc + club.members, 0)}
                </p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Users className="h-6 w-6 text-trust" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الساعات</p>
                <p className="text-2xl font-medium text-trust mt-1">
                  {clubs.reduce((acc, club) => acc + club.totalHours, 0).toFixed(1)}
                </p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Clock className="h-6 w-6 text-trust" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">الساعات المعلقة</p>
                <p className="text-2xl font-medium text-yellow-600 mt-1">
                  {clubs.reduce((acc, club) => acc + club.pendingTasks, 0)}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-kaff text-trust">الأندية</h2>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث عن نادي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust w-64"
                />
              </div>
              <button className="btn-secondary">
                <Filter className="h-5 w-5 ml-2" />
                تصفية
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div key={club.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="h-12 w-12 rounded-xl bg-trust/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-trust" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {club.name}
                      </h3>
                      <div className="flex items-center mt-2 space-x-2 space-x-reverse">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-trust/10 text-trust">
                          {club.activeMembers} عضو نشط
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-growth/10 text-growth">
                          {club.approvedTasks} ساعة مكتملة
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      className="btn-secondary"
                      onClick={() => navigate(`/college-admin/clubs/${club.id}`)}
                    >
                      <ArrowRight className="h-5 w-5 ml-2" />
                      عرض التفاصيل
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">إجمالي الأعضاء</span>
                    <span className="font-medium text-gray-900">{club.members}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">إجمالي الساعات</span>
                    <span className="font-medium text-gray-900">{club.totalHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">الساعات المعلقة</span>
                    <span className="font-medium text-yellow-600">{club.pendingTasks}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">تحتاج معلومات</span>
                    <span className="font-medium text-blue-600">{club.needsInfo}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">آخر النشاطات</h4>
                  <div className="space-y-2">
                    {club.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-gray-900">{activity.title}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">{activity.member}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-gray-500">{activity.hours}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {getStatusIcon(activity.status)}
                            <span className="mr-1">{getStatusText(activity.status)}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CollegeAdminDashboard; 
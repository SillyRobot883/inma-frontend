import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import ClubCard from '../components/ClubCard';
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

  // Format hours to Hrs:Mins:Secs
  const formatHours = (hours) => {
    const totalSeconds = Math.floor(hours * 3600);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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
      recentActivity: [
        {
          id: 4,
          title: 'تصميم شعار النادي',
          member: 'سارة أحمد',
          status: 'approved',
          hours: '05:00',
          date: '2024-03-13'
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
      recentActivity: [
        {
          id: 5,
          title: 'تصوير فعالية الجامعة',
          member: 'محمد علي',
          status: 'pending',
          hours: '03:30',
          date: '2024-03-12'
        }
      ]
    },
    {
      id: 5,
      name: 'نادي المسرح',
      members: 50,
      activeMembers: 40,
      totalHours: 245.0,
      pendingTasks: 10,
      needsInfo: 3,
      approvedTasks: 35,
      recentActivity: [
        {
          id: 6,
          title: 'تدريب الممثلين',
          member: 'ليلى محمد',
          status: 'approved',
          hours: '06:00',
          date: '2024-03-11'
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
      recentActivity: [
        {
          id: 7,
          title: 'مناقشة كتاب',
          member: 'أحمد خالد',
          status: 'approved',
          hours: '02:00',
          date: '2024-03-10'
        }
      ]
    },
    {
      id: 7,
      name: 'نادي الرياضة',
      members: 60,
      activeMembers: 45,
      totalHours: 320.0,
      pendingTasks: 12,
      needsInfo: 4,
      approvedTasks: 42,
      recentActivity: [
        {
          id: 8,
          title: 'تنظيم مباراة',
          member: 'عمر سعد',
          status: 'pending',
          hours: '04:30',
          date: '2024-03-09'
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
      recentActivity: [
        {
          id: 9,
          title: 'معرض فني',
          member: 'نور سارة',
          status: 'approved',
          hours: '05:00',
          date: '2024-03-08'
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
      recentActivity: [
        {
          id: 10,
          title: 'ورشة محادثة',
          member: 'فاطمة أحمد',
          status: 'pending',
          hours: '03:00',
          date: '2024-03-07'
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
      recentActivity: [
        {
          id: 11,
          title: 'حملة تنظيف',
          member: 'خالد محمد',
          status: 'approved',
          hours: '04:00',
          date: '2024-03-06'
        }
      ]
    },
    {
      id: 11,
      name: 'نادي الإعلام',
      members: 35,
      activeMembers: 28,
      totalHours: 120.0,
      pendingTasks: 6,
      needsInfo: 2,
      approvedTasks: 18,
      recentActivity: [
        {
          id: 12,
          title: 'إعداد نشرة إخبارية',
          member: 'سلمى أحمد',
          status: 'pending',
          hours: '03:30',
          date: '2024-03-05'
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
      recentActivity: [
        {
          id: 13,
          title: 'زيارة دار أيتام',
          member: 'عبدالله سعد',
          status: 'approved',
          hours: '06:00',
          date: '2024-03-04'
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
              <h2 className="text-2xl font-kaff text-trust">لوحة تحكم العمادة</h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Removed the "Add New Club" button as it should only be available for INMA admins */}
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
                  {formatHours(clubs.reduce((acc, club) => acc + club.totalHours, 0))}
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
              <ClubCard
                key={club.id}
                club={club}
                onViewDetails={(id) => navigate(`/college-dashboard/club/${id}`)}
                formatHours={formatHours}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CollegeAdminDashboard; 
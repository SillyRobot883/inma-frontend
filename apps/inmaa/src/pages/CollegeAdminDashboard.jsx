import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AlertCircle,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  Info,
  Search,
  Users,
} from 'lucide-react';

import AdminLayout from '../components/AdminLayout';
import ClubCard from '../components/ClubCard';
import { clubs as dummyClubs } from '../data/dummyClubs';

const CollegeAdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showStrugglingOnly, setShowStrugglingOnly] = useState(false);

  // Format hours to Hrs:Mins:Secs
  const formatHours = (hours) => {
    const totalSeconds = Math.floor(hours * 3600);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Use the imported dummy data
  const clubs = dummyClubs;

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

  // Filter clubs based on search and struggling status
  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!showStrugglingOnly) return matchesSearch;

    // Calculate struggling criteria
    const memberEngagement = club.activeMembers > 0 ? club.engagementScore / club.activeMembers : 0;
    const pendingTasksRatio = club.activeMembers > 0 ? club.pendingTasks / club.activeMembers : 0;

    const lastActivityDate = new Date(club.recentActivity[0]?.date || '');
    const today = new Date();
    const daysSinceLastActivity = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));

    const isStruggling =
      memberEngagement < 0.6 || pendingTasksRatio > 0.3 || daysSinceLastActivity > 7;

    return matchesSearch && isStruggling;
  });

  return (
    <AdminLayout isInmaAdmin={false}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-kaff text-trust text-2xl">لوحة تحكم العمادة</h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Removed the "Add New Club" button as it should only be available for INMA admins */}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الأندية</p>
                <p className="text-trust mt-1 text-2xl font-medium">{clubs.length}</p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Building2 className="text-trust h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الأعضاء</p>
                <p className="text-trust mt-1 text-2xl font-medium">
                  {clubs.reduce((acc, club) => acc + club.members, 0)}
                </p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Users className="text-trust h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الساعات</p>
                <p className="text-trust mt-1 text-2xl font-medium">
                  {formatHours(clubs.reduce((acc, club) => acc + club.totalHours, 0))}
                </p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Clock className="text-trust h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">الأندية المتعثرة</p>
                <p className="mt-1 text-2xl font-medium text-yellow-600">
                  {
                    clubs.filter((club) => {
                      const memberEngagement =
                        club.activeMembers > 0 ? club.engagementScore / club.activeMembers : 0;
                      const pendingTasksRatio =
                        club.activeMembers > 0 ? club.pendingTasks / club.activeMembers : 0;

                      const lastActivityDate = new Date(club.recentActivity[0]?.date || '');
                      const today = new Date();
                      const daysSinceLastActivity = Math.floor(
                        (today - lastActivityDate) / (1000 * 60 * 60 * 24)
                      );

                      return (
                        memberEngagement < 0.6 ||
                        pendingTasksRatio > 0.3 ||
                        daysSinceLastActivity > 7
                      );
                    }).length
                  }
                </p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-kaff text-trust text-xl">الأندية</h2>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث عن نادي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:ring-trust/20 focus:border-trust w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-12 focus:outline-none focus:ring-2"
                />
              </div>
              <button
                onClick={() => setShowStrugglingOnly(!showStrugglingOnly)}
                className={`btn-secondary flex items-center ${
                  showStrugglingOnly ? 'bg-yellow-100 text-yellow-800' : ''
                }`}
              >
                <AlertTriangle className="ml-2 h-5 w-5" />
                {showStrugglingOnly ? 'عرض الكل' : 'عرض المتعثرة فقط'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

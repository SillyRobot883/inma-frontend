import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AlertCircle,
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  Info,
  Plus,
  Search,
  Upload,
  Users,
  X,
} from 'lucide-react';

import AdminLayout from '../components/AdminLayout';
import ClubCard from '../components/ClubCard';
import { clubs as dummyClubs } from '../data/dummyClubs';

const InmaAdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showStrugglingOnly, setShowStrugglingOnly] = useState(false);
  const [showAddClubModal, setShowAddClubModal] = useState(false);
  const [newClub, setNewClub] = useState({
    name: '',
    description: '',
    logo: null,
    supervisor: {
      name: '',
      phone: '',
    },
    leader: {
      name: '',
      email: '',
      phone: '',
    },
    category: 'عام',
    foundationDate: '',
  });

  // Format hours to Hrs:Mins:Secs
  const formatHours = (hours) => {
    const totalSeconds = Math.floor(hours * 3600);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewClub((prev) => ({
          ...prev,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClub = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to create the club
    console.log('Creating new club:', newClub);
    setShowAddClubModal(false);
    setNewClub({
      name: '',
      description: '',
      logo: null,
      supervisor: {
        name: '',
        phone: '',
      },
      leader: {
        name: '',
        email: '',
        phone: '',
      },
      category: 'عام',
      foundationDate: '',
    });
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

    // Calculate struggling criteria
    const memberEngagement = club.activeMembers > 0 ? club.engagementScore / club.activeMembers : 0;
    const pendingTasksRatio = club.activeMembers > 0 ? club.pendingTasks / club.activeMembers : 0;

    const lastActivityDate = new Date(club.recentActivity[0]?.date || '');
    const today = new Date();
    const daysSinceLastActivity = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));

    const isStruggling =
      memberEngagement < 0.6 || pendingTasksRatio > 0.3 || daysSinceLastActivity > 7;

    return matchesSearch && (showStrugglingOnly ? isStruggling : true);
  });

  return (
    <AdminLayout isInmaAdmin={true}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-kaff text-trust text-2xl">لوحة تحكم إنماء</h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button onClick={() => setShowAddClubModal(true)} className="btn-primary">
                <Plus className="ml-2 h-5 w-5" />
                إضافة نادي جديد
              </button>
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
                onViewDetails={(id) => navigate(`/inma-dashboard/club/${id}`)}
                formatHours={formatHours}
              />
            ))}
          </div>
        </div>

        {/* Add Club Modal */}
        {showAddClubModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
              <div className="sticky top-0 z-10 border-b border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-kaff text-trust text-2xl">إضافة نادي جديد</h2>
                  <button
                    onClick={() => setShowAddClubModal(false)}
                    className="text-gray-400 transition-colors hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddClub} className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">المعلومات الأساسية</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          اسم النادي <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newClub.name}
                          onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
                          className="input-field"
                          required
                          placeholder="أدخل اسم النادي"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          تصنيف النادي <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newClub.category}
                          onChange={(e) => setNewClub({ ...newClub, category: e.target.value })}
                          className="input-field"
                          required
                        >
                          <option value="عام">عام</option>
                          <option value="تخصصي">تخصصي</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">وصف النادي</label>
                      <textarea
                        value={newClub.description}
                        onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
                        className="input-field min-h-[120px] w-full resize-y"
                        placeholder="أدخل وصفاً مختصراً عن النادي وأهدافه"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        تاريخ التأسيس
                      </label>
                      <input
                        type="date"
                        value={newClub.foundationDate}
                        onChange={(e) => setNewClub({ ...newClub, foundationDate: e.target.value })}
                        className="input-field w-full md:w-1/2"
                      />
                    </div>
                  </div>

                  {/* Logo Upload Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">شعار النادي</h3>
                    <div className="flex w-full items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="hover:border-trust/50 mt-1 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 transition-colors">
                          <div className="space-y-2 text-center">
                            {newClub.logo ? (
                              <div className="relative">
                                <img
                                  src={newClub.logo}
                                  alt="Club logo preview"
                                  className="mx-auto h-32 w-32 rounded-lg object-cover shadow-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => setNewClub({ ...newClub, logo: null })}
                                  className="absolute -right-2 -top-2 rounded-full bg-red-100 p-1.5 text-red-600 transition-colors hover:bg-red-200"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="mx-auto h-12 w-12 text-gray-400">
                                  <Upload className="h-full w-full" />
                                </div>
                                <div className="flex text-sm text-gray-600">
                                  <label className="text-trust hover:text-trust-dark focus-within:ring-trust relative cursor-pointer rounded-md bg-white font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2">
                                    <span>رفع صورة</span>
                                    <input
                                      type="file"
                                      className="sr-only"
                                      accept="image/*"
                                      onChange={handleLogoChange}
                                    />
                                  </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supervisor Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      معلومات المشرف <span className="text-red-500">*</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          اسم المشرف
                        </label>
                        <input
                          type="text"
                          value={newClub.supervisor.name}
                          onChange={(e) =>
                            setNewClub({
                              ...newClub,
                              supervisor: { ...newClub.supervisor, name: e.target.value },
                            })
                          }
                          className="input-field"
                          required
                          placeholder="أدخل اسم المشرف"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          رقم هاتف المشرف
                        </label>
                        <input
                          type="tel"
                          value={newClub.supervisor.phone}
                          onChange={(e) =>
                            setNewClub({
                              ...newClub,
                              supervisor: { ...newClub.supervisor, phone: e.target.value },
                            })
                          }
                          className="input-field"
                          required
                          placeholder="05xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Club Leader Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      معلومات قائد النادي <span className="text-red-500">*</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          اسم قائد النادي
                        </label>
                        <input
                          type="text"
                          value={newClub.leader.name}
                          onChange={(e) =>
                            setNewClub({
                              ...newClub,
                              leader: { ...newClub.leader, name: e.target.value },
                            })
                          }
                          className="input-field"
                          required
                          placeholder="أدخل اسم قائد النادي"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          البريد الإلكتروني لقائد النادي
                        </label>
                        <input
                          type="email"
                          value={newClub.leader.email}
                          onChange={(e) =>
                            setNewClub({
                              ...newClub,
                              leader: { ...newClub.leader, email: e.target.value },
                            })
                          }
                          className="input-field"
                          required
                          placeholder="example@domain.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          رقم هاتف قائد النادي
                        </label>
                        <input
                          type="tel"
                          value={newClub.leader.phone}
                          onChange={(e) =>
                            setNewClub({
                              ...newClub,
                              leader: { ...newClub.leader, phone: e.target.value },
                            })
                          }
                          className="input-field"
                          required
                          placeholder="05xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 space-x-reverse border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddClubModal(false)}
                      className="btn-secondary"
                    >
                      إلغاء
                    </button>
                    <button type="submit" className="btn-primary">
                      <Plus className="ml-2 h-5 w-5" />
                      إضافة النادي
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default InmaAdminDashboard;

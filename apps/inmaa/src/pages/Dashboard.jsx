import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Leaderboard from '../components/Leaderboard';
import { useAuth } from '../context/AuthContext';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Users,
  Timer,
  Activity,
  Award,
  Target,
  UserCircle,
  Building2,
  TrendingUp,
  BarChart3,
  Calendar,
  Trophy,
  ChevronLeft,
  Crown,
  UserPlus,
  Shield,
  XCircle
} from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const { clubId } = useParams();
  const { user, currentClub } = useAuth();
  const isAdmin = currentClub?.role === 'leader' || currentClub?.role === 'hr';
  const [showLeaderChangeModal, setShowLeaderChangeModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newLeader, setNewLeader] = useState({
    name: '',
    email: '',
    phone: '',
    ssn: '',
    currentLeaderSSN: ''
  });
  const [error, setError] = useState('');

  // Helper function to format time
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  };

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
      { name: 'عبدالله محمد', hours: '65:30', role: 'عضو' },
      { name: 'سارة أحمد', hours: '58:45', role: 'عضو' },
      { name: 'خالد العمري', hours: '52:15', role: 'عضو' }
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
        return 'bg-growth/10 text-growth group-hover:bg-growth/20';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 group-hover:bg-gray-200';
    }
  };

  const handleLeaderChange = () => {
    setShowLeaderChangeModal(true);
    setCurrentStep(1);
    setNewLeader({
      name: '',
      email: '',
      phone: '',
      ssn: '',
      currentLeaderSSN: ''
    });
    setError('');
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate new leader info
      if (!newLeader.name || !newLeader.email || !newLeader.phone || !newLeader.ssn) {
        setError('الرجاء إكمال جميع الحقول المطلوبة');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Verify current leader's SSN
      if (!newLeader.currentLeaderSSN) {
        setError('الرجاء إدخال رقم هويتك للتأكيد');
        return;
      }
      if (newLeader.currentLeaderSSN !== '1234567890') {
        setError('رقم هويتك غير صحيح. يرجى التأكد من الرقم وإعادة المحاولة');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Here you would typically make an API call to update the leader
      console.log('Changing leader to:', newLeader);
      setShowLeaderChangeModal(false);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
    setError('');
  };

  const handleSelectExistingMember = (member) => {
    setNewLeader({
      ...newLeader,
      name: member.name,
      email: member.email,
      phone: '0500000000', // This would come from the member's data
      ssn: '',
      currentLeaderSSN: ''
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Club Header */}
        <div className="bg-gradient-to-r from-trust/5 to-trust/10 rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative">
                <div className="h-20 w-20 rounded-xl shadow-md ring-2 ring-trust/20 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    src={`/src/assets/club-${clubId}.png`}
                    alt={currentClub?.name}
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
                <h2 className="text-3xl font-kaff font-bold text-trust mb-1">{currentClub?.name}</h2>
                <p className="text-gray-600 text-sm font-medium">مرحباً بك في لوحة التحكم</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              {currentClub?.role === 'leader' && (
                <button
                  onClick={handleLeaderChange}
                  className="btn-primary transform transition-transform duration-300 hover:scale-105"
                >
                  <Crown className="h-5 w-5 ml-2" />
                  تغيير قائد النادي
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-trust/10 rounded-full p-2">
              <UserCircle className="h-6 w-6 text-trust" />
            </div>
            <h2 className="text-2xl font-kaff text-trust">معلوماتي الشخصية</h2>
          </div>

          {/* Personal Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-trust/5 rounded-xl p-6 transition-all duration-300 hover:bg-trust/10 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">الساعات المكتملة</p>
                    <p className="text-3xl font-bold text-trust transition-all duration-300 group-hover:scale-105">
                      {memberStats.completedTasks}
                    </p>
                  </div>
                  <div className="bg-trust/10 rounded-full p-4 transition-all duration-300 group-hover:bg-trust/20">
                    <CheckCircle2 className="h-7 w-7 text-trust" />
                  </div>
                </div>
              </div>
              <div className="bg-growth/5 rounded-xl p-6 transition-all duration-300 hover:bg-growth/10 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">إجمالي الساعات</p>
                    <p className="text-3xl font-medium text-growth transition-all duration-300 group-hover:scale-105">
                      {formatTime(memberStats.totalHours)}
                    </p>
                  </div>
                  <div className="bg-growth/10 rounded-full p-4 transition-all duration-300 group-hover:bg-growth/20">
                    <Clock className="h-7 w-7 text-growth" />
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 transition-all duration-300 hover:bg-yellow-100/50 group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">الساعات المعلقة</p>
                    <p className="text-3xl font-medium text-yellow-600 transition-all duration-300 group-hover:scale-105">
                      {memberStats.pendingTasks}
                    </p>
                  </div>
                  <div className="bg-yellow-100 rounded-full p-4 transition-all duration-300 group-hover:bg-yellow-200">
                    <AlertCircle className="h-7 w-7 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-kaff text-trust">طلبات اعتماد الساعات الأخيرة</h3>
              <a 
                href={`/volunteer-hours/${clubId}`} 
                className="text-sm text-trust hover:text-trust-dark font-medium flex items-center"
              >
                عرض الكل
                <ChevronLeft className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="space-y-4">
              {memberStats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-5 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 group"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm transition-all duration-300 group-hover:shadow-md">
                      <Clock className="h-5 w-5 text-trust" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900 group-hover:text-trust transition-colors duration-300">
                        {activity.title}
                      </h3>
                      <div className="flex items-center space-x-3 space-x-reverse mt-1 text-sm text-gray-500">
                        <span className="flex items-center bg-trust/5 px-3 py-1 rounded-full font-medium text-trust">
                          <Timer className="h-4 w-4 ml-1" />
                          {formatTime(activity.hours)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          {activity.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${getStatusColor(activity.status)}`}>
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
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-trust/10 rounded-full p-2">
                <Building2 className="h-6 w-6 text-trust" />
              </div>
              <h2 className="text-2xl font-kaff text-trust">معلومات النادي</h2>
            </div>

            {/* Club Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-trust/5 rounded-xl p-6 transition-all duration-300 hover:bg-trust/10 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">عدد الأعضاء</p>
                      <p className="text-3xl font-medium text-trust transition-all duration-300 group-hover:scale-105">
                        {clubStats.totalMembers}
                      </p>
                      <p className="text-sm text-growth mt-2 flex items-center">
                        <TrendingUp className="h-4 w-4 ml-1" />
                        {clubStats.activeMembers} نشط
                      </p>
                    </div>
                    <div className="bg-trust/10 rounded-full p-4 transition-all duration-300 group-hover:bg-trust/20">
                      <Users className="h-7 w-7 text-trust" />
                    </div>
                  </div>
                </div>
                <div className="bg-growth/5 rounded-xl p-6 transition-all duration-300 hover:bg-growth/10 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">إجمالي ساعات النادي</p>
                      <p className="text-3xl font-medium text-growth transition-all duration-300 group-hover:scale-105">
                        {formatTime(clubStats.totalClubHours)}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <BarChart3 className="h-4 w-4 ml-1" />
                        معدل {formatTime(clubStats.averageHoursPerMember)} لكل عضو
                      </p>
                    </div>
                    <div className="bg-growth/10 rounded-full p-4 transition-all duration-300 group-hover:bg-growth/20">
                      <Activity className="h-7 w-7 text-growth" />
                    </div>
                  </div>
                </div>
                <div className="bg-excellence/5 rounded-xl p-6 transition-all duration-300 hover:bg-excellence/10 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-2">الساعات المكتملة</p>
                      <p className="text-3xl font-medium text-excellence transition-all duration-300 group-hover:scale-105">
                        {clubStats.completedTasks}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <Target className="h-4 w-4 ml-1" />
                        {clubStats.pendingTasks} ساعة معلقة
                      </p>
                    </div>
                    <div className="bg-excellence/10 rounded-full p-4 transition-all duration-300 group-hover:bg-excellence/20">
                      <Target className="h-7 w-7 text-excellence" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Club Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-kaff text-trust">آخر طلبات اعتماد الساعات للنادي</h3>
                <a 
                  href={`/hr-dashboard/${clubId}`} 
                  className="text-sm text-trust hover:text-trust-dark font-medium flex items-center"
                >
                  عرض الكل
                  <ChevronLeft className="h-4 w-4 ml-1" />
                </a>
              </div>
              <div className="space-y-4">
                {clubStats.recentSubmissions.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-5 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 group"
                  >
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex-shrink-0 bg-white p-2 rounded-full shadow-sm transition-all duration-300 group-hover:shadow-md">
                        <Clock className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900 group-hover:text-trust transition-colors duration-300">
                          {activity.title}
                        </h3>
                        <div className="flex items-center space-x-3 space-x-reverse mt-1 text-sm text-gray-500">
                          <span className="font-medium text-trust">{activity.member}</span>
                          <span>•</span>
                          <span className="flex items-center bg-trust/5 px-3 py-1 rounded-full font-medium text-trust">
                            <Timer className="h-4 w-4 ml-1" />
                            {formatTime(activity.hours)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 ml-1" />
                            {activity.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${getStatusColor(activity.status)}`}>
                      {activity.status === 'approved' ? 'تمت الموافقة' : 'قيد المراجعة'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Leaderboard - Visible to all users */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-trust/10 rounded-full p-2">
              <Trophy className="h-6 w-6 text-trust" />
            </div>
            <h2 className="text-2xl font-kaff text-trust">قائمة المتصدرين</h2>
          </div>
          <Leaderboard 
            data={clubStats.topPerformers}
            maxItems={5}
          />
        </div>

        {/* Leader Change Modal */}
        {showLeaderChangeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-kaff text-trust">
                    {currentStep === 1 ? 'تغيير قائد النادي' : 
                     currentStep === 2 ? 'تأكيد التغيير' : 
                     'مراجعة المعلومات'}
                  </h2>
                  <button
                    onClick={() => setShowLeaderChangeModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg text-red-600">
                    {error}
                  </div>
                )}
                {currentStep === 1 ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">اختر من الأعضاء الحاليين</h3>
                      <div className="space-y-3">
                        {clubStats.topPerformers.map(member => (
                          <button
                            key={member.name}
                            onClick={() => handleSelectExistingMember(member)}
                            className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                              newLeader.name === member.name
                                ? 'border-trust bg-trust/5'
                                : 'border-gray-200 hover:border-trust/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <UserCircle className="h-8 w-8 text-gray-400" />
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">{member.name}</p>
                                  <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">{member.role}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">أو أدخل معلومات القائد الجديد</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            الاسم الكامل
                          </label>
                          <input
                            type="text"
                            value={newLeader.name}
                            onChange={(e) => setNewLeader({ ...newLeader, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="أدخل الاسم الكامل"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            البريد الإلكتروني
                          </label>
                          <input
                            type="email"
                            value={newLeader.email}
                            onChange={(e) => setNewLeader({ ...newLeader, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="أدخل البريد الإلكتروني"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الجوال
                          </label>
                          <input
                            type="tel"
                            value={newLeader.phone}
                            onChange={(e) => setNewLeader({ ...newLeader, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="أدخل رقم الجوال"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهوية
                          </label>
                          <input
                            type="text"
                            value={newLeader.ssn}
                            onChange={(e) => setNewLeader({ ...newLeader, ssn: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="أدخل رقم الهوية"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentStep === 2 ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <p className="text-blue-700">
                          لتأكيد تغيير قائد النادي، يرجى إدخال رقم هويتك للتأكيد
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        رقم هويتك
                      </label>
                      <input
                        type="text"
                        value={newLeader.currentLeaderSSN}
                        onChange={(e) => setNewLeader({ ...newLeader, currentLeaderSSN: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                        placeholder="أدخل رقم هويتك للتأكيد"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        <p className="text-blue-700">
                          يرجى مراجعة معلومات القائد الجديد قبل تأكيد التغيير
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">الاسم الكامل</span>
                          <span className="font-medium">{newLeader.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">البريد الإلكتروني</span>
                          <span className="font-medium">{newLeader.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">رقم الجوال</span>
                          <span className="font-medium">{newLeader.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">رقم الهوية</span>
                          <span className="font-medium">{newLeader.ssn}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-red-700">
                          تنبيه: هذا الإجراء لا يمكن التراجع عنه. سيتم نقل صلاحيات قائد النادي بشكل كامل إلى القائد الجديد.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="btn-secondary"
                    >
                      رجوع
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowLeaderChangeModal(false)}
                    className="btn-secondary"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200 ${
                      currentStep === 3 
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2' 
                        : 'bg-trust hover:bg-trust-dark focus:ring-2 focus:ring-trust focus:ring-offset-2'
                    }`}
                  >
                    {currentStep === 1 ? 'التالي' : 
                     currentStep === 2 ? 'تأكيد التغيير' : 
                     'تأكيد وتعيين القائد الجديد'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard; 
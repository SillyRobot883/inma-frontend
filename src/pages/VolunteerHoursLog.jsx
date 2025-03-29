import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { Clock, Calendar, FileText, Search, Info, CheckCircle2, AlertCircle, XCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VolunteeringHoursLog = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dummy data for previous submissions
  const previousSubmissions = [
    {
      id: 1,
      title: 'دورة الأستعداد لسوق',
      description: 'تنظيم وإعداد دورة تدريبية للأعضاء حول كيفية الاستعداد لسوق العمل، شملت الدورة محاضرات حول كتابة السيرة الذاتية ومهارات المقابلة الوظيفية',
      time: '08:00:00',
      submittedAt: '2025-01-29T17:00:00',
      status: 'approved',
      feedback: 'عمل ممتاز! شكراً على جهودك',
      category: 'مهمة تخدم برامج أو مشاريع النادي'
    },
    {
      id: 2,
      title: 'Create a simple blog using git camp',
      description: 'إنشاء مدونة بسيطة باستخدام Git و GitHub، شملت المهمة تعليم الأعضاء أساسيات Git وإدارة المشاريع',
      time: '10:00:00',
      submittedAt: '2025-03-14T06:25:00',
      status: 'pending',
      feedback: null,
      category: 'مهمة تخدم برامج أو مشاريع النادي'
    },
    {
      id: 3,
      title: 'تنسيق اجتماع النادي',
      description: 'تنسيق وإعداد اجتماع دوري لأعضاء النادي لمناقشة خطة العمل القادمة وتقييم النشاطات السابقة',
      time: '01:15:00',
      submittedAt: '2024-03-13T16:20:00',
      status: 'rejected',
      feedback: 'يرجى إضافة تفاصيل أكثر عن المهمة',
      category: 'مهمة تخدم المشاركات المجتمعية'
    }
  ];

  // Calculate statistics
  const stats = {
    total: previousSubmissions.length,
    approved: previousSubmissions.filter(s => s.status === 'approved').length,
    pending: previousSubmissions.filter(s => s.status === 'pending').length,
    rejected: previousSubmissions.filter(s => s.status === 'rejected').length,
  };

  // Calculate total hours from previous submissions
  const totalHours = previousSubmissions
    .filter(submission => submission.status === 'approved')
    .reduce((total, submission) => {
      const [hours, minutes, seconds] = submission.time.split(':').map(Number);
      return total + hours + minutes / 60 + seconds / 3600;
    }, 0);

  // Filter previous submissions based on search query and status
  const filteredSubmissions = previousSubmissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'all':
        return <FileText className="h-4 w-4 text-gray-500" />;
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-growth" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'all':
        return 'جميع الحالات';
      case 'approved':
        return 'المهام المقبولة';
      case 'pending':
        return 'قيد المراجعة';
      case 'rejected':
        return 'المهام المرفوضة';
      default:
        return 'جميع الحالات';
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">إجمالي المهام</span>
              <div className="bg-gray-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-gradient-to-br from-white to-growth/5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-growth/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">المهام المعتمدة</span>
              <div className="bg-growth/10 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-growth" />
              </div>
            </div>
            <div className="text-2xl font-bold text-growth">{stats.approved}</div>
          </div>
          <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-yellow-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">قيد المراجعة</span>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          </div>
          <div className="bg-gradient-to-br from-white to-red-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-red-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">المهام المرفوضة</span>
              <div className="bg-red-100 p-2 rounded-lg">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
          </div>
        </div>

        {/* Total Hours Card */}
        <div className="bg-gradient-to-br from-white to-trust/5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8 mb-8 border border-trust/10">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-trust/10 p-2 rounded-lg">
                  <Info className="h-5 w-5 text-trust" />
                </div>
                <span className="text-lg font-medium text-gray-900">إجمالي الساعات التطوعية المعتمدة</span>
              </div>
              <div className="text-2xl font-bold text-trust">{totalHours.toFixed(1)} ساعة</div>
            </div>
          </div>
        </div>

        {/* Submissions List with Search */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`p-2 rounded-lg ${statusFilter === 'all'
                ? 'bg-gray-100'
                : statusFilter === 'approved'
                  ? 'bg-growth/10'
                  : statusFilter === 'pending'
                    ? 'bg-yellow-100'
                    : 'bg-red-100'
                }`}>
                {statusFilter === 'all' && <FileText className="h-6 w-6 text-gray-500" />}
                {statusFilter === 'approved' && <CheckCircle2 className="h-6 w-6 text-growth" />}
                {statusFilter === 'pending' && <AlertCircle className="h-6 w-6 text-yellow-500" />}
                {statusFilter === 'rejected' && <XCircle className="h-6 w-6 text-red-500" />}
              </div>
              <h2 className="text-2xl font-kaff text-trust">سجل الساعات التطوعية</h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث في السجلات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust w-64 transition-all duration-300"
                />
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust bg-white transition-all duration-300 hover:bg-gray-50"
                >
                  {getStatusIcon(statusFilter)}
                  <span className="text-gray-700">{getStatusText(statusFilter)}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'all' ? 'bg-gray-50' : ''
                        }`}
                    >
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">جميع الحالات</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('approved');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'approved' ? 'bg-gray-50' : ''
                        }`}
                    >
                      <CheckCircle2 className="h-4 w-4 text-growth" />
                      <span className="text-gray-700">المهام المقبولة</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('pending');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'pending' ? 'bg-gray-50' : ''
                        }`}
                    >
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-700">قيد المراجعة</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('rejected');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'rejected' ? 'bg-gray-50' : ''
                        }`}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-gray-700">المهام المرفوضة</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredSubmissions.map(submission => (
              <div
                key={submission.id}
                className={`rounded-xl p-6 hover:shadow-md transition-all duration-300 border ${submission.status === 'approved'
                  ? 'bg-gradient-to-br from-growth/5 to-white border-growth/10'
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
                  }`}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg ${submission.status === 'approved'
                      ? 'bg-growth/10'
                      : 'bg-gray-100'
                      }`}>
                      <FileText className={`h-6 w-6 ${submission.status === 'approved'
                        ? 'text-growth'
                        : 'text-gray-500'
                        }`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 text-lg">{submission.title}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {submission.status === 'approved' && <CheckCircle2 className="h-5 w-5 text-growth" />}
                        {submission.status === 'rejected' && <XCircle className="h-5 w-5 text-red-500" />}
                        {submission.status === 'pending' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                        <span className={`text-sm font-medium ${submission.status === 'approved' ? 'text-growth' :
                          submission.status === 'rejected' ? 'text-red-500' :
                            'text-yellow-500'
                          }`}>
                          {submission.status === 'approved' ? 'تمت الموافقة' :
                            submission.status === 'rejected' ? 'مرفوض' :
                              'قيد المراجعة'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                      <div className="bg-trust/10 text-trust px-4 py-2 rounded-lg flex items-center">
                        <Clock className="h-5 w-5 ml-2" />
                        <span className="font-medium">{submission.time}</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg flex items-center shadow-sm">
                        <Calendar className="h-5 w-5 ml-2 text-gray-500" />
                        <span className="text-gray-600">{new Date(submission.submittedAt).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <span className="text-gray-600">{submission.category}</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                      <p className="text-gray-600 leading-relaxed">
                        {submission.description}
                      </p>
                    </div>

                    {submission.status === 'rejected' && submission.feedback && (
                      <div className="mt-4 bg-gradient-to-br from-red-50 to-white rounded-lg p-4 border border-red-100">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <div className="bg-red-100 p-1.5 rounded-lg">
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <span className="font-medium text-red-500">سبب الرفض</span>
                        </div>
                        <p className="text-gray-600">
                          {submission.feedback}
                        </p>
                      </div>
                    )}

                    {submission.status === 'approved' && submission.feedback && (
                      <div className="mt-4 bg-gradient-to-br from-trust/5 to-white rounded-lg p-4 border border-trust/10">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <div className="bg-trust/10 p-1.5 rounded-lg">
                            <Info className="h-5 w-5 text-trust" />
                          </div>
                          <span className="font-medium text-trust">تعليق إدارة الموارد البشرية</span>
                        </div>
                        <p className="text-gray-600">
                          {submission.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteeringHoursLog; 
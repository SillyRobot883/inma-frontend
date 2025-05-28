import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit2,
  FileText,
  Info,
  Search,
  Upload,
  User,
  Users,
  XCircle,
} from 'lucide-react';

import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const VolunteeringHoursLog = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const dropdownRef = useRef(null);

  // Task categories for the edit form
  const taskCategories = [
    {
      id: '1',
      name: 'مهمة تخدم برامج أو مشاريع النادي',
      description: 'المهام التي تخدم أهداف النادي وبرامجه',
      examples: 'مثال: تنظيم ورشة عمل، إعداد محتوى تدريبي',
    },
    {
      id: '2',
      name: 'مهمة تخدم المشاركات المجتمعية',
      description: 'المهام التي تخدم المجتمع المحلي',
      examples: 'مثال: تنظيم حملة توعوية، المشاركة في فعاليات مجتمعية',
    },
    {
      id: '3',
      name: 'مهمة تخدم تطوير المهارات',
      description: 'المهام التي تساعد في تطوير مهارات الأعضاء',
      examples: 'مثال: حضور ورشة تدريبية، إعداد بحث',
    },
    {
      id: '4',
      name: 'مهمة تخدم الإدارة والتخطيط',
      description: 'المهام المتعلقة بإدارة وتخطيط أنشطة النادي',
      examples: 'مثال: إعداد خطة عمل، تنظيم اجتماعات',
    },
    {
      id: '5',
      name: 'مهمة تخدم التواصل والتسويق',
      description: 'المهام المتعلقة بالتواصل والتسويق للنادي',
      examples: 'مثال: إدارة وسائل التواصل الاجتماعي، تصميم مواد ترويجية',
    },
    {
      id: '6',
      name: 'مهمة تخدم التقييم والمتابعة',
      description: 'المهام المتعلقة بتقييم ومتابعة أنشطة النادي',
      examples: 'مثال: إعداد تقارير، متابعة تنفيذ المهام',
    },
  ];

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
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      title: 'دورة الأستعداد لسوق',
      description:
        'تنظيم وإعداد دورة تدريبية للأعضاء حول كيفية الاستعداد لسوق العمل، شملت الدورة محاضرات حول كتابة السيرة الذاتية ومهارات المقابلة الوظيفية',
      time: '08:00:00',
      submittedAt: '2025-01-29T17:00:00',
      status: 'approved',
      feedback: 'عمل ممتاز! شكراً على جهودك',
      category: 'مهمة تخدم برامج أو مشاريع النادي',
    },
    {
      id: 2,
      title: 'Create a simple blog using git camp',
      description:
        'إنشاء مدونة بسيطة باستخدام Git و GitHub، شملت المهمة تعليم الأعضاء أساسيات Git وإدارة المشاريع',
      time: '10:00:00',
      submittedAt: '2025-03-14T06:25:00',
      status: 'needs_info',
      feedback: 'يرجى إضافة تفاصيل أكثر عن المهمة وعدد المشاركين',
      category: 'مهمة تخدم برامج أو مشاريع النادي',
    },
    {
      id: 3,
      title: 'تنسيق اجتماع النادي',
      description:
        'تنسيق وإعداد اجتماع دوري لأعضاء النادي لمناقشة خطة العمل القادمة وتقييم النشاطات السابقة',
      time: '01:15:00',
      submittedAt: '2024-03-13T16:20:00',
      status: 'rejected',
      feedback: 'يرجى إضافة تفاصيل أكثر عن المهمة',
      category: 'مهمة تخدم المشاركات المجتمعية',
    },
  ]);

  // Calculate statistics
  const stats = {
    total: submissions.length,
    approved: submissions.filter((s) => s.status === 'approved').length,
    pending: submissions.filter((s) => s.status === 'pending').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
    needs_info: submissions.filter((s) => s.status === 'needs_info').length,
  };

  // Calculate total hours from previous submissions
  const totalHours = submissions
    .filter((submission) => submission.status === 'approved')
    .reduce((total, submission) => {
      const [hours, minutes, seconds] = submission.time.split(':').map(Number);
      return total + hours + minutes / 60 + seconds / 3600;
    }, 0);

  // Format total hours to Hrs:Mins:Secs
  const formatTotalHours = (decimalHours) => {
    const totalSeconds = Math.floor(decimalHours * 3600);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filter previous submissions based on search query and status
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      case 'needs_info':
        return <Info className="h-4 w-4 text-blue-500" />;
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
      case 'needs_info':
        return 'تحتاج معلومات';
      default:
        return 'جميع الحالات';
    }
  };

  const handleEditSubmission = (submission) => {
    // Initialize the editing state with the correct data structure
    const [hours, minutes, seconds] = (submission.time || '00:00:00').split(':');
    setEditingSubmission({
      ...submission,
      hours: hours || '00',
      minutes: minutes || '00',
      seconds: seconds || '00',
      attachments: submission.attachments || [],
      category: submission.category || taskCategories[0].id, // Default to first category if none selected
      memberComment: '', // Add new field for member's comment
    });
  };

  const handleSaveEdit = (updatedSubmission) => {
    // Format the time back to HH:MM:SS
    const formattedTime = `${updatedSubmission.hours.padStart(2, '0')}:${updatedSubmission.minutes.padStart(2, '0')}:${updatedSubmission.seconds.padStart(2, '0')}`;

    // Add the member's comment to the submission's comments array
    const updatedComments = [
      ...(updatedSubmission.comments || []),
      {
        id: Date.now(),
        user: user.name,
        text: updatedSubmission.memberComment,
        date: new Date().toLocaleString('ar-SA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ];

    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === updatedSubmission.id
          ? {
              ...updatedSubmission,
              time: formattedTime,
              status: 'pending', // Reset status to pending for HR review
              comments: updatedComments,
              memberComment: '', // Clear the comment field
            }
          : sub
      )
    );
    setEditingSubmission(null);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">تحتاج معلومات</span>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-500">{stats.needs_info}</div>
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
                <span className="text-lg font-medium text-gray-900">
                  إجمالي الساعات التطوعية المعتمدة
                </span>
              </div>
              <div className="text-2xl font-bold text-trust">{formatTotalHours(totalHours)}</div>
            </div>
          </div>
        </div>

        {/* Submissions List with Search */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div
                className={`p-2 rounded-lg ${
                  statusFilter === 'all'
                    ? 'bg-gray-100'
                    : statusFilter === 'approved'
                      ? 'bg-growth/10'
                      : statusFilter === 'pending'
                        ? 'bg-yellow-100'
                        : statusFilter === 'needs_info'
                          ? 'bg-blue-100'
                          : 'bg-red-100'
                }`}
              >
                {getStatusIcon(statusFilter)}
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
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'all' ? 'bg-gray-50' : ''}`}
                    >
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">جميع الحالات</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('approved');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'approved' ? 'bg-gray-50' : ''}`}
                    >
                      <CheckCircle2 className="h-4 w-4 text-growth" />
                      <span className="text-gray-700">المهام المقبولة</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('pending');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'pending' ? 'bg-gray-50' : ''}`}
                    >
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-700">قيد المراجعة</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('needs_info');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'needs_info' ? 'bg-gray-50' : ''}`}
                    >
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-700">تحتاج معلومات</span>
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('rejected');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-2 hover:bg-gray-50 transition-colors ${statusFilter === 'rejected' ? 'bg-gray-50' : ''}`}
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
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`rounded-xl p-6 hover:shadow-md transition-all duration-300 border ${
                  submission.status === 'approved'
                    ? 'bg-gradient-to-br from-growth/5 to-white border-growth/10'
                    : submission.status === 'needs_info'
                      ? 'bg-gradient-to-br from-blue-50 to-white border-blue-100'
                      : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
                }`}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="flex-shrink-0">
                    <div
                      className={`p-3 rounded-lg ${
                        submission.status === 'approved'
                          ? 'bg-growth/10'
                          : submission.status === 'needs_info'
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                      }`}
                    >
                      <FileText
                        className={`h-6 w-6 ${
                          submission.status === 'approved'
                            ? 'text-growth'
                            : submission.status === 'needs_info'
                              ? 'text-blue-500'
                              : 'text-gray-500'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 text-lg">{submission.title}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div
                          className={`flex items-center space-x-2 space-x-reverse px-3 py-1.5 rounded-lg ${
                            submission.status === 'approved'
                              ? 'bg-growth/10'
                              : submission.status === 'needs_info'
                                ? 'bg-blue-100'
                                : submission.status === 'rejected'
                                  ? 'bg-red-50'
                                  : 'bg-yellow-50'
                          }`}
                        >
                          {submission.status === 'approved' && (
                            <CheckCircle2 className="h-5 w-5 text-growth" />
                          )}
                          {submission.status === 'needs_info' && (
                            <Info className="h-5 w-5 text-blue-500" />
                          )}
                          {submission.status === 'rejected' && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          {submission.status === 'pending' && (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              submission.status === 'approved'
                                ? 'text-growth'
                                : submission.status === 'needs_info'
                                  ? 'text-blue-500'
                                  : submission.status === 'rejected'
                                    ? 'text-red-500'
                                    : 'text-yellow-500'
                            }`}
                          >
                            {submission.status === 'approved'
                              ? 'تمت الموافقة'
                              : submission.status === 'needs_info'
                                ? 'تحتاج معلومات'
                                : submission.status === 'rejected'
                                  ? 'مرفوض'
                                  : 'قيد المراجعة'}
                          </span>
                        </div>
                        {submission.status === 'needs_info' && (
                          <button
                            onClick={() => handleEditSubmission(submission)}
                            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                      <div className="bg-trust/10 text-trust px-4 py-2 rounded-lg flex items-center">
                        <Clock className="h-5 w-5 ml-2" />
                        <span className="font-medium">{submission.time}</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg flex items-center shadow-sm">
                        <Calendar className="h-5 w-5 ml-2 text-gray-500" />
                        <span className="text-gray-600">
                          {new Date(submission.submittedAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <div className="bg-gradient-to-br from-trust/10 to-white px-4 py-2 rounded-lg shadow-sm border border-trust/20">
                        <span className="text-trust font-medium">{submission.category}</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                      <p className="text-gray-600 leading-relaxed">{submission.description}</p>
                    </div>

                    {submission.status === 'needs_info' && submission.feedback && (
                      <div className="mt-4 bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <div className="bg-blue-100 p-1.5 rounded-lg">
                            <Info className="h-5 w-5 text-blue-500" />
                          </div>
                          <span className="font-medium text-blue-500">طلب معلومات إضافية</span>
                        </div>
                        <p className="text-gray-600">{submission.feedback}</p>
                      </div>
                    )}

                    {submission.status === 'rejected' && submission.feedback && (
                      <div className="mt-4 bg-gradient-to-br from-red-50 to-white rounded-lg p-4 border border-red-100">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <div className="bg-red-100 p-1.5 rounded-lg">
                            <XCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <span className="font-medium text-red-500">سبب الرفض</span>
                        </div>
                        <p className="text-gray-600">{submission.feedback}</p>
                      </div>
                    )}

                    {submission.status === 'approved' && submission.feedback && (
                      <div className="mt-4 bg-gradient-to-br from-trust/5 to-white rounded-lg p-4 border border-trust/10">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <div className="bg-trust/10 p-1.5 rounded-lg">
                            <Info className="h-5 w-5 text-trust" />
                          </div>
                          <span className="font-medium text-trust">
                            تعليق إدارة الموارد البشرية
                          </span>
                        </div>
                        <p className="text-gray-600">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Submission Modal */}
      {editingSubmission &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-kaff text-trust">تعديل النشاط التطوعي</h2>
                  <button
                    onClick={() => setEditingSubmission(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveEdit(editingSubmission);
                  }}
                >
                  <div className="space-y-6">
                    {/* HR Comment Section */}
                    {editingSubmission.feedback && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-blue-100 p-1.5 rounded-lg">
                            <Info className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 space-x-reverse mb-2">
                              <span className="font-medium text-blue-500">
                                طلب معلومات إضافية من إدارة الموارد البشرية
                              </span>
                              <span className="text-sm text-blue-400">
                                {new Date(editingSubmission.submittedAt).toLocaleString('ar-SA', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700">{editingSubmission.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Member Information Section */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <h3 className="font-medium text-gray-900">معلومات العضو</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <label className="block text-sm text-gray-500">اسم العضو</label>
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                          <div>
                            <label className="block text-sm text-gray-500">الرقم الجامعي</label>
                            <p className="text-sm font-medium text-gray-900">{user?.studentId}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Users className="h-5 w-5 text-gray-400" />
                          <div>
                            <label className="block text-sm text-gray-500">اللجنة التابع لها</label>
                            <p className="text-sm font-medium text-gray-900">{user?.committee}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          عنوان النشاط
                        </label>
                        <input
                          type="text"
                          value={editingSubmission.title || ''}
                          onChange={(e) =>
                            setEditingSubmission({ ...editingSubmission, title: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          عدد الساعات (ساعة:دقيقة:ثانية)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="relative">
                            <input
                              type="number"
                              value={editingSubmission.hours || '00'}
                              onChange={(e) =>
                                setEditingSubmission({
                                  ...editingSubmission,
                                  hours: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust text-center"
                              placeholder="00"
                              min="0"
                              required
                            />
                            <span className="absolute top-2 left-2 text-gray-400">س</span>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={editingSubmission.minutes || '00'}
                              onChange={(e) =>
                                setEditingSubmission({
                                  ...editingSubmission,
                                  minutes: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust text-center"
                              placeholder="00"
                              min="0"
                              max="59"
                              required
                            />
                            <span className="absolute top-2 left-2 text-gray-400">د</span>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              value={editingSubmission.seconds || '00'}
                              onChange={(e) =>
                                setEditingSubmission({
                                  ...editingSubmission,
                                  seconds: e.target.value,
                                })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust text-center"
                              placeholder="00"
                              min="0"
                              max="59"
                              required
                            />
                            <span className="absolute top-2 left-2 text-gray-400">ث</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Task Categories */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تصنيف النشاط التطوعي
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {taskCategories.map((category) => (
                          <div
                            key={category.id}
                            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              editingSubmission.category === category.id.toString()
                                ? 'border-trust bg-trust/5'
                                : 'border-gray-200 hover:border-trust/50'
                            }`}
                            onClick={() =>
                              setEditingSubmission({
                                ...editingSubmission,
                                category: category.id.toString(),
                              })
                            }
                          >
                            <div className="flex items-start space-x-3 space-x-reverse">
                              <div
                                className={`w-5 h-5 rounded-full border-2 mt-1 flex-shrink-0 ${
                                  editingSubmission.category === category.id.toString()
                                    ? 'border-trust bg-trust'
                                    : 'border-gray-300'
                                }`}
                              >
                                {editingSubmission.category === category.id.toString() && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{category.name}</h4>
                                <p className="text-sm text-gray-500">{category.description}</p>
                                <p className="text-sm text-trust mt-1">{category.examples}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        وصف النشاط التطوعي
                      </label>
                      <textarea
                        value={editingSubmission.description || ''}
                        onChange={(e) =>
                          setEditingSubmission({
                            ...editingSubmission,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المرفقات
                      </label>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <label className="cursor-pointer bg-trust/10 hover:bg-trust/20 text-trust px-4 py-2 rounded-md transition-colors">
                          <span className="flex items-center">
                            <Upload className="h-5 w-5 ml-2" />
                            إضافة ملف
                          </span>
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setEditingSubmission((prev) => ({
                                ...prev,
                                attachments: [...(prev.attachments || []), ...files],
                              }));
                            }}
                          />
                        </label>
                        <div className="text-sm text-gray-500">
                          {editingSubmission.attachments?.length > 0
                            ? `${editingSubmission.attachments.length} ملفات مرفقة`
                            : 'لا توجد مرفقات'}
                        </div>
                      </div>
                      {editingSubmission.attachments?.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {editingSubmission.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 space-x-reverse bg-gray-50 rounded-lg p-3"
                            >
                              <FileText className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-trust hover:text-trust-dark cursor-pointer">
                                {file.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        رد على طلب المعلومات الإضافية
                      </label>
                      <textarea
                        value={editingSubmission.memberComment || ''}
                        onChange={(e) =>
                          setEditingSubmission({
                            ...editingSubmission,
                            memberComment: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                        placeholder="أضف ردك على طلب المعلومات الإضافية هنا..."
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        سيتم إرسال ردك مع التعديلات إلى إدارة الموارد البشرية للمراجعة
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3 space-x-reverse">
                      <button
                        type="button"
                        onClick={() => setEditingSubmission(null)}
                        className="btn-secondary"
                      >
                        إلغاء
                      </button>
                      <button type="submit" className="btn-primary">
                        حفظ التعديلات
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.getElementById('modal-root')
        )}
    </Layout>
  );
};

export default VolunteeringHoursLog;

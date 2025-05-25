import { useState } from 'react';
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
  Building2,
  Filter,
  Search,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Eye,
  MessageCircle,
  Tag,
  CalendarDays,
  Clock4,
  Pencil
} from 'lucide-react';

const HRDashboard = () => {
  const { clubId } = useParams();
  const { user, currentClub } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New state variables
  const [editingHours, setEditingHours] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [actionComment, setActionComment] = useState('');
  const [editedHours, setEditedHours] = useState('');
  const [editComment, setEditComment] = useState('');

  // Helper function to format hours
  const formatHours = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  };

  // Dummy data for submissions with more tasks
  const submissions = [
    {
      id: 1,
      member: 'فهد السالم',
      title: 'تنسيق فعالية النادي',
      status: 'pending',
      hours: '04:00:00',
      date: '2024-03-16',
      description: 'تم تنسيق فعالية النادي التقنية التي أقيمت في المبنى الرئيسي',
      category: 'مهمة تخدم برامج أو مشاريع النادي',
      attachments: ['presentation.pdf', 'schedule.xlsx'],
      comments: [
        { id: 1, user: 'سارة', text: 'الرجاء إضافة صور الفعالية', date: '2024-03-16 14:30' }
      ]
    },
    {
      id: 2,
      member: 'نورة العتيبي',
      title: 'إعداد التقرير الشهري',
      status: 'approved',
      hours: '02:30:00',
      date: '2024-03-15',
      description: 'تم إعداد التقرير الشهري للنادي وتوثيق جميع الفعاليات',
      category: 'مهمة تخدم الأنشطة الداخلية في النادي',
      attachments: ['monthly_report.pdf'],
      comments: []
    },
    {
      id: 3,
      member: 'عبدالله محمد',
      title: 'تنظيم ورشة عمل البرمجة',
      status: 'needs_info',
      hours: '03:00:00',
      date: '2024-03-14',
      description: 'تنظيم ورشة عمل البرمجة وتجهيز المحتوى التدريبي',
      category: 'مهمة تخدم برامج أو مشاريع النادي',
      attachments: ['workshop_material.pdf'],
      comments: [
        { id: 2, user: 'أحمد', text: 'نحتاج تفاصيل عن عدد المشاركين', date: '2024-03-14 16:45' }
      ]
    },
    {
      id: 4,
      member: 'سارة الأحمد',
      title: 'تصميم شعار النادي',
      status: 'approved',
      hours: '05:00:00',
      date: '2024-03-13',
      description: 'تصميم شعار جديد للنادي مع دليل الهوية البصرية',
      category: 'مهمة تخدم الأنشطة الداخلية في النادي',
      attachments: ['logo_files.zip', 'brand_guidelines.pdf'],
      comments: []
    },
    {
      id: 5,
      member: 'محمد العمري',
      title: 'تطوير موقع النادي',
      status: 'pending',
      hours: '08:00:00',
      date: '2024-03-12',
      description: 'تطوير وتحديث الموقع الإلكتروني للنادي',
      category: 'مهمة تخدم مبادرات النادي',
      attachments: ['website_updates.docx'],
      comments: [
        { id: 3, user: 'خالد', text: 'هل يمكن إضافة صور للتحديثات؟', date: '2024-03-12 11:20' }
      ]
    },
    {
      id: 6,
      member: 'ريم السعيد',
      title: 'تنظيم لقاء أعضاء النادي',
      status: 'needs_info',
      hours: '02:00:00',
      date: '2024-03-11',
      description: 'تنظيم اللقاء الشهري لأعضاء النادي',
      category: 'مهمة تخدم الأنشطة الداخلية في النادي',
      attachments: ['meeting_agenda.pdf'],
      comments: [
        { id: 4, user: 'نورة', text: 'نحتاج تأكيد موعد القاعة', date: '2024-03-11 09:15' }
      ]
    },
    {
      id: 7,
      member: 'خالد الغامدي',
      title: 'إعداد محتوى تدريبي',
      status: 'approved',
      hours: '06:00:00',
      date: '2024-03-10',
      description: 'إعداد محتوى تدريبي لورشة العمل القادمة',
      category: 'مهمة تخدم برامج أو مشاريع النادي',
      attachments: ['training_material.pdf', 'exercises.docx'],
      comments: []
    },
    {
      id: 8,
      member: 'لينا الصالح',
      title: 'تنسيق مع الرعاة',
      status: 'pending',
      hours: '03:30:00',
      date: '2024-03-09',
      description: 'التنسيق مع الرعاة للفعالية القادمة',
      category: 'مهمة تخدم المشاركات خارج الجامعة',
      attachments: ['sponsorship_proposal.pdf'],
      comments: [
        { id: 5, user: 'فهد', text: 'هل تم تأكيد موعد الاجتماع؟', date: '2024-03-09 13:40' }
      ]
    },
    {
      id: 9,
      member: 'عمر الزهراني',
      title: 'تحديث قاعدة البيانات',
      status: 'needs_info',
      hours: '04:00:00',
      date: '2024-03-08',
      description: 'تحديث قاعدة بيانات أعضاء النادي',
      category: 'مهمة تخدم الأنشطة الداخلية في النادي',
      attachments: ['database_updates.xlsx'],
      comments: [
        { id: 6, user: 'سارة', text: 'نحتاج تفاصيل التحديثات', date: '2024-03-08 15:10' }
      ]
    },
    {
      id: 10,
      member: 'منى الحربي',
      title: 'تصوير فعالية النادي',
      status: 'approved',
      hours: '03:00:00',
      date: '2024-03-07',
      description: 'توثيق وتصوير فعالية النادي الأخيرة',
      category: 'مهمة تخدم المشاركات المجتمعية',
      attachments: ['event_photos.zip', 'photo_release.pdf'],
      comments: []
    },
    {
      id: 11,
      member: 'أحمد العبدلي',
      title: 'تنظيم معرض المشاريع',
      status: 'needs_info',
      hours: '05:00:00',
      date: '2024-03-06',
      description: 'تنظيم معرض المشاريع السنوي للنادي',
      category: 'مهمة تخدم برامج أو مشاريع النادي',
      attachments: ['exhibition_plan.pdf'],
      comments: [
        { id: 7, user: 'خالد', text: 'الرجاء إضافة قائمة بالمشاريع المشاركة وتفاصيل كل مشروع', date: '2024-03-06 10:30' },
        { id: 8, user: 'أحمد العبدلي', text: 'تم إضافة قائمة المشاريع وتفاصيلها في المرفقات الجديدة', date: '2024-03-06 15:45' },
        { id: 9, user: 'خالد', text: 'شكراً على التحديث. هل يمكن إضافة صور للمشاريع أيضاً؟', date: '2024-03-06 16:20' },
        { id: 10, user: 'أحمد العبدلي', text: 'تم إضافة صور المشاريع في المرفقات', date: '2024-03-06 17:30' }
      ],
      updatedAttachments: ['exhibition_plan.pdf', 'projects_list.xlsx', 'projects_photos.zip']
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
        return <CheckCircle className="h-4 w-4" />;
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

  const filteredSubmissions = submissions
    .filter(submission => filterStatus === 'all' || submission.status === filterStatus)
    .filter(submission => 
      searchQuery === '' || 
      submission.title.includes(searchQuery) || 
      submission.member.includes(searchQuery) ||
      submission.category.includes(searchQuery)
    );

  // Action handlers
  const handleEditHours = (submission) => {
    setEditingHours(submission);
    const [hours, minutes, seconds] = submission.hours.split(':').map(Number);
    setEditedHours({
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    });
    setEditComment('');
  };

  const handleSaveHours = () => {
    if (!editingHours.comments) {
      alert('الرجاء إضافة تعليق عند تعديل الساعات');
      return;
    }
    // Rest of the save logic
    const updatedSubmissions = submissions.map(submission => {
      if (submission.id === editingHours.id) {
        return {
          ...submission,
          hours: editingHours.hours,
          comments: editingHours.comments
        };
      }
      return submission;
    });
    setSubmissions(updatedSubmissions);
    setEditingHours(null);
  };

  const handleAction = (type, submission) => {
    setActionModal({ type, submission });
    setActionComment('');
  };

  const handleSubmitAction = () => {
    // Only require comment for needs_info and deny actions
    if ((actionModal.type === 'needs_info' || actionModal.type === 'deny') && !actionComment.trim()) return;
    
    // Here you would typically make an API call to update the status
    // For now, we'll just close the modal
    setActionModal(null);
    setActionComment('');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">الساعات المعلقة</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {submissions.filter(s => s.status === 'pending').length}
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
                  {submissions.filter(s => s.status === 'needs_info').length}
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
                  {submissions.filter(s => s.status === 'approved').length}
                </p>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  مهام مكتملة
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
                    const totalSeconds = submissions.reduce((acc, curr) => {
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

        {/* Submissions List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-kaff font-bold text-trust">طلبات اعتماد الساعات</h2>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust w-64 transition-all duration-300"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust text-sm font-medium text-gray-700 transition-all duration-300"
                >
                  <option value="all" className="text-sm font-medium text-gray-700">جميع الحالات</option>
                  <option value="pending" className="text-sm font-medium text-gray-700">قيد المراجعة</option>
                  <option value="needs_info" className="text-sm font-medium text-gray-700">تحتاج معلومات</option>
                  <option value="approved" className="text-sm font-medium text-gray-700">تمت الموافقة</option>
                </select>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredSubmissions.map((submission) => (
              <div 
                key={submission.id} 
                className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                  submission.status === 'approved' 
                    ? 'bg-growth/5 border-r-4 border-r-growth' 
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full ${
                        submission.status === 'approved' 
                          ? 'bg-growth/10' 
                          : 'bg-trust/10'
                      } flex items-center justify-center`}>
                        <FileText className={`h-6 w-6 ${
                          submission.status === 'approved' 
                            ? 'text-growth' 
                            : 'text-trust'
                        }`} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <h3 className="text-lg font-medium text-gray-900">
                          {submission.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(submission.category)}`}>
                          {submission.category}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-3 space-x-reverse text-sm text-gray-500">
                        <span className="flex items-center">
                          <UserCircle className="h-4 w-4 ml-1" />
                          {submission.member}
                        </span>
                        <span>•</span>
                        <span className="flex items-center bg-trust/5 px-3 py-1 rounded-full font-medium text-trust">
                          <Clock4 className="h-4 w-4 ml-1" />
                          {submission.hours}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <CalendarDays className="h-4 w-4 ml-1" />
                          {submission.date}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {submission.description}
                      </p>
                      {submission.attachments.length > 0 && (
                        <div className="mt-2 flex items-center space-x-2 space-x-reverse">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {submission.attachments.map((attachment, index) => (
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
                      {submission.comments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {submission.comments.map((comment) => (
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
                      submission.status === 'approved' 
                        ? 'bg-growth text-white' 
                        : getStatusColor(submission.status)
                    }`}>
                      {getStatusIcon(submission.status)}
                      <span className="mr-1">{getStatusText(submission.status)}</span>
                    </span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          submission.status === 'approved'
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-400 hover:text-trust hover:bg-gray-50'
                        }`}
                        onClick={() => submission.status !== 'approved' && handleEditHours(submission)}
                        disabled={submission.status === 'approved'}
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button 
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          submission.status === 'approved'
                            ? 'text-growth/50 cursor-not-allowed'
                            : 'text-gray-400 hover:text-trust hover:bg-gray-50'
                        }`}
                        onClick={() => submission.status !== 'approved' && handleAction('approve', submission)}
                        disabled={submission.status === 'approved'}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button 
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          submission.status === 'approved'
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-400 hover:text-yellow-600 hover:bg-gray-50'
                        }`}
                        onClick={() => submission.status !== 'approved' && handleAction('needs_info', submission)}
                        disabled={submission.status === 'approved'}
                      >
                        <AlertTriangle className="h-5 w-5" />
                      </button>
                      <button 
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          submission.status === 'approved'
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-400 hover:text-red-600 hover:bg-gray-50'
                        }`}
                        onClick={() => submission.status !== 'approved' && handleAction('deny', submission)}
                        disabled={submission.status === 'approved'}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-kaff text-trust">تفاصيل النشاط التطوعي</h2>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium text-gray-900">{selectedTask.title}</h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      getStatusColor(selectedTask.status)
                    }`}>
                      {getStatusIcon(selectedTask.status)}
                      <span className="mr-1">{getStatusText(selectedTask.status)}</span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                    <span className="flex items-center">
                      <UserCircle className="h-4 w-4 ml-1" />
                      {selectedTask.member}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getCategoryColor(selectedTask.category)
                    }`}>
                      {selectedTask.category}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">الوصف</h4>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">معلومات إضافية</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center text-sm">
                        <Clock4 className="h-4 w-4 text-gray-400 ml-2" />
                        <div>
                          <p className="text-gray-500">عدد الساعات</p>
                          <p className="font-medium text-gray-900">{selectedTask.hours}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 text-gray-400 ml-2" />
                        <div>
                          <p className="text-gray-500">تاريخ التقديم</p>
                          <p className="font-medium text-gray-900">{selectedTask.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedTask.attachments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">المرفقات</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedTask.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse bg-gray-50 rounded-lg p-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-trust hover:text-trust-dark cursor-pointer">
                            {attachment}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTask.comments.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">التعليقات</h4>
                    <div className="space-y-3">
                      {selectedTask.comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{comment.user}</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-gray-600">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-100">
                  <button className="btn-secondary">
                    إضافة تعليق
                  </button>
                  <button className={`btn-primary ${
                    selectedTask.status === 'approved' ? 'bg-growth hover:bg-growth-dark' : ''
                  }`}>
                    {selectedTask.status === 'approved' ? 'تم الموافقة' : 'موافقة'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Hours Modal */}
      {editingHours && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-kaff text-trust">تعديل الساعات</h2>
                <button 
                  onClick={() => setEditingHours(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عدد الساعات (HH:MM:SS)
                  </label>
                  <div className="grid grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        ثواني
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={editedHours.seconds}
                        onChange={(e) => setEditedHours({ ...editedHours, seconds: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust text-center"
                        placeholder="00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        دقائق
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={editedHours.minutes}
                        onChange={(e) => setEditedHours({ ...editedHours, minutes: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust text-center"
                        placeholder="00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        ساعات
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editedHours.hours}
                        onChange={(e) => setEditedHours({ ...editedHours, hours: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust text-center"
                        placeholder="00"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ما سبب تعديل الساعات؟
                  </label>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust h-24 resize-none"
                    placeholder="أضف تعليقاً..."
                  />
                </div>
                <div className="flex justify-end space-x-3 space-x-reverse">
                  <button
                    onClick={() => setEditingHours(null)}
                    className="btn-secondary"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSaveHours}
                    className="btn-primary"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal (Needs Info/Deny) */}
      {actionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-kaff text-trust">
                  {actionModal.type === 'needs_info' ? 'طلب معلومات إضافية' : 
                   actionModal.type === 'deny' ? 'رفض الطلب' : 'موافقة على الطلب'}
                </h2>
                <button 
                  onClick={() => setActionModal(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {actionModal.type === 'needs_info' ? 'ما هي المعلومات المطلوبة؟' : 
                     actionModal.type === 'deny' ? 'سبب الرفض' : 'تعليق (اختياري)'}
                  </label>
                  <textarea
                    value={actionComment}
                    onChange={(e) => setActionComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust h-24 resize-none"
                    placeholder={actionModal.type === 'approve' ? 'أضف تعليقاً (اختياري)...' : 'اكتب السبب هنا...'}
                    required={actionModal.type !== 'approve'}
                  />
                </div>
                <div className="flex justify-end space-x-3 space-x-reverse">
                  <button
                    onClick={() => setActionModal(null)}
                    className="btn-secondary"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSubmitAction}
                    className={`btn-primary ${
                      (actionModal.type !== 'approve' && !actionComment.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={actionModal.type !== 'approve' && !actionComment.trim()}
                  >
                    {actionModal.type === 'approve' ? 'موافقة' : 'تأكيد'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HRDashboard; 
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  UserX,
  Trash2,
  AlertTriangle,
  Upload
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedClub, setEditedClub] = useState({
    name: '',
    description: '',
    establishmentDate: '',
    category: 'عام',
    supervisor: '',
    supervisorPhone: '',
    currentLeader: '',
    leaderPhone: '',
    leaderEmail: '',
    logo: null
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteReason, setDeleteReason] = useState('');

  useEffect(() => {
    if (!clubId) {
      setError('Club ID is missing');
      setIsLoading(false);
      return;
    }

    // fetch the club data from your API
    try {
      const parsedClubId = parseInt(clubId);
      if (isNaN(parsedClubId)) {
        throw new Error('Invalid club ID');
      }
      // Initialize editedClub with the current club data
      setEditedClub({
        name: club.name,
        description: club.description,
        establishmentDate: club.establishmentDate,
        category: club.category,
        supervisor: club.supervisor,
        currentLeader: club.currentLeader,
        supervisorPhone: club.supervisorPhone || '',
        leaderPhone: club.leaderPhone || '',
        leaderEmail: club.leaderEmail || '',
        logo: club.logo
      });
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [clubId]);

  const handleEditClub = () => {
    if (isEditing) {
      handleCancelEdit();
    } else {
      setIsEditing(true);
      setActiveTab('overview');
    }
  };

  const handleSaveEdit = () => {
    // Here you would typically make an API call to save the changes
    // For now, we'll just update the local state
    setClub(prev => ({
      ...prev,
      name: editedClub.name,
      description: editedClub.description,
      establishmentDate: editedClub.establishmentDate,
      category: editedClub.category,
      supervisor: editedClub.supervisor,
      currentLeader: editedClub.currentLeader,
      supervisorPhone: editedClub.supervisorPhone,
      leaderPhone: editedClub.leaderPhone,
      leaderEmail: editedClub.leaderEmail,
      logo: editedClub.logo
    }));
    
    // Show success message or notification here
    
    // Exit edit mode
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editedClub to current club data
    setEditedClub({
      name: club.name,
      description: club.description,
      establishmentDate: club.establishmentDate,
      category: club.category,
      supervisor: club.supervisor,
      currentLeader: club.currentLeader,
      supervisorPhone: club.supervisorPhone || '',
      leaderPhone: club.leaderPhone || '',
      leaderEmail: club.leaderEmail || '',
      logo: club.logo
    });
  };

  const handleDeleteClub = () => {
    // Here you would typically make an API call to delete the club
    console.log('Deleting club:', clubId);
    console.log('Reason:', deleteReason);
    setShowDeleteConfirmation(false);
    setDeleteStep(1);
    setDeleteConfirmation('');
    setDeleteReason('');
    navigate('/inma-dashboard');
  };

  const resetDeleteProcess = () => {
    setShowDeleteConfirmation(false);
    setDeleteStep(1);
    setDeleteConfirmation('');
    setDeleteReason('');
  };

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

  // Format date in Hijri
  const formatHijriDate = (date) => {
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
    return hijriDate.replace('١٤٤٥', '١٤٤٦'); // Replace 1445 with 1446
  };

  // Dummy data for club details
  const club = {
    id: clubId ? parseInt(clubId) : null,
    name: 'نادي التطوير',
    logo: clubId ? `/src/assets/club-${clubId}.png` : '/src/assets/1-06.png',
    description: 'نادي التطوير هو نادي طلابي يهدف إلى تطوير مهارات الطلاب في مجال التطوير البرمجي وتنظيم الفعاليات التقنية.',
    establishmentDate: '2023-01-15',
    category: 'عام',
    supervisor: 'د. أحمد محمد',
    supervisorPhone: '0501234567',
    currentLeader: 'محمد عبدالله السالم',
    leaderPhone: '0507654321',
    leaderEmail: 'mohammed.salem@sm.imamu.edu.sa',
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
    ]
  };

  const filteredActivity = club.recentActivity.filter(activity => {
    const matchesStatus = taskFilterStatus === 'all' || activity.status === taskFilterStatus;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.member.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <AdminLayout isInmaAdmin={isInmaAdmin}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-trust"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout isInmaAdmin={isInmaAdmin}>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="text-lg text-gray-700">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="btn-primary"
          >
            العودة للخلف
          </button>
        </div>
      </AdminLayout>
    );
  }

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
        <div className={`bg-gradient-to-r from-trust/5 to-trust/10 rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md ${isEditing ? 'ring-2 ring-trust ring-opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative">
                {isEditing ? (
                  <div className="relative">
                    <div className="h-20 w-20 rounded-xl shadow-md ring-2 ring-trust overflow-hidden relative group">
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:opacity-50"
                        src={editedClub.logo || club.logo}
                        alt={editedClub.name || club.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/src/assets/1-06.png';
                        }}
                      />
                      <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="h-6 w-6 text-white" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setEditedClub(prev => ({ ...prev, logo: reader.result }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="absolute top-0 right-0 bg-trust text-white text-xs px-2 py-1 rounded-bl-lg">
                      تعديل
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
              <div>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={editedClub.name}
                      onChange={(e) => setEditedClub(prev => ({ ...prev, name: e.target.value }))}
                      className="text-3xl font-kaff font-bold text-trust mb-1 w-full bg-transparent border-b-2 border-trust focus:outline-none focus:border-trust pr-16"
                    />
                    <div className="absolute top-0 right-0 bg-trust text-white text-xs px-2 py-1 rounded-bl-lg">
                      تعديل
                    </div>
                  </div>
                ) : (
                  <h2 className="text-3xl font-kaff font-bold text-trust mb-1">{club.name}</h2>
                )}
                <div className="flex items-center space-x-2 space-x-reverse mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-trust/10 text-trust">
                    {club.activeMembers} عضو نشط
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-growth/10 text-growth">
                    {club.totalHours} ساعة مكتملة
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    <Clock4 className="h-3 w-3 ml-1" />
                    آخر نشاط: {formatHijriDate(club.recentActivity[0]?.date || '')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              {isInmaAdmin && (
                <>
                  <button
                    onClick={handleEditClub}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isEditing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-trust/10 text-trust hover:bg-trust/20'
                    }`}
                  >
                    <Edit2 className="h-5 w-5 ml-2" />
                    {isEditing ? 'إلغاء التعديل' : 'تعديل'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirmation(true)}
                    className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <Trash2 className="h-5 w-5 ml-2" />
                    حذف النادي
                  </button>
                </>
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
                {/* Combined Edit Box */}
                <div className={`bg-white rounded-xl p-6 shadow-sm ${isEditing ? 'ring-2 ring-trust ring-opacity-50' : ''}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 rounded-full p-2">
                        <Building2 className="h-5 w-5 text-trust" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900">معلومات النادي</h4>
                    </div>
                    {isEditing && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-trust text-white">
                        <Edit2 className="h-3 w-3 ml-1" />
                        وضع التعديل
                      </span>
                    )}
                  </div>

                  {/* Basic Information */}
                  <div className="mb-8">
                    <h5 className="text-md font-medium text-gray-700 mb-4">المعلومات الأساسية</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">الوصف</p>
                        {isEditing ? (
                          <textarea
                            value={editedClub.description}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            rows={3}
                          />
                        ) : (
                          <p className="text-gray-700">{club.description}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">تاريخ التأسيس</p>
                        {isEditing ? (
                          <input
                            type="date"
                            value={editedClub.establishmentDate}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, establishmentDate: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                          />
                        ) : (
                          <p className="text-gray-700">{club.establishmentDate}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">التصنيف</p>
                        {isEditing ? (
                          <select
                            value={editedClub.category}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                          >
                            <option value="عام">عام</option>
                            <option value="تخصصي">تخصصي</option>
                          </select>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-trust/10 text-trust">
                            {club.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Supervisor Information */}
                  <div className="mb-8">
                    <h5 className="text-md font-medium text-gray-700 mb-4">معلومات المشرف</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">اسم المشرف</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedClub.supervisor}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, supervisor: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                          />
                        ) : (
                          <p className="text-gray-700">{club.supervisor}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">رقم الهاتف</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editedClub.supervisorPhone}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, supervisorPhone: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="05xxxxxxxx"
                            pattern="[0-9]{10}"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-700">{club.supervisorPhone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Club Leader Information */}
                  <div className="mb-8">
                    <h5 className="text-md font-medium text-gray-700 mb-4">معلومات قائد النادي</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">اسم قائد النادي</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedClub.currentLeader}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, currentLeader: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                          />
                        ) : (
                          <p className="text-gray-700">{club.currentLeader}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">رقم الهاتف</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editedClub.leaderPhone}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, leaderPhone: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="05xxxxxxxx"
                            pattern="[0-9]{10}"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-700">{club.leaderPhone}</p>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 mb-2">البريد الإلكتروني</p>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editedClub.leaderEmail}
                            onChange={(e) => setEditedClub(prev => ({ ...prev, leaderEmail: e.target.value }))}
                            className="w-full px-3 py-2 border-2 border-trust rounded-lg focus:ring-2 focus:ring-trust focus:border-trust"
                            placeholder="example@sm.imamu.edu.sa"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-700">{club.leaderEmail}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit Actions */}
                  {isEditing && (
                    <div className="flex justify-end space-x-3 space-x-reverse mt-6 pt-6 border-t border-gray-100">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-trust text-white rounded-lg hover:bg-trust-dark transition-colors"
                      >
                        حفظ التغييرات
                      </button>
                    </div>
                  )}
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-kaff text-trust">تأكيد حذف النادي</h2>
                  <button
                    onClick={resetDeleteProcess}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                {deleteStep === 1 && (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-center text-gray-700">
                        هل أنت متأكد من رغبتك في حذف النادي{" "}
                        <span className="font-bold text-trust">{club.name}</span>؟
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 ml-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-yellow-800">تنبيه هام</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع بيانات النادي نهائياً.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-3 space-x-reverse pt-2">
                        <button
                          onClick={resetDeleteProcess}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={() => setDeleteStep(2)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5 ml-2" />
                          متابعة
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {deleteStep === 2 && (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-center text-gray-700">
                        يرجى كتابة اسم النادي <span className="font-bold text-trust">{club.name}</span> للتأكيد
                      </p>
                      <div>
                        <input
                          type="text"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="اكتب اسم النادي هنا"
                        />
                      </div>
                      <div className="flex justify-center space-x-3 space-x-reverse pt-2">
                        <button
                          onClick={() => setDeleteStep(1)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          رجوع
                        </button>
                        <button
                          onClick={() => setDeleteStep(3)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={deleteConfirmation !== club.name}
                        >
                          <Trash2 className="h-5 w-5 ml-2" />
                          تأكيد الحذف
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {deleteStep === 3 && (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-center text-gray-700">
                        يرجى توضيح سبب حذف النادي
                      </p>
                      <div>
                        <textarea
                          value={deleteReason}
                          onChange={(e) => setDeleteReason(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[100px] resize-y"
                          placeholder="اكتب سبب الحذف هنا..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-center space-x-3 space-x-reverse pt-2">
                        <button
                          onClick={() => setDeleteStep(2)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          رجوع
                        </button>
                        <button
                          onClick={handleDeleteClub}
                          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!deleteReason.trim()}
                        >
                          <Trash2 className="h-5 w-5 ml-2" />
                          تأكيد الحذف
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClubDetails; 
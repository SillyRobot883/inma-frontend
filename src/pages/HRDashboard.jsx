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
  Info
} from 'lucide-react';

const HRDashboard = () => {
  const { clubId } = useParams();
  const { user, currentClub } = useAuth();

  // Dummy data for submissions
  const submissions = [
    {
      id: 1,
      member: 'فهد السالم',
      title: 'تنسيق فعالية النادي',
      status: 'pending',
      hours: '04:00',
      date: '2024-03-16',
      description: 'تم تنسيق فعالية النادي التقنية التي أقيمت في المبنى الرئيسي',
      category: 'فعالية'
    },
    {
      id: 2,
      member: 'نورة العتيبي',
      title: 'إعداد التقرير الشهري',
      status: 'approved',
      hours: '02:30',
      date: '2024-03-15',
      description: 'تم إعداد التقرير الشهري للنادي وتوثيق جميع الفعاليات',
      category: 'تقرير'
    },
    {
      id: 3,
      member: 'عبدالله محمد',
      title: 'تنظيم ورشة عمل',
      status: 'needs_info',
      hours: '03:00',
      date: '2024-03-14',
      description: 'تنظيم ورشة عمل البرمجة',
      category: 'ورشة عمل'
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

  return (
    <Layout>
      <div className="space-y-8">

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">المهام المعلقة</p>
                <p className="text-2xl font-medium text-yellow-600 mt-1">
                  {submissions.filter(s => s.status === 'pending').length}
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">تحتاج معلومات</p>
                <p className="text-2xl font-medium text-blue-600 mt-1">
                  {submissions.filter(s => s.status === 'needs_info').length}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Info className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">تمت الموافقة</p>
                <p className="text-2xl font-medium text-growth mt-1">
                  {submissions.filter(s => s.status === 'approved').length}
                </p>
              </div>
              <div className="bg-growth/10 rounded-full p-3">
                <CheckCircle2 className="h-6 w-6 text-growth" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">إجمالي الساعات</p>
                <p className="text-2xl font-medium text-trust mt-1">
                  {submissions.reduce((acc, curr) => {
                    const [hours, minutes] = curr.hours.split(':').map(Number);
                    return acc + hours + minutes / 60;
                  }, 0).toFixed(1)}
                </p>
              </div>
              <div className="bg-trust/10 rounded-full p-3">
                <Clock className="h-6 w-6 text-trust" />
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-kaff text-trust">المهام المقدمة</h2>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث..."
                    className="pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust w-64"
                  />
                </div>
                <button className="btn-secondary">
                  <Filter className="h-5 w-5 ml-2" />
                  تصفية
                </button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {submissions.map((submission) => (
              <div 
                key={submission.id} 
                className={`p-6 ${
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
                        <UserCircle className={`h-6 w-6 ${
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
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {submission.category}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {submission.member} • {submission.hours} • {submission.date}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {submission.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      submission.status === 'approved' 
                        ? 'bg-growth text-white' 
                        : getStatusColor(submission.status)
                    }`}>
                      {getStatusIcon(submission.status)}
                      <span className="mr-1">{getStatusText(submission.status)}</span>
                    </span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                        <Info className="h-5 w-5" />
                      </button>
                      <button className={`p-2 rounded-lg hover:bg-gray-50 ${
                        submission.status === 'approved' 
                          ? 'text-growth hover:text-growth' 
                          : 'text-gray-400 hover:text-gray-500'
                      }`}>
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
                        <AlertTriangle className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
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
    </Layout>
  );
};

export default HRDashboard; 
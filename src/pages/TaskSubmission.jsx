import { useState } from 'react';
import { 
  Clock, 
  Calendar,
  Upload,
  CheckCircle2,
  XCircle,
  ClockIcon,
  FileText,
  ListFilter,
  User,
  Users,
  BookOpen,
  Info
} from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const TaskSubmission = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hours: '00',
    minutes: '00',
    seconds: '00',
    category: '',
    attachments: []
  });

  // Updated member info with the provided data
  const memberInfo = {
    name: 'عبدالعزيز محمد الكثيري',
    studentId: '444002181',
    committee: 'لجنة البرامج والفعاليات'
  };

  // Updated task history with the correct user name
  const taskHistory = [
    {
      id: 1,
      title: 'تنظيم فعالية نادي البرمجة',
      time: '03:00:00',
      submittedAt: '2024-03-15T14:30:00',
      status: 'approved',
      feedback: 'عمل ممتاز! شكراً على جهودك'
    },
    {
      id: 2,
      title: 'إعداد محتوى تدريبي',
      time: '02:30:00',
      submittedAt: '2024-03-14T09:45:00',
      status: 'pending',
      feedback: null
    },
    {
      id: 3,
      title: 'تنسيق اجتماع النادي',
      time: '01:15:00',
      submittedAt: '2024-03-13T16:20:00',
      status: 'rejected',
      feedback: 'يرجى إضافة تفاصيل أكثر عن المهمة'
    }
  ];

  // Task categories with their descriptions
  const taskCategories = [
    {
      id: 1,
      name: 'مهمة تخدم برامج أو مشاريع النادي',
      description: 'هي المهام التي تساهم بشكل مباشر في تخطيط أو تنفيذ البرامج والمشاريع التي ينظمها النادي',
      examples: 'مثل: تنظيم ورش العمل، الندوات، أو المسابقات'
    },
    {
      id: 2,
      name: 'مهمة تخدم المشاركات داخل الجامعة',
      description: 'وهي المهام التي تتم تنفيذها بالتعاون مع الجامعة',
      examples: 'مثل: حضور اجتماع مشترك مع عمادة شؤون الطلاب، أو المشاركة في فعالية تنظمها الجامعة'
    },
    {
      id: 3,
      name: 'مهمة تخدم المشاركات خارج الجامعة',
      description: 'وهي المهام التي تتم بالتنسيق مع جهات أو مؤسسات خارج الجامعة',
      examples: 'مثل: المشاركة في مسابقات وطنية، أو شراكات في برامج مع جهات حكومية أو خاصة'
    },
    {
      id: 4,
      name: 'مهمة تخدم مبادرات النادي',
      description: 'هي المهام التي تساهم في دعم وتنفيذ مبادرات النادي',
      examples: 'مثل: إطلاق مبادرة لجمع الكتب المستعملة، أو إطلاق برنامج على مواقع التواصل الاجتماعي'
    },
    {
      id: 5,
      name: 'مهمة تخدم الأنشطة الداخلية في النادي',
      description: 'هي المهام التي تنفذ ضمن إطار النادي وتهدف إلى تحقيق أهدافه',
      examples: 'مثل: تنظيم اجتماع للأعضاء لمناقشة خطة العمل، إقامة مسابقة داخلية لأعضاء النادي'
    },
    {
      id: 6,
      name: 'مهمة تخدم المشاركات المجتمعية',
      description: 'هي المهام التي تهدف إلى خدمة المجتمع المحلي من خلال الأعمال التطوعية',
      examples: 'مثل: التعاون مع جمعية خيرية لتوزيع المساعدات، أو تنظيم حملة للتبرع بالدم'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format time as HH:MM:SS
    const formattedTime = `${formData.hours.padStart(2, '0')}:${formData.minutes.padStart(2, '0')}:${formData.seconds.padStart(2, '0')}`;
    console.log({ ...formData, time: formattedTime });
  };

  const handleTimeChange = (field, value) => {
    // Ensure the value is between 0 and the maximum (59 for minutes/seconds, no limit for hours)
    let maxValue = field === 'hours' ? 999 : 59;
    let sanitizedValue = Math.min(Math.max(0, Number(value) || 0), maxValue).toString();
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue.padStart(2, '0')
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-5 h-5 text-growth" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Task Submission Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-kaff text-trust mb-6">تقديم مهمة جديدة</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Member Information Section */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-medium text-gray-900">معلومات العضو</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm text-gray-500">اسم العضو</label>
                    <p className="text-sm font-medium text-gray-900">{memberInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm text-gray-500">الرقم الجامعي</label>
                    <p className="text-sm font-medium text-gray-900">{memberInfo.studentId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <label className="block text-sm text-gray-500">اللجنة التابع لها</label>
                    <p className="text-sm font-medium text-gray-900">{memberInfo.committee}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان المهمة
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد الساعات (ساعة:دقيقة:ثانية)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.hours}
                      onChange={(e) => handleTimeChange('hours', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust text-center"
                      placeholder="00"
                      min="0"
                      required
                    />
                    <span className="absolute top-2 left-2 text-gray-400">س</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.minutes}
                      onChange={(e) => handleTimeChange('minutes', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust text-center"
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
                      value={formData.seconds}
                      onChange={(e) => handleTimeChange('seconds', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust text-center"
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

            {/* Task Categories with Better UX */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تصنيف المهمة
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskCategories.map(category => (
                  <div
                    key={category.id}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.category === category.id.toString()
                        ? 'border-trust bg-trust/5'
                        : 'border-gray-200 hover:border-trust/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, category: category.id.toString() }))}
                  >
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className={`w-5 h-5 rounded-full border-2 mt-1 flex-shrink-0 ${
                        formData.category === category.id.toString()
                          ? 'border-trust bg-trust'
                          : 'border-gray-300'
                      }`}>
                        {formData.category === category.id.toString() && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف المهمة
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
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
                    onChange={handleFileChange}
                  />
                </label>
                <div className="text-sm text-gray-500">
                  {formData.attachments.length > 0 ? `${formData.attachments.length} ملفات مرفقة` : 'لا توجد مرفقات'}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-trust text-white rounded-md hover:bg-trust/90 transition-colors"
            >
              تقديم المهمة
            </button>
          </form>
        </div>

        {/* Task History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-kaff text-trust mb-6">سجل المهام</h2>
          <div className="space-y-4">
            {taskHistory.map(task => (
              <div
                key={task.id}
                className="flex items-start space-x-4 space-x-reverse border-b border-gray-100 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    <span className="inline-flex items-center ml-4">
                      <Clock className="h-4 w-4 ml-1" />
                      {task.time}
                    </span>
                    <span className="inline-flex items-center">
                      <Calendar className="h-4 w-4 ml-1" />
                      {new Date(task.submittedAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  {task.feedback && (
                    <p className="mt-2 text-sm text-gray-600">
                      {task.feedback}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaskSubmission; 
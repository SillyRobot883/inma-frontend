import { useState } from 'react';

import { BookOpen, Upload, User, Users } from 'lucide-react';

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
    attachments: [],
  });

  // Updated member info with the provided data
  const memberInfo = {
    name: 'عبدالعزيز محمد الكثيري',
    studentId: '444002181',
    committee: 'لجنة البرامج والفعاليات',
  };

  // Task categories with their descriptions
  const taskCategories = [
    {
      id: 1,
      name: 'مهمة تخدم برامج أو مشاريع النادي',
      description:
        'هي المهام التي تساهم بشكل مباشر في تخطيط أو تنفيذ البرامج والمشاريع التي ينظمها النادي',
      examples: 'مثل: تنظيم ورش العمل، الندوات، أو المسابقات',
    },
    {
      id: 2,
      name: 'مهمة تخدم المشاركات داخل الجامعة',
      description: 'وهي المهام التي تتم تنفيذها بالتعاون مع الجامعة',
      examples: 'مثل: حضور اجتماع مشترك مع عمادة شؤون الطلاب، أو المشاركة في فعالية تنظمها الجامعة',
    },
    {
      id: 3,
      name: 'مهمة تخدم المشاركات خارج الجامعة',
      description: 'وهي المهام التي تتم بالتنسيق مع جهات أو مؤسسات خارج الجامعة',
      examples: 'مثل: المشاركة في مسابقات وطنية، أو شراكات في برامج مع جهات حكومية أو خاصة',
    },
    {
      id: 4,
      name: 'مهمة تخدم مبادرات النادي',
      description: 'هي المهام التي تساهم في دعم وتنفيذ مبادرات النادي',
      examples:
        'مثل: إطلاق مبادرة لجمع الكتب المستعملة، أو إطلاق برنامج على مواقع التواصل الاجتماعي',
    },
    {
      id: 5,
      name: 'مهمة تخدم الأنشطة الداخلية في النادي',
      description: 'هي المهام التي تنفذ ضمن إطار النادي وتهدف إلى تحقيق أهدافه',
      examples: 'مثل: تنظيم اجتماع للأعضاء لمناقشة خطة العمل، إقامة مسابقة داخلية لأعضاء النادي',
    },
    {
      id: 6,
      name: 'مهمة تخدم المشاركات المجتمعية',
      description: 'هي المهام التي تهدف إلى خدمة المجتمع المحلي من خلال الأعمال التطوعية',
      examples: 'مثل: التعاون مع جمعية خيرية لتوزيع المساعدات، أو تنظيم حملة للتبرع بالدم',
    },
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

    setFormData((prev) => ({
      ...prev,
      [field]: sanitizedValue.padStart(2, '0'),
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Task Submission Form */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="font-kaff text-trust mb-6 text-xl font-bold">رفع ساعات تطوعية جديدة</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Member Information Section */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium text-gray-900">معلومات العضو</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  عنوان النشاط التطوعي
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="focus:ring-trust focus:border-trust w-full rounded-md border border-gray-300 px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  عدد الساعات (ساعة:دقيقة:ثانية)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.hours}
                      onChange={(e) => handleTimeChange('hours', e.target.value)}
                      className="focus:ring-trust focus:border-trust w-full rounded-md border border-gray-300 px-4 py-2 text-center"
                      placeholder="00"
                      min="0"
                      required
                    />
                    <span className="absolute left-2 top-2 text-gray-400">س</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.minutes}
                      onChange={(e) => handleTimeChange('minutes', e.target.value)}
                      className="focus:ring-trust focus:border-trust w-full rounded-md border border-gray-300 px-4 py-2 text-center"
                      placeholder="00"
                      min="0"
                      max="59"
                      required
                    />
                    <span className="absolute left-2 top-2 text-gray-400">د</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.seconds}
                      onChange={(e) => handleTimeChange('seconds', e.target.value)}
                      className="focus:ring-trust focus:border-trust w-full rounded-md border border-gray-300 px-4 py-2 text-center"
                      placeholder="00"
                      min="0"
                      max="59"
                      required
                    />
                    <span className="absolute left-2 top-2 text-gray-400">ث</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Categories with Better UX */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                تصنيف النشاط التطوعي
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {taskCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      formData.category === category.id.toString()
                        ? 'border-trust bg-trust/5'
                        : 'hover:border-trust/50 border-gray-200'
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, category: category.id.toString() }))
                    }
                  >
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div
                        className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 ${
                          formData.category === category.id.toString()
                            ? 'border-trust bg-trust'
                            : 'border-gray-300'
                        }`}
                      >
                        {formData.category === category.id.toString() && (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="mb-1 font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-500">{category.description}</p>
                        <p className="text-trust mt-1 text-sm">{category.examples}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                وصف النشاط التطوعي
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="focus:ring-trust focus:border-trust w-full rounded-md border border-gray-300 px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">المرفقات</label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="bg-trust/10 hover:bg-trust/20 text-trust cursor-pointer rounded-md px-4 py-2 transition-colors">
                  <span className="flex items-center">
                    <Upload className="ml-2 h-5 w-5" />
                    إضافة ملف
                  </span>
                  <input type="file" multiple className="hidden" onChange={handleFileChange} />
                </label>
                <div className="text-sm text-gray-500">
                  {formData.attachments.length > 0
                    ? `${formData.attachments.length} ملفات مرفقة`
                    : 'لا توجد مرفقات'}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-trust hover:bg-trust/90 w-full rounded-md px-6 py-2 text-white transition-colors md:w-auto"
            >
              تقديم النشاط التطوعي
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TaskSubmission;

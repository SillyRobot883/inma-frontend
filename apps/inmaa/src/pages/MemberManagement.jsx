'use client';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit2,
  FileText,
  Mail,
  Phone,
  Search,
  Trash2,
  User,
  UserCog,
  UserPlus,
  UserX,
  Users,
  X,
} from 'lucide-react';

import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const MemberManagement = () => {
  const { clubId } = useParams();
  const { user, currentClub } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [showMemberDetails, setShowMemberDetails] = useState(null);

  // Dummy data for members
  const dummyMembers = [
    {
      id: 1,
      name: 'عبدالله محمد الغامدي',
      studentId: '444001234',
      email: 'abdullah@example.com',
      phone: '0501234567',
      role: 'leader',
      joinDate: '2023-09-15',
      totalHours: 65.5,
      completedTasks: 15,
      pendingTasks: 2,
      engagement: 92,
      lastActive: '2024-03-20',
      committee: 'لجنة البرامج والفعاليات',
      major: 'علوم الحاسب',
      level: 'المستوى السادس',
      recentActivity: [
        { id: 1, title: 'تنظيم ورشة عمل Git', date: '2024-03-15', hours: 3, status: 'approved' },
        { id: 2, title: 'إعداد محتوى تدريبي', date: '2024-03-10', hours: 4, status: 'approved' },
      ],
    },
    {
      id: 2,
      name: 'سارة أحمد العتيبي',
      studentId: '444002345',
      email: 'sarah@example.com',
      phone: '0502345678',
      role: 'hr',
      joinDate: '2023-09-20',
      totalHours: 58.75,
      completedTasks: 12,
      pendingTasks: 1,
      engagement: 88,
      lastActive: '2024-03-19',
      committee: 'لجنة الموارد البشرية',
      major: 'نظم المعلومات',
      level: 'المستوى الخامس',
      recentActivity: [
        {
          id: 3,
          title: 'تنظيم مقابلات الأعضاء الجدد',
          date: '2024-03-18',
          hours: 2,
          status: 'approved',
        },
        {
          id: 4,
          title: 'إعداد تقرير أداء الأعضاء',
          date: '2024-03-12',
          hours: 3,
          status: 'approved',
        },
      ],
    },
    {
      id: 3,
      name: 'خالد عبدالرحمن العمري',
      studentId: '444003456',
      email: 'khalid@example.com',
      phone: '0503456789',
      role: 'member',
      joinDate: '2023-10-05',
      totalHours: 52.25,
      completedTasks: 10,
      pendingTasks: 3,
      engagement: 78,
      lastActive: '2024-03-18',
      committee: 'لجنة التسويق والإعلام',
      major: 'هندسة البرمجيات',
      level: 'المستوى السابع',
      recentActivity: [
        {
          id: 5,
          title: 'تصميم منشورات للنادي',
          date: '2024-03-17',
          hours: 2.5,
          status: 'approved',
        },
        {
          id: 6,
          title: 'إدارة حسابات التواصل الاجتماعي',
          date: '2024-03-14',
          hours: 1.5,
          status: 'pending',
        },
      ],
    },
    {
      id: 4,
      name: 'نورة محمد السالم',
      studentId: '444004567',
      email: 'noura@example.com',
      phone: '0504567890',
      role: 'member',
      joinDate: '2023-10-10',
      totalHours: 45.0,
      completedTasks: 9,
      pendingTasks: 0,
      engagement: 85,
      lastActive: '2024-03-17',
      committee: 'لجنة البرامج والفعاليات',
      major: 'علوم الحاسب',
      level: 'المستوى الرابع',
      recentActivity: [
        { id: 7, title: 'تنسيق فعالية النادي', date: '2024-03-16', hours: 4, status: 'approved' },
        {
          id: 8,
          title: 'إعداد التقرير الشهري',
          date: '2024-03-10',
          hours: 2.5,
          status: 'approved',
        },
      ],
    },
    {
      id: 5,
      name: 'فهد سعد الدوسري',
      studentId: '444005678',
      email: 'fahad@example.com',
      phone: '0505678901',
      role: 'member',
      joinDate: '2023-10-15',
      totalHours: 38.5,
      completedTasks: 8,
      pendingTasks: 1,
      engagement: 72,
      lastActive: '2024-03-15',
      committee: 'لجنة التطوير التقني',
      major: 'هندسة البرمجيات',
      level: 'المستوى الثامن',
      recentActivity: [
        { id: 9, title: 'تطوير موقع النادي', date: '2024-03-14', hours: 5, status: 'approved' },
        { id: 10, title: 'إصلاح مشاكل تقنية', date: '2024-03-08', hours: 2, status: 'approved' },
      ],
    },
    {
      id: 6,
      name: 'ريم خالد الشمري',
      studentId: '444006789',
      email: 'reem@example.com',
      phone: '0506789012',
      role: 'member',
      joinDate: '2023-11-01',
      totalHours: 32.75,
      completedTasks: 7,
      pendingTasks: 2,
      engagement: 68,
      lastActive: '2024-03-14',
      committee: 'لجنة التسويق والإعلام',
      major: 'نظم المعلومات',
      level: 'المستوى السادس',
      recentActivity: [
        { id: 11, title: 'تصميم شعار النادي', date: '2024-03-13', hours: 5, status: 'approved' },
        {
          id: 12,
          title: 'إعداد استراتيجية تسويقية',
          date: '2024-03-07',
          hours: 3,
          status: 'pending',
        },
      ],
    },
    {
      id: 7,
      name: 'محمد عبدالله القحطاني',
      studentId: '444007890',
      email: 'mohammed@example.com',
      phone: '0507890123',
      role: 'member',
      joinDate: '2023-11-10',
      totalHours: 28.5,
      completedTasks: 6,
      pendingTasks: 1,
      engagement: 65,
      lastActive: '2024-03-12',
      committee: 'لجنة البرامج والفعاليات',
      major: 'علوم الحاسب',
      level: 'المستوى الخامس',
      recentActivity: [
        { id: 13, title: 'تنظيم مسابقة برمجية', date: '2024-03-11', hours: 4, status: 'approved' },
        { id: 14, title: 'إعداد أسئلة المسابقة', date: '2024-03-05', hours: 3, status: 'approved' },
      ],
    },
    {
      id: 8,
      name: 'لينا سعيد الزهراني',
      studentId: '444008901',
      email: 'lina@example.com',
      phone: '0508901234',
      role: 'member',
      joinDate: '2023-11-15',
      totalHours: 25.0,
      completedTasks: 5,
      pendingTasks: 0,
      engagement: 60,
      lastActive: '2024-03-10',
      committee: 'لجنة الموارد البشرية',
      major: 'نظم المعلومات',
      level: 'المستوى الرابع',
      recentActivity: [
        { id: 15, title: 'تنظيم اجتماع الأعضاء', date: '2024-03-09', hours: 2, status: 'approved' },
        {
          id: 16,
          title: 'إعداد قاعدة بيانات الأعضاء',
          date: '2024-03-03',
          hours: 3,
          status: 'approved',
        },
      ],
    },
  ];

  const [members, setMembers] = useState(dummyMembers);

  // New member form state
  const [newMember, setNewMember] = useState({
    name: '',
    idNumber: '',
    studentId: '',
    email: '',
    phone: '',
    role: 'member',
    committee: '',
    major: '',
    level: '',
    hours: '00',
    minutes: '00',
    seconds: '00',
    engagement: 'active',
  });

  // تحسين دالة formatTimeFromDecimal لتكون أكثر دقة
  const formatTimeFromDecimal = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutesDecimal = (decimalHours - hours) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.floor((minutesDecimal - minutes) * 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'leader':
        return 'قائد النادي';
      case 'hr':
        return 'موارد بشرية';
      case 'member':
        return 'عضو';
      default:
        return '';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'leader':
        return 'bg-trust text-white';
      case 'hr':
        return 'bg-growth text-white';
      case 'member':
        return 'bg-excellence text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 80) return 'text-growth';
    if (engagement >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getEngagementBg = (engagement) => {
    if (engagement >= 80) return 'bg-growth/10';
    if (engagement >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  // Sort and filter members
  const sortedAndFilteredMembers = [...members]
    .filter((member) => {
      const matchesSearch =
        member.name.includes(searchQuery) ||
        member.studentId.includes(searchQuery) ||
        member.email.includes(searchQuery);
      const matchesRole = filterRole === 'all' || member.role === filterRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'hours':
          comparison = a.totalHours - b.totalHours;
          break;
        case 'engagement':
          comparison = a.engagement - b.engagement;
          break;
        case 'joinDate':
          comparison = new Date(a.joinDate) - new Date(b.joinDate);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleTimeChange = (field, value) => {
    // Ensure the value is between 0 and the maximum (59 for minutes/seconds, no limit for hours)
    const maxValue = field === 'hours' ? 999 : 59;
    const sanitizedValue = Math.min(Math.max(0, Number(value) || 0), maxValue).toString();

    setNewMember((prev) => ({
      ...prev,
      [field]: sanitizedValue.padStart(2, '0'),
    }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.idNumber) {
      alert('الرجاء إدخال اسم العضو ورقم الهوية');
      return;
    }
    const member = {
      id: Date.now(),
      name: newMember.name,
      idNumber: newMember.idNumber,
      role: newMember.role,
      engagement: newMember.engagement,
      totalHours: '00:00:00',
      completedTasks: 0,
      pendingTasks: 0,
    };
    setMembers([...members, member]);
    setNewMember({
      name: '',
      idNumber: '',
      role: 'member',
      engagement: 'active',
    });
  };

  const handleDeleteMember = (memberId) => {
    // Here you would typically make an API call to delete the member
    console.log('Deleting member with ID:', memberId);
    setShowDeleteConfirmation(null);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">إجمالي الأعضاء</p>
                <p className="text-2xl font-bold text-trust mt-1">{members.length}</p>
                <p className="text-sm font-medium text-gray-500 mt-1">عضو</p>
              </div>
              <div className="bg-trust/10 rounded-full p-3 transition-all duration-300 group-hover:bg-trust/20">
                <Users className="h-6 w-6 text-trust" />
              </div>
            </div>
          </div>

          {/* تحسين عرض الساعات في البطاقات الإحصائية */}
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-50 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">متوسط الساعات</p>
                <p className="text-2xl font-bold text-growth mt-1 group-hover:scale-105 transition-transform duration-300">
                  {formatTimeFromDecimal(
                    members.reduce((acc, member) => acc + member.totalHours, 0) / members.length
                  )}
                </p>
                <p className="text-sm font-medium text-gray-500 mt-1">ساعة لكل عضو</p>
              </div>
              <div className="bg-growth/10 rounded-full p-3 transition-all duration-300 group-hover:bg-growth/30 group-hover:scale-110">
                <Clock className="h-6 w-6 text-growth" />
              </div>
            </div>
          </div>

          {/* تحسين عرض أفضل أداء */}
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-50 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">أفضل أداء</p>
                <p className="text-2xl font-bold text-excellence mt-1 group-hover:scale-105 transition-transform duration-300">
                  {members.sort((a, b) => b.totalHours - a.totalHours)[0].name.split(' ')[0]}
                </p>
                <p className="text-sm font-medium text-gray-500 mt-1 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-excellence" />
                  <span className="font-mono">
                    {formatTimeFromDecimal(
                      members.sort((a, b) => b.totalHours - a.totalHours)[0].totalHours
                    )}
                  </span>
                </p>
              </div>
              <div className="bg-excellence/10 rounded-full p-3 transition-all duration-300 group-hover:bg-excellence/30 group-hover:scale-110">
                <Award className="h-6 w-6 text-excellence" />
              </div>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-kaff font-bold text-trust">إدارة أعضاء النادي</h2>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث عن عضو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust w-full md:w-64 transition-all duration-300"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust text-sm font-medium text-gray-700 transition-all duration-300 w-full md:w-auto"
                >
                  <option value="all">جميع الأدوار</option>
                  <option value="leader">قائد النادي</option>
                  <option value="hr">موارد بشرية</option>
                  <option value="member">عضو</option>
                </select>
                {/* تحسين زر إضافة عضو جديد */}
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="btn-primary w-full md:w-auto hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-md"
                >
                  <UserPlus className="h-5 w-5 ml-2" />
                  إضافة عضو جديد
                </button>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>اسم العضو</span>
                      {sortBy === 'name' &&
                        (sortOrder === 'asc' ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الرقم الجامعي
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الدور
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    اللجنة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('hours')}
                  >
                    <div className="flex items-center">
                      <span>الساعات</span>
                      {sortBy === 'hours' &&
                        (sortOrder === 'asc' ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('engagement')}
                  >
                    <div className="flex items-center">
                      <span>نسبة التفاعل</span>
                      {sortBy === 'engagement' &&
                        (sortOrder === 'asc' ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('joinDate')}
                  >
                    <div className="flex items-center">
                      <span>تاريخ الانضمام</span>
                      {sortBy === 'joinDate' &&
                        (sortOrder === 'asc' ? (
                          <ChevronUp className="h-4 w-4 mr-1" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-1" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredMembers.map((member) => (
                  // تحسين صف الجدول بأكمله
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors duration-150 hover:shadow-sm"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-trust/10 flex items-center justify-center">
                          <span className="text-lg font-medium text-trust">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(member.role)}`}
                      >
                        {getRoleText(member.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.committee}</div>
                    </td>
                    {/* تحسين عرض الساعات في جدول الأعضاء */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 ml-1" />
                        <span className="text-sm font-medium text-trust font-mono hover:text-growth transition-colors duration-200">
                          {formatTimeFromDecimal(member.totalHours)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {member.completedTasks} مهمة مكتملة
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* تحسين عرض نسبة التفاعل */}
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px] overflow-hidden">
                          <div
                            className={`h-2.5 rounded-full ${getEngagementBg(member.engagement)} transition-all duration-500 ease-out`}
                            style={{ width: `${member.engagement}%` }}
                          ></div>
                        </div>
                        <span
                          className={`text-sm font-medium ${getEngagementColor(member.engagement)} transition-colors duration-300`}
                        >
                          {member.engagement}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.joinDate).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {/* تحسين أزرار الإجراءات */}
                        <button
                          onClick={() => setShowMemberDetails(member)}
                          className="text-trust hover:text-trust-dark transition-colors duration-150 p-2 hover:bg-trust/10 rounded-full"
                        >
                          <UserCog className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirmation(member)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-150 p-2 hover:bg-red-50 rounded-full"
                        >
                          <UserX className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-kaff text-trust">إضافة عضو جديد</h2>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddMember} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      اسم العضو
                    </label>
                    <input
                      type="text"
                      placeholder="اسم العضو"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهوية
                    </label>
                    <input
                      type="text"
                      placeholder="رقم الهوية"
                      value={newMember.idNumber}
                      onChange={(e) => setNewMember({ ...newMember, idNumber: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الرقم الجامعي
                    </label>
                    <input
                      type="text"
                      value={newMember.studentId}
                      onChange={(e) => setNewMember({ ...newMember, studentId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                      required
                    >
                      <option value="member">عضو</option>
                      <option value="hr">موارد بشرية</option>
                      <option value="leader">قائد النادي</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">اللجنة</label>
                    <select
                      value={newMember.committee}
                      onChange={(e) => setNewMember({ ...newMember, committee: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                      required
                    >
                      <option value="">اختر اللجنة</option>
                      <option value="لجنة البرامج والفعاليات">لجنة البرامج والفعاليات</option>
                      <option value="لجنة الموارد البشرية">لجنة الموارد البشرية</option>
                      <option value="لجنة التسويق والإعلام">لجنة التسويق والإعلام</option>
                      <option value="لجنة التطوير التقني">لجنة التطوير التقني</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      عدد الساعات (ساعة:دقيقة:ثانية)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="relative">
                        <input
                          type="number"
                          value={newMember.hours}
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
                          value={newMember.minutes}
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
                          value={newMember.seconds}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المستوى الدراسي
                    </label>
                    <select
                      value={newMember.level}
                      onChange={(e) => setNewMember({ ...newMember, level: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-trust focus:border-trust"
                      required
                    >
                      <option value="">اختر المستوى</option>
                      <option value="المستوى الأول">المستوى الأول</option>
                      <option value="المستوى الثاني">المستوى الثاني</option>
                      <option value="المستوى الثالث">المستوى الثالث</option>
                      <option value="المستوى الرابع">المستوى الرابع</option>
                      <option value="المستوى الخامس">المستوى الخامس</option>
                      <option value="المستوى السادس">المستوى السادس</option>
                      <option value="المستوى السابع">المستوى السابع</option>
                      <option value="المستوى الثامن">المستوى الثامن</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="btn-secondary"
                  >
                    إلغاء
                  </button>
                  <button type="submit" className="btn-primary">
                    <UserPlus className="h-5 w-5 ml-2" />
                    إضافة العضو
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-kaff text-trust">تأكيد حذف العضو</h2>
                <button
                  onClick={() => setShowDeleteConfirmation(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <p className="text-center text-gray-700 mb-6">
                هل أنت متأكد من رغبتك في حذف العضو{' '}
                <span className="font-bold text-trust">{showDeleteConfirmation.name}</span>؟ لا يمكن
                التراجع عن هذا الإجراء.
              </p>
              <div className="flex justify-center space-x-3 space-x-reverse">
                <button onClick={() => setShowDeleteConfirmation(null)} className="btn-secondary">
                  إلغاء
                </button>
                <button
                  onClick={() => handleDeleteMember(showDeleteConfirmation.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Trash2 className="h-5 w-5 ml-2 inline-block" />
                  تأكيد الحذف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {showMemberDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-kaff text-trust">تفاصيل العضو</h2>
                <button
                  onClick={() => setShowMemberDetails(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Member Info */}
                <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl">
                  <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-trust/10 flex items-center justify-center mb-4">
                      <span className="text-3xl font-medium text-trust">
                        {showMemberDetails.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 text-center">
                      {showMemberDetails.name}
                    </h3>
                    <span
                      className={`mt-2 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(showMemberDetails.role)}`}
                    >
                      {getRoleText(showMemberDetails.role)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 p-2 rounded-full">
                        <User className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الرقم الجامعي</p>
                        <p className="font-medium">{showMemberDetails.studentId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                        <p className="font-medium">{showMemberDetails.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">رقم الهاتف</p>
                        <p className="font-medium">{showMemberDetails.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">تاريخ الانضمام</p>
                        <p className="font-medium">
                          {new Date(showMemberDetails.joinDate).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 p-2 rounded-full">
                        <Users className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">اللجنة</p>
                        <p className="font-medium">{showMemberDetails.committee}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-trust/10 p-2 rounded-full">
                        <FileText className="h-5 w-5 text-trust" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">التخصص</p>
                        <p className="font-medium">{showMemberDetails.major}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Stats and Activity */}
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* تحسين عرض الساعات في تفاصيل العضو */}
                    <div className="bg-trust/5 rounded-xl p-4 hover:bg-trust/10 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">إجمالي الساعات</p>
                          <p className="text-2xl font-bold text-trust mt-1 font-mono group-hover:scale-105 transition-transform duration-300">
                            {formatTimeFromDecimal(showMemberDetails.totalHours)}
                          </p>
                        </div>
                        <div className="bg-trust/10 p-3 rounded-full group-hover:bg-trust/30 transition-all duration-300 group-hover:scale-110">
                          <Clock className="h-6 w-6 text-trust" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-growth/5 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">المهام المكتملة</p>
                          <p className="text-2xl font-bold text-growth mt-1">
                            {showMemberDetails.completedTasks}
                          </p>
                        </div>
                        <div className="bg-growth/10 p-3 rounded-full">
                          <CheckCircle2 className="h-6 w-6 text-growth" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">المهام المعلقة</p>
                          <p className="text-2xl font-bold text-yellow-600 mt-1">
                            {showMemberDetails.pendingTasks}
                          </p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                          <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-trust mb-4">نسبة التفاعل</h3>
                    <div className="flex items-center mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full ${getEngagementBg(showMemberDetails.engagement)}`}
                          style={{ width: `${showMemberDetails.engagement}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-lg font-medium ${getEngagementColor(showMemberDetails.engagement)} mr-4 min-w-[50px] text-center`}
                      >
                        {showMemberDetails.engagement}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      آخر نشاط: {new Date(showMemberDetails.lastActive).toLocaleDateString('ar-SA')}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-trust mb-4">آخر الأنشطة</h3>
                    <div className="space-y-4">
                      {showMemberDetails.recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 space-x-reverse bg-gray-50 rounded-lg p-4"
                        >
                          <div className="bg-trust/10 p-2 rounded-full">
                            <Activity className="h-5 w-5 text-trust" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{activity.title}</h4>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  activity.status === 'approved'
                                    ? 'bg-growth/10 text-growth'
                                    : activity.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-600'
                                      : 'bg-red-100 text-red-600'
                                }`}
                              >
                                {activity.status === 'approved'
                                  ? 'تمت الموافقة'
                                  : activity.status === 'pending'
                                    ? 'قيد المراجعة'
                                    : 'مرفوض'}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              {/* تحسين عرض الساعات في الأنشطة الأخيرة */}
                              <span className="inline-flex items-center ml-4 bg-trust/5 px-2 py-1 rounded-full hover:bg-trust/10 transition-all duration-200">
                                <Clock className="h-4 w-4 ml-1" />
                                <span className="font-mono">
                                  {formatTimeFromDecimal(activity.hours)}
                                </span>
                              </span>
                              <span className="inline-flex items-center">
                                <Calendar className="h-4 w-4 ml-1" />
                                {activity.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                <button onClick={() => setShowMemberDetails(null)} className="btn-secondary">
                  إغلاق
                </button>
                <button className="btn-primary">
                  <Edit2 className="h-5 w-5 ml-2" />
                  تعديل بيانات العضو
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MemberManagement;

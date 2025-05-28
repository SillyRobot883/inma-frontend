import { useState } from 'react';

import {
  Building2,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit2,
  Plus,
  Search,
  Trash2,
  User,
  UserPlus,
  X,
} from 'lucide-react';

import AdminLayout from '../components/AdminLayout';

const AdminMemberManagement = ({ isInmaAdmin = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMember, setExpandedMember] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);

  // New member form state
  const [newMember, setNewMember] = useState({
    name: '',
    studentId: '',
    idNumber: '',
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
    clubs: [],
  });

  // Edit member form state
  const [editMember, setEditMember] = useState(null);

  // Dummy data for members
  const dummyMembers = [
    {
      id: 1,
      name: 'فهد السالم',
      studentId: '202012345',
      idNumber: '1121234567',
      email: 'fahad@example.com',
      totalHours: 156.5,
      clubs: [
        { id: 1, name: 'نادي التطوير', role: 'leader', hours: 45.5 },
        { id: 2, name: 'نادي الابتكار', role: 'member', hours: 30.0 },
        { id: 3, name: 'نادي التصميم', role: 'hr', hours: 81.0 },
      ],
    },
    {
      id: 2,
      name: 'نورة العتيبي',
      studentId: '202012346',
      idNumber: '1122345678',
      email: 'noura@example.com',
      totalHours: 142.0,
      clubs: [
        { id: 1, name: 'نادي التطوير', role: 'member', hours: 42.0 },
        { id: 4, name: 'نادي التصوير', role: 'leader', hours: 100.0 },
      ],
    },
    // Add more dummy data as needed
  ];

  // State for members
  const [members, setMembers] = useState(dummyMembers);

  // Add dummy clubs data
  const clubs = [
    { id: 1, name: 'نادي التطوير' },
    { id: 2, name: 'نادي الابتكار' },
    { id: 3, name: 'نادي التصميم' },
    { id: 4, name: 'نادي التصوير' },
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'leader':
        return 'bg-purple-100 text-purple-600';
      case 'hr':
        return 'bg-blue-100 text-blue-600';
      case 'member':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'leader':
        return 'قائد';
      case 'hr':
        return 'موارد بشرية';
      case 'member':
        return 'عضو';
      default:
        return role;
    }
  };

  const formatHours = (hours) => {
    const totalSeconds = Math.floor(hours * 3600);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredMembers = members
    .filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.studentId.includes(searchQuery) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return direction * a.name.localeCompare(b.name);
      } else if (sortField === 'totalHours') {
        return direction * (a.totalHours - b.totalHours);
      }
      return 0;
    });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.studentId || !newMember.idNumber) {
      alert('الرجاء إدخال اسم العضو والرقم الجامعي ورقم الهوية');
      return;
    }
    const member = {
      id: Date.now(),
      name: newMember.name,
      studentId: newMember.studentId,
      idNumber: newMember.idNumber,
      email: newMember.email,
      phone: newMember.phone,
      role: newMember.role,
      committee: newMember.committee,
      major: newMember.major,
      level: newMember.level,
      totalHours: 0,
      completedTasks: 0,
      pendingTasks: 0,
      engagement: 0,
      joinDate: new Date().toISOString().split('T')[0],
      recentActivity: [],
      clubs: newMember.clubs,
    };
    setMembers([...members, member]);
    setNewMember({
      name: '',
      studentId: '',
      idNumber: '',
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
      clubs: [],
    });
    setShowAddMemberModal(false);
  };

  const handleEditMember = (e) => {
    e.preventDefault();
    if (!editMember.name || !editMember.studentId) {
      alert('الرجاء إدخال اسم العضو والرقم الجامعي');
      return;
    }
    setMembers(members.map((member) => (member.id === editMember.id ? editMember : member)));
    setShowEditMemberModal(null);
  };

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
    setShowDeleteConfirmation(null);
  };

  const handleTimeChange = (field, value) => {
    const maxValue = field === 'hours' ? 999 : 59;
    const sanitizedValue = Math.min(Math.max(0, Number(value) || 0), maxValue).toString();
    setNewMember((prev) => ({
      ...prev,
      [field]: sanitizedValue.padStart(2, '0'),
    }));
  };

  const handleClubSelection = (clubId) => {
    setNewMember((prev) => {
      const clubs = prev.clubs.includes(clubId)
        ? prev.clubs.filter((id) => id !== clubId)
        : [...prev.clubs, clubId];
      return { ...prev, clubs };
    });
  };

  return (
    <AdminLayout isInmaAdmin={isInmaAdmin}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-kaff text-trust text-2xl">إدارة المستخدمين</h2>
              <p className="mt-1 text-sm text-gray-500">
                {isInmaAdmin ? 'عرض وإدارة جميع الأعضاء في الأندية' : 'عرض جميع الأعضاء في الأندية'}
              </p>
            </div>
            {isInmaAdmin && (
              <button onClick={() => setShowAddMemberModal(true)} className="btn-primary">
                <Plus className="ml-2 h-5 w-5" />
                إضافة عضو جديد
              </button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="بحث عن عضو..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:ring-trust/20 focus:border-trust w-full rounded-lg border border-gray-200 py-2 pl-10 pr-12 focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 space-x-reverse"
                    >
                      <span>الاسم</span>
                      {sortField === 'name' &&
                        (sortDirection === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    رقم الطالب
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    رقم الهوية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    البريد الإلكتروني
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    <button
                      onClick={() => handleSort('totalHours')}
                      className="flex items-center space-x-1 space-x-reverse"
                    >
                      <span>إجمالي الساعات</span>
                      {sortField === 'totalHours' &&
                        (sortDirection === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    الأندية
                  </th>
                  {isInmaAdmin && (
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      الإجراءات
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredMembers.map((member) => (
                  <>
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-trust/10 flex h-10 w-10 items-center justify-center rounded-full">
                            <User className="text-trust h-6 w-6" />
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {member.studentId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {member.idNumber}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {member.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="ml-1 h-4 w-4 text-gray-400" />
                          {formatHours(member.totalHours)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            setExpandedMember(expandedMember === member.id ? null : member.id)
                          }
                          className="text-trust hover:text-trust-dark flex items-center text-sm"
                        >
                          <span>{member.clubs.length} نادي</span>
                          {expandedMember === member.id ? (
                            <ChevronUp className="mr-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="mr-1 h-4 w-4" />
                          )}
                        </button>
                      </td>
                      {isInmaAdmin && (
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <button
                              onClick={() => {
                                setEditMember(member);
                                setShowEditMemberModal(member);
                              }}
                              className="hover:text-trust text-gray-400"
                            >
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirmation(member)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                    {expandedMember === member.id && (
                      <tr>
                        <td colSpan={isInmaAdmin ? 6 : 5} className="bg-gray-50 px-6 py-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {member.clubs.map((club) => (
                              <div key={club.id} className="rounded-lg bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <Building2 className="ml-2 h-5 w-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900">
                                      {club.name}
                                    </span>
                                  </div>
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(club.role)}`}
                                  >
                                    {getRoleText(club.role)}
                                  </span>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <Clock className="ml-1 h-4 w-4 text-gray-400" />
                                  <span>{formatHours(club.hours)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Member Modal */}
        {showAddMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-kaff text-trust text-xl">إضافة عضو جديد</h2>
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
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        اسم العضو
                      </label>
                      <input
                        type="text"
                        placeholder="اسم العضو"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        الرقم الجامعي
                      </label>
                      <input
                        type="text"
                        placeholder="الرقم الجامعي"
                        value={newMember.studentId}
                        onChange={(e) => setNewMember({ ...newMember, studentId: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        رقم الهوية
                      </label>
                      <input
                        type="text"
                        placeholder="112XXXXXXXX"
                        value={newMember.idNumber}
                        onChange={(e) => setNewMember({ ...newMember, idNumber: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        placeholder="رقم الهاتف"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">الدور</label>
                      <select
                        value={newMember.role}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        className="input-field"
                        required
                      >
                        <option value="member">عضو</option>
                        <option value="hr">موارد بشرية</option>
                        <option value="leader">قائد النادي</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">اللجنة</label>
                      <select
                        value={newMember.committee}
                        onChange={(e) => setNewMember({ ...newMember, committee: e.target.value })}
                        className="input-field"
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
                      <label className="mb-1 block text-sm font-medium text-gray-700">التخصص</label>
                      <input
                        type="text"
                        placeholder="التخصص"
                        value={newMember.major}
                        onChange={(e) => setNewMember({ ...newMember, major: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        المستوى الدراسي
                      </label>
                      <select
                        value={newMember.level}
                        onChange={(e) => setNewMember({ ...newMember, level: e.target.value })}
                        className="input-field"
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
                    <div className="col-span-2">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        الأندية
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {clubs.map((club) => (
                          <label
                            key={club.id}
                            className="flex cursor-pointer items-center space-x-2 space-x-reverse rounded-lg border p-2 hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={newMember.clubs.includes(club.id)}
                              onChange={() => handleClubSelection(club.id)}
                              className="text-trust focus:ring-trust rounded"
                            />
                            <span className="text-sm text-gray-700">{club.name}</span>
                          </label>
                        ))}
                      </div>
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
                      <UserPlus className="ml-2 h-5 w-5" />
                      إضافة العضو
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Member Modal */}
        {showEditMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-kaff text-trust text-xl">تعديل بيانات العضو</h2>
                  <button
                    onClick={() => setShowEditMemberModal(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleEditMember} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        اسم العضو
                      </label>
                      <input
                        type="text"
                        value={editMember.name}
                        onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        الرقم الجامعي
                      </label>
                      <input
                        type="text"
                        value={editMember.studentId}
                        onChange={(e) =>
                          setEditMember({ ...editMember, studentId: e.target.value })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={editMember.email}
                        onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        value={editMember.phone}
                        onChange={(e) => setEditMember({ ...editMember, phone: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">الدور</label>
                      <select
                        value={editMember.role}
                        onChange={(e) => setEditMember({ ...editMember, role: e.target.value })}
                        className="input-field"
                        required
                      >
                        <option value="member">عضو</option>
                        <option value="hr">موارد بشرية</option>
                        <option value="leader">قائد النادي</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">اللجنة</label>
                      <select
                        value={editMember.committee}
                        onChange={(e) =>
                          setEditMember({ ...editMember, committee: e.target.value })
                        }
                        className="input-field"
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
                      <label className="mb-1 block text-sm font-medium text-gray-700">التخصص</label>
                      <input
                        type="text"
                        value={editMember.major}
                        onChange={(e) => setEditMember({ ...editMember, major: e.target.value })}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        المستوى الدراسي
                      </label>
                      <select
                        value={editMember.level}
                        onChange={(e) => setEditMember({ ...editMember, level: e.target.value })}
                        className="input-field"
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
                      onClick={() => setShowEditMemberModal(null)}
                      className="btn-secondary"
                    >
                      إلغاء
                    </button>
                    <button type="submit" className="btn-primary">
                      <Edit2 className="ml-2 h-5 w-5" />
                      حفظ التغييرات
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <div className="text-center">
                <h2 className="font-kaff text-trust mb-4 text-xl">تأكيد الحذف</h2>
                <p className="mb-6 text-gray-600">
                  هل أنت متأكد من حذف العضو {showDeleteConfirmation.name}؟
                </p>
                <div className="flex justify-center space-x-3 space-x-reverse">
                  <button onClick={() => setShowDeleteConfirmation(null)} className="btn-secondary">
                    إلغاء
                  </button>
                  <button
                    onClick={() => handleDeleteMember(showDeleteConfirmation.id)}
                    className="btn-danger"
                  >
                    <Trash2 className="ml-2 h-5 w-5" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMemberManagement;

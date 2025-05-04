"use client"

import { useParams } from "react-router-dom"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
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
  X,
  AlertTriangle,
} from "lucide-react"

const Dashboard = () => {
  const { clubId } = useParams()
  const { user, currentClub } = useAuth()
  const isAdmin = currentClub?.role === "leader" || currentClub?.role === "hr"
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)

  // Dummy data for member stats
  const memberStats = {
    completedTasks: 15,
    totalHours: "45:30",
    pendingTasks: 3,
    recentActivity: [
      {
        id: 1,
        title: "تنظيم ورشة عمل Git",
        status: "approved",
        hours: "03:00",
        date: "2024-03-15",
      },
      {
        id: 2,
        title: "إعداد محتوى تدريبي",
        status: "pending",
        hours: "02:30",
        date: "2024-03-14",
      },
    ],
  }

  // Handle withdrawal request
  const handleWithdrawalRequest = () => {
    setShowWithdrawalModal(true)
  }

  // Process withdrawal
  const processWithdrawal = () => {
    if (memberStats.pendingTasks > 0) {
      // If member has pending tasks, change status to inactive
      console.log("Member has pending tasks, changing status to inactive")
      // Here you would typically make an API call to update the member status
      alert("تم تغيير حالتك إلى منسحب. يرجى إكمال الساعات المعلقة قبل الحذف النهائي.")
    } else {
      // If no pending tasks, process complete withdrawal
      console.log("Processing complete withdrawal")
      // Here you would typically make an API call to delete the member
      alert("تم الانسحاب من النادي بنجاح")
    }
    setShowWithdrawalModal(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-growth/10 text-growth group-hover:bg-growth/20"
      case "pending":
        return "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Club Header */}
        <div className="bg-gradient-to-r from-trust/5 to-trust/10 rounded-xl shadow-sm p-8 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative">
                <img
                  className="h-20 w-20 rounded-xl shadow-md ring-2 ring-trust/20 transition-transform duration-300 hover:scale-105"
                  src={`/src/assets/club-${clubId}.png`}
                  alt={currentClub?.name}
                />
                <div className="absolute -bottom-2 -right-2 bg-trust/10 rounded-full p-1.5">
                  <Building2 className="h-4 w-4 text-trust" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-kaff font-bold text-trust mb-1">{currentClub?.name}</h2>
                <p className="text-gray-600 text-sm font-medium">مرحباً بك في لوحة التحكم</p>
              </div>
            </div>
            <button className="btn-primary transform transition-transform duration-300 hover:scale-105">
              <Clock className="h-5 w-5 ml-2" />
              تسجيل ساعات جديدة
            </button>
          </div>
        </div>

        {/* Personal Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-trust/10 rounded-full p-2">
              <UserCircle className="h-6 w-6 text-trust" />
            </div>
            <h2 className="text-2xl font-kaff font-bold text-trust">معلوماتي الشخصية</h2>
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
                      {memberStats.totalHours}
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

            {/* Withdrawal Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleWithdrawalRequest()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center shadow-sm hover:shadow-md"
              >
                <UserCircle className="h-5 w-5 ml-2" />
                انسحاب من النادي
              </button>
            </div>
          </div>

          {/* Personal Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
            <h3 className="text-xl font-kaff text-trust mb-6">طلبات اعتماد الساعات الأخيرة</h3>
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
                        <span className="flex items-center">
                          <Timer className="h-4 w-4 ml-1" />
                          {activity.hours}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 ml-1" />
                          {activity.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${getStatusColor(activity.status)}`}
                  >
                    {activity.status === "approved" ? "تمت الموافقة" : "قيد المراجعة"}
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                        {clubStats.totalClubHours}
                      </p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center">
                        <BarChart3 className="h-4 w-4 ml-1" />
                        معدل {clubStats.averageHoursPerMember} لكل عضو
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
                <div className="bg-trust/5 rounded-xl p-6 transition-all duration-300 hover:bg-trust/10">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">أفضل الأعضاء أداءً</p>
                    <div className="bg-trust/10 rounded-full p-2">
                      <Award className="h-5 w-5 text-trust" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {clubStats.topPerformers.map((performer, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm p-2 rounded-lg transition-all duration-300 hover:bg-trust/10"
                      >
                        <span className="text-gray-700 font-medium">{performer.name}</span>
                        <span className="text-trust font-medium">{performer.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Club Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-kaff text-trust mb-6">آخر طلبات اعتماد الساعات للنادي</h3>
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
                          <span className="flex items-center">
                            <Timer className="h-4 w-4 ml-1" />
                            {activity.hours}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 ml-1" />
                            {activity.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${getStatusColor(activity.status)}`}
                    >
                      {activity.status === "approved" ? "تمت الموافقة" : "قيد المراجعة"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Withdrawal Confirmation Modal */}
        {showWithdrawalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-kaff text-trust">تأكيد الانسحاب من النادي</h2>
                  <button onClick={() => setShowWithdrawalModal(false)} className="text-gray-400 hover:text-gray-500">
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
                {memberStats.pendingTasks > 0 ? (
                  <div>
                    <p className="text-center text-gray-700 mb-6">
                      لديك <span className="font-bold text-yellow-600">{memberStats.pendingTasks}</span> ساعات معلقة.
                      سيتم تغيير حالتك إلى منسحب حتى الانتهاء منها.
                    </p>
                    <div className="flex justify-center space-x-3 space-x-reverse">
                      <button
                        onClick={() => setShowWithdrawalModal(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        onClick={processWithdrawal}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        <UserCircle className="h-5 w-5 ml-2 inline-block" />
                        تغيير الحالة إلى منسحب
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-center text-gray-700 mb-6">
                      هل أنت متأكد من رغبتك في الانسحاب من النادي؟ لا يمكن التراجع عن هذا الإجراء.
                    </p>
                    <div className="flex justify-center space-x-3 space-x-reverse">
                      <button
                        onClick={() => setShowWithdrawalModal(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
                      >
                        إلغاء
                      </button>
                      <button
                        onClick={processWithdrawal}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        <UserCircle className="h-5 w-5 ml-2 inline-block" />
                        تأكيد الانسحاب
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Dashboard

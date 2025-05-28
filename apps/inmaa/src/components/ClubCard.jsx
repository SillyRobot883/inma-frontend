import { AlertTriangle, Clock, Clock4, Users } from 'lucide-react';

const ClubCard = ({ club, onViewDetails, formatHours }) => {
  // for context (backend team)

  // متعثر (struggling) criteria:
  // 1. Member engagement: average engagement of active users < 0.6
  // 2. Pending tasks: ratio of pending tasks to member count > 0.3
  // 3. Last activity: no activity for 7+ days

  // Calculate club status based on new criteria
  const memberEngagement = club.activeMembers > 0 ? club.engagementScore / club.activeMembers : 0;
  const pendingTasksRatio = club.activeMembers > 0 ? club.pendingTasks / club.activeMembers : 0;

  const lastActivityDate = new Date(club.recentActivity[0]?.date || '');
  const today = new Date();
  const daysSinceLastActivity = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));

  const isStruggling =
    memberEngagement < 0.6 || pendingTasksRatio > 0.3 || daysSinceLastActivity > 7;

  // Format date in Hijri
  const formatHijriDate = (date) => {
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    return hijriDate.replace('١٤٤٥', '١٤٤٦'); // Replace 1445 with 1446
  };

  return (
    <div
      className={`card transition-shadow duration-200 hover:shadow-lg ${
        isStruggling ? 'border-l-4 border-yellow-500' : ''
      }`}
    >
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="h-16 w-16 overflow-hidden rounded-xl">
          <img
            src={`/src/assets/club-${club.id}.png`}
            alt={club.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.parentElement.classList.add('bg-trust/10');
              e.target.parentElement.innerHTML = `
                <div class="h-full w-full flex items-center justify-center">
                  <svg class="h-8 w-8 text-trust" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/></svg>
                </div>
              `;
            }}
          />
        </div>
        <div>
          <h3 className="font-kaff text-trust text-lg">{club.name}</h3>
          {/* Performance Indicators */}
          <div className="mt-2 flex flex-wrap gap-2">
            {memberEngagement < 0.6 && (
              <span className="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                <Users className="ml-1.5 h-3.5 w-3.5" />
                انخفاض في مشاركة الأعضاء
              </span>
            )}
            {pendingTasksRatio > 0.3 && (
              <span className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                <AlertTriangle className="ml-1.5 h-3.5 w-3.5" />
                {club.pendingTasks} مهام معلقة
              </span>
            )}
            {daysSinceLastActivity > 7 && (
              <span className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                <Clock4 className="ml-1.5 h-3.5 w-3.5" />
                غير نشط منذ {daysSinceLastActivity} يوم
              </span>
            )}
          </div>
          {/* Last Activity Date */}
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <Clock4 className="ml-1 h-3 w-3" />
            آخر نشاط: {formatHijriDate(lastActivityDate)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="bg-growth/10 rounded-lg p-2">
            <Users className="text-growth h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">عدد الأعضاء</p>
            <p className="text-trust text-lg font-medium">{club.members}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="bg-growth/10 rounded-lg p-2">
            <Clock className="text-growth h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">إجمالي الساعات</p>
            <p className="text-trust text-lg font-medium">{formatHours(club.totalHours)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={() => onViewDetails(club.id)} className="btn-secondary w-full text-center">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

export default ClubCard;

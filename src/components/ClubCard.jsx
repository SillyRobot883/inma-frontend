import { Building2, Users, Clock, AlertTriangle, Clock4 } from 'lucide-react';

const ClubCard = ({ club, onViewDetails, formatHours }) => {


  // for context (backend team)

  // متعثر (struggling) = more than 10 pending volunteer hours submissions (tasks)
  // غير نشط (inactive) = no activity for 14+ days
  // الأندية المتعثرة: clubs with more than 10 pending tasks OR no activity for 14+ days

  // Calculate club status based on pending tasks
  const isStruggling = club.pendingTasks > 10;
  
  // Calculate if club is inactive based on last activity
  const lastActivityDate = new Date(club.recentActivity[0]?.date || '');
  const today = new Date();
  const daysSinceLastActivity = Math.floor((today - lastActivityDate) / (1000 * 60 * 60 * 24));
  const isInactive = daysSinceLastActivity > 14;

  // Format date in Hijri
  const formatHijriDate = (date) => {
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
    return hijriDate.replace('١٤٤٥', '١٤٤٦'); // Replace 1445 with 1446
  };

  return (
    <div className={`card hover:shadow-lg transition-shadow duration-200 ${
      (isStruggling || isInactive) ? 'border-l-4 border-yellow-500' : ''
    }`}>
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="h-16 w-16 rounded-xl overflow-hidden">
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
          <h3 className="text-lg font-kaff text-trust">
            {club.name}
          </h3>
          {/* Performance Indicators */}
          <div className="flex items-center space-x-2 space-x-reverse mt-1">
            {isStruggling && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <AlertTriangle className="h-3 w-3 ml-1" />
                {club.pendingTasks} مهام معلقة
              </span>
            )}
            {isInactive && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <Clock4 className="h-3 w-3 ml-1" />
                غير نشط منذ {daysSinceLastActivity} يوم
              </span>
            )}
          </div>
          {/* Last Activity Date */}
          <div className="mt-1 text-xs text-gray-500 flex items-center">
            <Clock4 className="h-3 w-3 ml-1" />
            آخر نشاط: {formatHijriDate(lastActivityDate)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="p-2 rounded-lg bg-growth/10">
            <Users className="h-5 w-5 text-growth" />
          </div>
          <div>
            <p className="text-sm text-gray-500">عدد الأعضاء</p>
            <p className="text-lg font-medium text-trust">
              {club.members}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="p-2 rounded-lg bg-growth/10">
            <Clock className="h-5 w-5 text-growth" />
          </div>
          <div>
            <p className="text-sm text-gray-500">إجمالي الساعات</p>
            <p className="text-lg font-medium text-trust">
              {formatHours(club.totalHours)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={() => onViewDetails(club.id)}
          className="btn-secondary w-full text-center"
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

export default ClubCard; 
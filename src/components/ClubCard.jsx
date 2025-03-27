import { Building2, Users, Clock } from 'lucide-react';

const ClubCard = ({ club, onViewDetails, formatHours }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
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
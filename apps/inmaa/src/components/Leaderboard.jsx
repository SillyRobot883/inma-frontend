import { Award, Medal, Trophy } from 'lucide-react';

const Leaderboard = ({ data = [], maxItems = 10 }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <Award className="text-trust/50 h-5 w-5" />;
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="space-y-3">
        {data.slice(0, maxItems).map((item, index) => (
          <div
            key={index}
            className="hover:bg-trust/5 group flex items-center justify-between rounded-lg p-3 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex-shrink-0">{getRankIcon(index)}</div>
              <div>
                <p className="group-hover:text-trust text-sm font-medium text-gray-900 transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.role || 'عضو'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-trust text-sm font-medium">{formatTime(item.hours)}</span>
              <span className="text-xs text-gray-500">ساعة</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;

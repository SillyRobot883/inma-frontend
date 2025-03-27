import { Trophy, Medal, Award } from 'lucide-react';

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
        return <Award className="h-5 w-5 text-trust/50" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="space-y-3">
        {data.slice(0, maxItems).map((item, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:bg-trust/5 group"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="flex-shrink-0">
                {getRankIcon(index)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 group-hover:text-trust transition-colors duration-300">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">
                  {item.role || 'عضو'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm font-medium text-trust">
                {formatTime(item.hours)}
              </span>
              <span className="text-xs text-gray-500">ساعة</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 
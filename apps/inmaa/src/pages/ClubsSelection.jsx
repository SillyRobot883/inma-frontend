import { useNavigate } from 'react-router-dom';

import { Building2 } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const ClubsSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is an admin, redirect to appropriate dashboard
  if (user.role === 'inma_admin') {
    navigate('/inma-dashboard');
    return null;
  }
  if (user.role === 'college_admin') {
    navigate('/college-dashboard');
    return null;
  }

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

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-kaff text-trust mb-4">مرحباً {user.name}</h1>
          <p className="text-gray-600">اختر النادي الذي تريد الوصول إليه</p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => navigate(`/dashboard/${club.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 text-right group"
            >
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="h-16 w-16 rounded-xl bg-trust/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="h-8 w-8 text-trust" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-kaff text-trust mb-2">{club.name}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${getRoleColor(club.role)}`}
                  >
                    {getRoleText(club.role)}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsSelection;

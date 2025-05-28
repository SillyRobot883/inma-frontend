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
    <div className="min-h-screen bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-kaff text-trust mb-4 text-3xl">مرحباً {user.name}</h1>
          <p className="text-gray-600">اختر النادي الذي تريد الوصول إليه</p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {user.clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => navigate(`/dashboard/${club.id}`)}
              className="group rounded-xl bg-white p-6 text-right shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="bg-trust/10 flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                  <Building2 className="text-trust h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-kaff text-trust mb-2 text-lg">{club.name}</h3>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs ${getRoleColor(club.role)}`}
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

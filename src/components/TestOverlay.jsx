import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings, X, User, Shield, Building2 } from 'lucide-react';

const TestOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { id: 'inma_admin', label: 'مشرف إنماء', icon: Shield },
    { id: 'college_admin', label: 'مشرف العمادة', icon: Shield },
    { id: 'leader', label: 'قائد النادي', icon: Building2 },
    { id: 'hr', label: 'موارد بشرية', icon: User },
    { id: 'member', label: 'عضو', icon: User }
  ];

  const clubs = [
    { id: 1, name: 'نادي تيكنيشن', role: 'hr' },
    { id: 2, name: 'نادي الابتكار', role: 'member' },
    { id: 3, name: 'نادي التصميم', role: 'member' }
  ];

  const handleRoleChange = (role) => {
    setUser(prev => ({
      ...prev,
      role,
      clubs: prev.clubs.map(club => ({
        ...club,
        role: role === 'inma_admin' || role === 'college_admin' ? club.role : role
      }))
    }));

    // Navigate to appropriate dashboard based on role
    if (role === 'inma_admin') {
      navigate('/inma-dashboard');
    } else if (role === 'college_admin') {
      navigate('/college-dashboard');
    } else {
      // For other roles, navigate to the first club's dashboard
      const firstClub = user.clubs[0];
      if (firstClub) {
        navigate(`/dashboard/${firstClub.id}`);
      }
    }
  };

  const handleClubRoleChange = (clubId, role) => {
    setUser(prev => ({
      ...prev,
      clubs: prev.clubs.map(club => 
        club.id === clubId ? { ...club, role } : club
      )
    }));
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-trust/80 hover:bg-trust text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-kaff text-trust">إعدادات الاختبار</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">الدور الرئيسي</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {roles.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleRoleChange(id)}
                    className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg border transition-all duration-200 ${
                      user.role === id
                        ? 'border-trust bg-trust/10 text-trust'
                        : 'border-gray-200 hover:border-trust/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Club Roles */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">أدوار الأندية</h3>
              <div className="space-y-4">
                {clubs.map(club => (
                  <div
                    key={club.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium">{club.name}</span>
                    <select
                      value={user.clubs.find(c => c.id === club.id)?.role || 'member'}
                      onChange={(e) => handleClubRoleChange(club.id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-trust/20 focus:border-trust"
                    >
                      <option value="leader">قائد النادي</option>
                      <option value="hr">موارد بشرية</option>
                      <option value="member">عضو</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestOverlay; 
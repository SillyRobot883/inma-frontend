import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  ClipboardList, 
  Users, 
  Settings,
  LogOut,
  Building2,
  ChevronDown
} from 'lucide-react';
import logo from '../assets/1-05.png';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentClub, switchClub } = useAuth();
  const isClubsPage = location.pathname === '/clubs';

  const navigation = [
    { 
      name: 'الرئيسية', 
      href: `/dashboard/${currentClub?.id}`,
      icon: Home 
    },
    { 
      name: 'تقديم مهمة', 
      href: `/task-submission/${currentClub?.id}`,
      icon: ClipboardList 
    },
    ...(currentClub?.role === 'hr' || currentClub?.role === 'leader'
      ? [{ 
          name: 'لوحة الموارد البشرية', 
          href: `/hr-dashboard/${currentClub?.id}`,
          icon: Users 
        }]
      : []),
  ];

  const handleClubSwitch = (clubId) => {
    switchClub(clubId);
    // Update the current route with the new club ID
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/\/\d+/, `/${clubId}`);
    navigate(newPath);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {!isClubsPage && (
        <div className="sidebar">
          <div className="flex flex-col h-full">
            {/* Logo section */}
            <div className="flex items-center justify-center h-20 px-4 bg-excellence/50">
              <img
                className="h-24 w-auto"
                src={logo}
                alt="إنماء الإندية"
              />
            </div>

            {/* User info */}
            <div className="px-4 py-6 border-b border-white/10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="h-10 w-10 rounded-full bg-growth/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {user?.name}
                  </h3>
                  <button
                    onClick={() => document.getElementById('clubDropdown').classList.toggle('hidden')}
                    className="mt-1 flex items-center text-xs text-white/70 hover:text-white"
                  >
                    <span>{currentClub?.name}</span>
                    <ChevronDown className="h-3 w-3 mr-1" />
                  </button>
                  {/* Dropdown */}
                  <div
                    id="clubDropdown"
                    className="hidden absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 right-16"
                  >
                    {user?.clubs.map((club) => (
                      <button
                        key={club.id}
                        onClick={() => {
                          handleClubSwitch(club.id);
                          document.getElementById('clubDropdown').classList.add('hidden');
                        }}
                        className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-100 ${
                          club.id === currentClub?.id ? 'bg-trust/10 text-trust' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                            {club.role === 'hr' ? 'موارد بشرية' : club.role === 'leader' ? 'قائد' : 'عضو'}
                          </span>
                          <span>{club.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`sidebar-link ${
                      location.pathname === item.href ? 'active' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5 ml-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-2 py-4 border-t border-white/10">
              <Link
                to="/settings"
                className="sidebar-link"
              >
                <Settings className="h-5 w-5 ml-3" />
                الإعدادات
              </Link>
              <button
                onClick={() => {/* Implement logout */}}
                className="sidebar-link w-full text-right text-red-300 hover:bg-red-500/20"
              >
                <LogOut className="h-5 w-5 ml-3" />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={!isClubsPage ? "mr-64" : ""}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-kaff text-trust">
              {isClubsPage ? "الأندية" : (navigation.find((item) => item.href === location.pathname)?.name || 'الرئيسية')}
            </h1>
          </div>
        </header>

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 
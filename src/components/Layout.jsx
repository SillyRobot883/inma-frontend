import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  ClipboardList, 
  Users, 
  Settings,
  LogOut,
  Building2,
  ChevronDown,
  Bell,
  User,
  Shield
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
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/\/\d+/, `/${clubId}`);
    navigate(newPath);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'hr':
        return <Users className="h-4 w-4" />;
      case 'leader':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'hr':
        return 'موارد بشرية';
      case 'leader':
        return 'مشرف نادي';
      default:
        return 'عضو';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {!isClubsPage && (
        <div className="fixed top-0 right-0 w-64 h-full bg-trust shadow-xl z-50">
          <div className="flex flex-col h-full">
            {/* Logo section */}
            <div className="flex items-center justify-center h-20 px-4 border-b border-white/10">
              <img
                className="h-24 w-auto transform transition-transform duration-300 hover:scale-105"
                src={logo}
                alt="إنماء الإندية"
              />
            </div>

            {/* User info */}
            <div className="px-4 py-6 border-b border-white/10">
              <div className="flex flex-col space-y-4">
                {/* User Avatar and Name */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="h-12 w-12 rounded-full bg-growth/20 flex items-center justify-center ring-2 ring-white/20 transform transition-transform duration-300 hover:scale-105">
                    <span className="text-base font-medium text-white">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {user?.name}
                    </h3>
                    <div className="flex items-center mt-1 text-xs text-white/70">
                      {getRoleIcon(currentClub?.role)}
                      <span className="mr-1.5 font-medium">{getRoleText(currentClub?.role)}</span>
                    </div>
                  </div>
                </div>

                {/* Current Club Section */}
                <div className="bg-white/5 rounded-xl p-3 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => document.getElementById('clubDropdown').classList.toggle('hidden')}
                      className="flex items-center justify-between w-full text-white group"
                    >
                      <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="text-right">
                        <p className="text-xs text-white/70">النادي الحالي</p>
                        <p className="text-sm font-medium mt-0.5">{currentClub?.name}</p>
                      </div>
                    </button>
                  </div>

                  {/* Enhanced Dropdown */}
                  <div
                    id="clubDropdown"
                    className="hidden absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 right-16 border border-gray-100"
                  >
                    <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 rounded-t-lg border-b border-gray-100">
                      الأندية المتاحة
                    </div>
                    {user?.clubs.map((club) => (
                      <button
                        key={club.id}
                        onClick={() => {
                          handleClubSwitch(club.id);
                          document.getElementById('clubDropdown').classList.add('hidden');
                        }}
                        className={`w-full text-right px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          club.id === currentClub?.id ? 'bg-trust/5 text-trust' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {getRoleIcon(club.role)}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {getRoleText(club.role)}
                            </span>
                          </div>
                          <span className="font-medium">{club.name}</span>
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
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/90 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ml-3 transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-white/90'}`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-2 py-4 border-t border-white/10">
              <Link
                to="/settings"
                className="flex items-center px-4 py-3 rounded-xl text-white/90 hover:bg-white/5 transition-all duration-300"
              >
                <Settings className="h-5 w-5 ml-3 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">الإعدادات</span>
              </Link>
              <button
                onClick={() => {/* Implement logout */}}
                className="w-full flex items-center px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 transition-all duration-300"
              >
                <LogOut className="h-5 w-5 ml-3 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={!isClubsPage ? "mr-64" : ""}>
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-6">
            <h1 className="text-2xl font-kaff font-bold text-trust">
              {isClubsPage ? "الأندية" : (navigation.find((item) => item.href === location.pathname)?.name || 'الرئيسية')}
            </h1>
          </div>
        </header>

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 
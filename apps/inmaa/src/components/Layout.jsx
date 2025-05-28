import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  ChevronDown,
  ClipboardList,
  Clock,
  Home,
  LogOut,
  Shield,
  User,
  UserCog,
  Users,
} from 'lucide-react';

import logo from '../assets/1-05.png';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentClub, switchClub } = useAuth();
  const isClubsPage = location.pathname === '/clubs';

  const navigation = [
    {
      name: 'الرئيسية',
      href: `/dashboard/${currentClub?.id}`,
      icon: Home,
    },
    {
      name: 'رفع الساعات التطوعية',
      href: `/task-submission/${currentClub?.id}`,
      icon: ClipboardList,
    },
    {
      name: 'سجل الساعات التطوعية',
      href: `/volunteer-hours/${currentClub?.id}`,
      icon: Clock,
    },
    ...(currentClub?.role === 'hr' || currentClub?.role === 'leader'
      ? [
          {
            name: 'إدارة الأعضاء',
            href: `/member-management/${currentClub?.id}`,
            icon: UserCog,
          },
          {
            name: 'لوحة الموارد البشرية',
            href: `/hr-dashboard/${currentClub?.id}`,
            icon: Users,
          },
        ]
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
        return 'قائد نادي';
      default:
        return 'عضو';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {!isClubsPage && (
        <div className="bg-trust fixed right-0 top-0 z-50 h-full w-64 shadow-xl">
          <div className="flex h-full flex-col">
            {/* Logo section */}
            <div className="flex h-20 items-center justify-center border-b border-white/10 px-4">
              <img
                className="h-24 w-auto transform transition-transform duration-300 hover:scale-105"
                src={logo}
                alt="إنماء الإندية"
              />
            </div>

            {/* User info */}
            <div className="border-b border-white/10 px-4 py-6">
              <div className="flex flex-col space-y-4">
                {/* User Avatar and Name */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="bg-growth/20 flex h-12 w-12 transform items-center justify-center rounded-full ring-2 ring-white/20 transition-transform duration-300 hover:scale-105">
                    <span className="text-base font-medium text-white">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">{user?.name}</h3>
                    <div className="mt-1 flex items-center text-xs text-white/70">
                      {getRoleIcon(currentClub?.role)}
                      <span className="mr-1.5 font-medium">{getRoleText(currentClub?.role)}</span>
                    </div>
                  </div>
                </div>

                {/* Current Club Section */}
                <div className="rounded-xl bg-white/5 p-3 transition-all duration-300 hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        document.getElementById('clubDropdown').classList.toggle('hidden')
                      }
                      className="group flex w-full items-center text-white"
                    >
                      <ChevronDown className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
                      <div className="mr-3 flex items-center space-x-3 space-x-reverse text-right">
                        <div className="h-8 w-8 overflow-hidden rounded-lg shadow-sm ring-2 ring-white/20">
                          <img
                            className="h-full w-full object-cover"
                            src={`/src/assets/club-${currentClub?.id}.png`}
                            alt={currentClub?.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/src/assets/1-06.png';
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-xs text-white/70">النادي الحالي</p>
                          <p className="mt-0.5 text-sm font-medium">{currentClub?.name}</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Enhanced Dropdown */}
                  <div
                    id="clubDropdown"
                    className="absolute right-16 z-10 mt-2 hidden w-64 rounded-lg border border-gray-100 bg-white py-1 shadow-lg"
                  >
                    <div className="rounded-t-lg border-b border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                      الأندية المتاحة
                    </div>
                    {user?.clubs.map((club) => (
                      <button
                        key={club.id}
                        onClick={() => {
                          handleClubSwitch(club.id);
                          document.getElementById('clubDropdown').classList.add('hidden');
                        }}
                        className={`w-full px-4 py-3 text-right text-sm transition-colors hover:bg-gray-50 ${
                          club.id === currentClub?.id ? 'bg-trust/5 text-trust' : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {getRoleIcon(club.role)}
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
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
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                      isActive ? 'bg-white/10 text-white' : 'text-white/90 hover:bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`ml-3 h-5 w-5 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                    />
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-white/90'}`}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="border-t border-white/10 px-2 py-4">
              <button
                onClick={() => {
                  /* Implement logout */
                }}
                className="flex w-full items-center rounded-xl px-4 py-3 text-red-300 transition-all duration-300 hover:bg-red-500/20"
              >
                <LogOut className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="font-medium">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={!isClubsPage ? 'mr-64' : ''}>
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-6">
            <h1 className="font-kaff text-trust text-2xl font-bold">
              {isClubsPage
                ? 'الأندية'
                : navigation.find((item) => item.href === location.pathname)?.name || 'الرئيسية'}
            </h1>
          </div>
        </header>

        <main className="py-8">
          <div className="mx-auto max-w-7xl px-6">{children}</div>
        </main>
      </div>

      {/* Portal container for modals */}
      <div id="modal-root"></div>
    </div>
  );
};

export default Layout;

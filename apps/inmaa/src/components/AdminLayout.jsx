import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { LayoutDashboard, LogOut, Shield, Users } from 'lucide-react';

import logo from '../assets/1-05.png';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children, isInmaAdmin = false }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'لوحة التحكم',
      href: isInmaAdmin ? '/inma-dashboard' : '/college-dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'إدارة المستخدمين',
      href: isInmaAdmin ? '/inma-dashboard/users' : '/college-dashboard/users',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
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
                  <span className="text-base font-medium text-white">{user?.name?.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{user?.name}</h3>
                  <div className="mt-1 flex items-center text-xs text-white/70">
                    <Shield className="ml-1 h-4 w-4" />
                    <span className="font-medium">
                      {isInmaAdmin ? 'مشرف إنماء' : 'مشرف العمادة'}
                    </span>
                  </div>
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

      {/* Main content */}
      <div className="mr-64">
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

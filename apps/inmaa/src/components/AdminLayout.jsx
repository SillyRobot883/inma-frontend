import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  Settings,
  User,
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/1-05.png';

const AdminLayout = ({ children, isInmaAdmin = false }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation = [
    { 
      name: 'لوحة التحكم', 
      href: isInmaAdmin ? '/inma-dashboard' : '/college-dashboard',
      icon: LayoutDashboard 
    },
    { 
      name: 'إدارة المستخدمين', 
      href: isInmaAdmin ? '/inma-dashboard/users' : '/college-dashboard/users',
      icon: Users 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
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
                    <Shield className="h-4 w-4 ml-1" />
                    <span className="font-medium">{isInmaAdmin ? 'مشرف إنماء' : 'مشرف العمادة'}</span>
                  </div>
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

      {/* Main content */}
      <div className="mr-64">
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 
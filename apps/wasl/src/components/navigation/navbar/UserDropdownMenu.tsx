import { useNavigate } from 'react-router-dom';

import { Calendar, LayoutDashboard, LogOut, UserCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export function UserDropdownMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {(user?.globalRole === 'INMA_ADMIN' || user?.globalRole === 'UNI_ADMIN') && (
        <Button
          variant="outline"
          className="border-trust-blue text-trust-blue hover:bg-trust-blue hidden hover:text-white md:flex"
          onClick={() => navigate('/dashboard')}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          لوحة التحكم
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.profileImage} alt={user?.displayName} />
              <AvatarFallback className="bg-trust-blue text-white">
                {user?.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rtl w-56 text-right" align="start">
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuLabel className="truncate text-xs font-normal">
            {user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.globalRole === 'INMA_ADMIN' || user?.globalRole === 'UNI_ADMIN' ? (
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>لوحة التحكم</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>الملف الشخصي</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => navigate('/events?filter=registered')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>فعالياتي</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>تسجيل الخروج</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

import { useNavigate } from 'react-router-dom';

import { Calendar, LogOut, UserCircle } from 'lucide-react';

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
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <span>الملف الشخصي</span>
            <UserCircle className="ml-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/events?tab=my')}>
            <span>فعالياتي</span>
            <Calendar className="ml-2 h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} variant="destructive">
            <span>تسجيل الخروج</span>
            <LogOut className="ml-2 h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

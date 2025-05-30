import { Mail } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  displayName?: string;
  email?: string;
  profileImage?: string;
}

interface ProfileHeaderProps {
  user: User | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="from-trust-blue to-excellence-navy rounded-lg bg-gradient-to-r p-6 text-white">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.profileImage} alt={user?.displayName} />
          <AvatarFallback className="bg-white/20 text-2xl font-bold text-white">
            {user?.displayName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="mb-1 text-2xl font-bold">{user?.displayName}</h1>
          <p className="flex items-center gap-2 text-white/90">
            <Mail className="h-4 w-4" />
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

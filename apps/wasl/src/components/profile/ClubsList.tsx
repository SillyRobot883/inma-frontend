import { useNavigate } from 'react-router-dom';

import { Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ClubCard } from './ClubCard';

interface UserClub {
  id: number;
  name: string;
  role: 'CLUB_ADMIN' | 'HR' | 'MEMBER';
}

interface ClubsListProps {
  clubs: UserClub[];
}

export function ClubsList({ clubs }: ClubsListProps) {
  const navigate = useNavigate();

  if (clubs.length === 0) {
    return (
      <div className="py-8 text-center">
        <Users className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-medium">لم تنضم لأي نادي بعد</h3>
        <p className="text-muted-foreground mb-4">
          انضم للأندية المتاحة وابدأ رحلتك في الأنشطة الطلابية
        </p>
        <Button onClick={() => navigate('/clubs')}>تصفح الأندية المتاحة</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={() => navigate('/clubs')}>
        تصفح المزيد من الأندية
      </Button>
    </div>
  );
}

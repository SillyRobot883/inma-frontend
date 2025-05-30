interface UserClub {
  id: number;
  name: string;
  role: 'CLUB_ADMIN' | 'HR' | 'MEMBER';
}

interface ClubCardProps {
  club: UserClub;
}

export function ClubCard({ club }: ClubCardProps) {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'MEMBER':
        return 'عضو';
      case 'HR':
        return 'موارد بشرية';
      case 'CLUB_ADMIN':
        return 'مشرف نادي';
      default:
        return 'عضو';
    }
  };

  const getRoleBadgeStyles = (role: string) => {
    switch (role) {
      case 'CLUB_ADMIN':
        return 'bg-trust-blue/10 text-trust-blue';
      case 'HR':
        return 'bg-excellence-navy/10 text-excellence-navy';
      case 'MEMBER':
        return 'bg-growth-green/10 text-growth-green';
      default:
        return 'bg-growth-green/10 text-growth-green';
    }
  };

  return (
    <div className="border-trust-blue/20 hover:border-trust-blue rounded-lg border border-l-4 p-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="text-right">
          <p className="font-medium">{club.name}</p>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium ${getRoleBadgeStyles(club.role)}`}
        >
          {getRoleLabel(club.role)}
        </div>
      </div>
    </div>
  );
}

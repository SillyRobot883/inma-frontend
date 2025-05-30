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

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {getRoleLabel(club.role)}
        </div>
        <div className="text-right">
          <p className="font-medium">{club.name}</p>
        </div>
      </div>
    </div>
  );
}

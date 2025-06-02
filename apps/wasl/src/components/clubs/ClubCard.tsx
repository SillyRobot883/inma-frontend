import { Link } from 'react-router-dom';

import type { Club } from '@inmaa-wasl/api-client';
import { Calendar, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatArabicDate } from '@/lib/utils';

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-200 hover:border-green-300';
      case 'inactive':
        return 'border-gray-200 hover:border-gray-300';
      case 'archived':
        return 'border-red-200 hover:border-red-300';
      default:
        return 'border-gray-200 hover:border-gray-300';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'specialized':
        return <Badge className="bg-blue-100 text-blue-800">متخصص</Badge>;
      case 'general':
        return <Badge className="bg-purple-100 text-purple-800">عام</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Card className={`${getStatusColor(club.status)} transition-all duration-300 hover:shadow-md`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={club.logo}
                alt={club.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center';
                }}
              />
            </div>
            <div>
              <CardTitle className="text-trust-blue line-clamp-1 text-lg">{club.name}</CardTitle>
              <div className="mt-1 flex items-center gap-2">
                {getTypeBadge(club.type)}
                {club.status === 'active' && (
                  <Badge className="bg-green-100 text-green-800">نشط</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{club.description}</p>

        <div className="space-y-2 text-sm">
          {club.foundingDate && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                تاريخ التأسيس:
              </span>
              <span>{formatArabicDate(club.foundingDate)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">النوع:</span>
            <span>{club.type === 'specialized' ? 'متخصص' : 'عام'}</span>
          </div>
        </div>

        <Link to={`/clubs/${club.uuid}`}>
          <Button className="bg-trust-blue hover:bg-trust-blue/90 mt-4 w-full">
            <Users className="ml-2 h-4 w-4" />
            عرض التفاصيل
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

export function MobileNavLinks() {
  const location = useLocation();

  return (
    <div className="scrollbar-hide flex gap-1 overflow-x-auto lg:hidden">
      <Link
        to="/events"
        className={cn(
          'whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-bold',
          location.pathname.startsWith('/events')
            ? 'text-primary bg-primary/10'
            : 'text-muted-foreground hover:text-primary hover:bg-accent'
        )}
      >
        الفعاليات
      </Link>
      <Link
        to="/clubs"
        className={cn(
          'whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-bold',
          location.pathname.startsWith('/clubs')
            ? 'text-primary bg-primary/10'
            : 'text-muted-foreground hover:text-primary hover:bg-accent'
        )}
      >
        الأندية
      </Link>
    </div>
  );
}

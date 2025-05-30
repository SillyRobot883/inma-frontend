import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

export function MobileNavLinks() {
  const location = useLocation();

  return (
    <div className="scrollbar-hide flex gap-1 overflow-x-auto lg:hidden">
      <Link
        to="/events"
        className={cn(
          'whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-bold transition-colors',
          location.pathname.startsWith('/events')
            ? 'text-trust-blue bg-trust-blue/10 border-trust-blue/20 border'
            : 'text-muted-foreground hover:text-trust-blue hover:bg-trust-blue/5'
        )}
      >
        الفعاليات
      </Link>
      <Link
        to="/clubs"
        className={cn(
          'whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-bold transition-colors',
          location.pathname.startsWith('/clubs')
            ? 'text-trust-blue bg-trust-blue/10 border-trust-blue/20 border'
            : 'text-muted-foreground hover:text-trust-blue hover:bg-trust-blue/5'
        )}
      >
        الأندية
      </Link>
    </div>
  );
}

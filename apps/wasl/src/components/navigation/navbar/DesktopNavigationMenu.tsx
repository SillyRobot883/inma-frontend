import { Link, useLocation } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export function DesktopNavigationMenu() {
  const location = useLocation();

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="text-[15px] font-bold focus:bg-transparent data-[state=open]:bg-transparent"
            onPointerDown={(e) => e.preventDefault()}
            onPointerUp={(e) => e.preventDefault()}
            onClick={(e) => e.preventDefault()}
          >
            الفعاليات
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-6">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-trust-blue to-excellence-navy flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md"
                    to="/events"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-white">استكشف الفعاليات</div>
                    <p className="text-sm leading-tight text-white/90">
                      تصفح جميع الفعاليات المتاحة في الجامعة
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/events?filter=upcoming"
                    className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                  >
                    <div className="text-sm font-medium">الفعاليات القادمة</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      الفعاليات التي ستقام في الأيام القادمة
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/events?filter=registered"
                    className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors"
                  >
                    <div className="text-sm font-medium">فعالياتي</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                      الفعاليات التي سجلت بها مسبقاً
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            to="/clubs"
            className={cn(
              'px-4 py-2 text-[15px] font-bold',
              location.pathname.startsWith('/clubs')
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            الأندية الطلابية
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

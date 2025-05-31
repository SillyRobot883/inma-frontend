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
          <Link
            to="/clubs"
            className={cn(
              'px-4 py-2 text-[15px] font-bold transition-colors',
              location.pathname.startsWith('/clubs')
                ? 'text-trust-blue border-trust-blue border-b-2'
                : 'text-muted-foreground hover:text-trust-blue'
            )}
          >
            الأندية الطلابية
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="rtl text-right text-[15px] font-bold focus:bg-transparent data-[state=open]:bg-transparent"
            onPointerDown={(e) => e.preventDefault()}
            onPointerUp={(e) => e.preventDefault()}
            onClick={(e) => e.preventDefault()}
          >
            الفعاليات
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-80 gap-3 p-6" dir="rtl">
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
                    to="/events?tab=all&status=upcoming&category=all"
                    className="hover:bg-secondary-blue/10 hover:text-secondary-blue focus:bg-secondary-blue/10 focus:text-secondary-blue border-secondary-blue/20 hover:border-secondary-blue block select-none space-y-1 rounded-md border-l-4 p-3 leading-none no-underline outline-none transition-colors"
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
                    to="/events?tab=registered&status=all&category=all"
                    className="hover:bg-growth-green/10 hover:text-growth-green focus:bg-growth-green/10 focus:text-growth-green border-growth-green/20 hover:border-growth-green block select-none space-y-1 rounded-md border-l-4 p-3 leading-none no-underline outline-none transition-colors"
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

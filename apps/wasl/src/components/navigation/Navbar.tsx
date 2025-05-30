import { useAuth } from '@/contexts/AuthContext';

import { AuthButton } from './navbar/AuthButton';
import { DesktopNavigationMenu } from './navbar/DesktopNavigationMenu';
import { Logo } from './navbar/Logo';
import { MobileNavLinks } from './navbar/MobileNavLinks';
import { UserDropdownMenu } from './navbar/UserDropdownMenu';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2 lg:gap-6">
          <Logo />
          <MobileNavLinks />
          <DesktopNavigationMenu />
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? <UserDropdownMenu /> : <AuthButton />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

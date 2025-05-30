import { Link } from 'react-router-dom';

import logo from '@/assets/logo.svg';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="وصل" className="h-8 w-auto" />
      <span className="font-heading text-trust-blue text-xl font-extrabold">وصل</span>
    </Link>
  );
}

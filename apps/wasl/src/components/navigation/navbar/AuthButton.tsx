import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export function AuthButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/login')}
      className="bg-growth-green hover:bg-growth-green/90 text-white"
    >
      تسجيل الدخول
    </Button>
  );
}

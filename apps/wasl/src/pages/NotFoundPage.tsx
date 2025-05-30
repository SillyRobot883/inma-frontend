import { useNavigate } from 'react-router-dom';

import { Home } from 'lucide-react';

import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-4 py-10 text-center md:px-6 lg:px-8">
      <h1 className="font-heading mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">الصفحة غير موجودة</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون غير موجودة أو تم نقلها.
      </p>
      <Button onClick={() => navigate('/')} className="flex items-center">
        <Home className="ml-2 h-4 w-4" />
        العودة إلى الصفحة الرئيسية
      </Button>
    </div>
  );
};

export default NotFoundPage;

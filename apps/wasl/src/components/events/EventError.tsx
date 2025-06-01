import { AlertTriangle, RefreshCw, Wifi } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventErrorProps {
  error: Error;
  onRetry: () => void;
  className?: string;
}

export function EventError({ error, onRetry, className = '' }: EventErrorProps) {
  const isNetworkError =
    error.message.toLowerCase().includes('network') ||
    error.message.toLowerCase().includes('fetch');

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            {isNetworkError ? (
              <Wifi className="h-8 w-8 text-red-600" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-red-600" />
            )}
          </div>
          <CardTitle className="text-red-900">
            {isNetworkError ? 'مشكلة في الاتصال' : 'حدث خطأ'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-gray-600" dir="rtl">
            {isNetworkError
              ? 'تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.'
              : 'حدث خطأ أثناء تحميل الفعاليات. يرجى المحاولة مرة أخرى.'}
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left text-xs text-gray-500">
              <summary className="cursor-pointer font-medium">تفاصيل الخطأ</summary>
              <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
                {error.message}
              </pre>
            </details>
          )}

          <Button onClick={onRetry} className="bg-trust-blue hover:bg-trust-blue/90">
            <RefreshCw className="ml-2 h-4 w-4" />
            إعادة المحاولة
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

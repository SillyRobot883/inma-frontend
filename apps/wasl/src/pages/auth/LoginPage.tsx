import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { type LoginFormData, loginSchema } from '@/lib/validations';

function LoginPage() {
  const [submitError, setSubmitError] = useState('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      nationalId: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError('');

    try {
      await login(data);
      navigate('/');
    } catch (err) {
      setSubmitError('فشل في تسجيل الدخول. تحقق من المعلومات المدخلة.');
      console.error('Login error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="border-trust-blue h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
          <span className="text-muted-foreground">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="from-trust-blue/5 to-excellence-navy/5 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-heading text-2xl">تسجيل الدخول</CardTitle>
          <CardDescription>أدخل معلوماتك للوصول إلى حسابك في وصل</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهوية الوطنية</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="أدخل رقم الهوية الوطنية"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submitError && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{submitError}</div>
              )}

              <Button
                type="submit"
                className="bg-trust-blue hover:bg-trust-blue/90 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nationalId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dummy login - will be replaced with real API call
    navigate('/clubs-selection');
    try {
      const user = await login(formData);

      // Redirect based on role
      if (user.globalRole === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.globalRole === 'user') {
        navigate('/clubs-selection');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-48 w-auto" src="/src/assets/1-01.png" alt="إنماء الأندية" />
          <h2 className="font-kaff text-trust mt-6 text-center text-3xl">تسجيل الدخول</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="focus:ring-growth focus:border-growth relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="nationalId" className="sr-only">
                رقم الهوية الوطنية
              </label>
              <input
                id="nationalId"
                name="nationalId"
                type="text"
                required
                className="focus:ring-growth focus:border-growth relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm"
                placeholder="رقم الهوية الوطنية"
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-growth focus:ring-growth group relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

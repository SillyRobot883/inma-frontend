import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    nationalId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dummy login - will be replaced with real API call
    navigate("/clubs-selection");
    try {
      const user = await login(formData);

      // Redirect based on role
      if (user.globalRole === "admin") {
        navigate("/admin-dashboard");
      } else if (user.globalRole === "user") {
        navigate("/clubs-selection");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-48 w-auto"
            src="/src/assets/1-01.png"
            alt="إنماء الأندية"
          />
          <h2 className="mt-6 text-center text-3xl font-kaff text-trust">
            تسجيل الدخول
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-growth focus:border-growth focus:z-10 sm:text-sm"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-growth focus:border-growth focus:z-10 sm:text-sm"
                placeholder="رقم الهوية الوطنية"
                value={formData.nationalId}
                onChange={(e) =>
                  setFormData({ ...formData, nationalId: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-growth hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-growth"
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

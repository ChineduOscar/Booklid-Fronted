import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/login', formData);

      const { message, token, data } = response.data;

      Cookies.set('token', token, {
        expires: 7,
        sameSite: 'strict',
        secure: import.meta.env.PROD,
      });

      toast.success(message); 
      data.role === 'admin'
        ? navigate('/admin/dashboard')
        : navigate('/');

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a1a2e] flex-col justify-between p-12">
        <Link to="/" className="text-2xl font-bold text-orange-500">Booklid</Link>

        <div className="space-y-6">
          <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Welcome back,<br />
            <span className="text-orange-500">reader.</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Sign in to explore the full collection and pick up right where you left off.
          </p>

          {/* Decorative book stack */}
          <div className="mt-8 flex gap-3 items-end">
            {[
              { h: 'h-24', bg: 'bg-orange-500' },
              { h: 'h-32', bg: 'bg-[#37418e]' },
              { h: 'h-20', bg: 'bg-[#41c34e]' },
              { h: 'h-28', bg: 'bg-orange-400' },
              { h: 'h-16', bg: 'bg-blue-400' },
            ].map((book, i) => (
              <div key={i} className={`w-8 ${book.h} ${book.bg} rounded-t-sm opacity-80`}></div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-600">© {new Date().getFullYear()} Booklid. All rights reserved.</p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block text-2xl font-bold text-orange-500 mb-8">Booklid</Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h1>
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs text-orange-500 hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium cursor-pointer"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit */}
           <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-md shadow-orange-100 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default SignIn;
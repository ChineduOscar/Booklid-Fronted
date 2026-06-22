import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/axios'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreed) {
      toast.error('Please accept the Terms and Privacy Policy');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/register', formData);

      const { message, token } = response.data;

      Cookies.set('token', token, {
        expires: 7,
        secure: false,
        sameSite: 'strict',
      });

      toast.success(message);

      navigate('/');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Registration failed'
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
            Start your<br />
            <span className="text-orange-500">reading journey.</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-sm">
            Join thousands of readers exploring a world of powerful stories, thought-provoking essays, and unforgettable ideas.
          </p>

          {/* Quote */}
          <div className="border-l-4 border-orange-500 pl-4 mt-6">
            <p className="text-gray-300 text-sm italic leading-relaxed">
              "Every story reveals only part of the truth."
            </p>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create account</h1>
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-orange-500 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Fullname */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Felix Obi"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                id="terms"
                className="mt-0.5 w-4 h-4 accent-orange-500 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-orange-500 font-semibold hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-orange-500 font-semibold hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-md shadow-orange-100 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Register;
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, AlertCircle, Check, Loader } from 'lucide-react';
import { checkEmailExists } from '../lib/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      console.log('Attempting to create account for:', formData.email);
      
      const result = await signup(formData.email, formData.password, formData.username);
      console.log('Signup result:', result);
      
      if (result.success) {
        if (result.requiresEmailVerification) {
          // Show message about email verification
          setSuccess(result.message || 'Account created! Please check your email to verify your account before logging in.');
          // Don't navigate away immediately - let them read the message
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        } else {
          // Offline mode or auto-login
          setSuccess('Account created successfully!');
          setTimeout(() => {
            navigate('/coming-soon');
          }, 3000);
        }
      } else {
        setError(result.error || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#070B14]">
      <div className="w-full max-w-md space-y-8 bg-[#0B1221] p-8 rounded-xl shadow-lg border border-gray-800">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center space-x-3">
              <img 
                src="/Datalis1.png" 
                alt="Datalis Logo" 
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
              <span className="text-2xl sm:text-3xl font-semibold text-white">Datalis</span>
            </div>
          </Link>
          
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{' '}
            <Link to="/login" className="font-medium text-[#00FFD1] hover:text-[#00FFD1]/80">
              sign in to existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-md p-3 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-900/30 border border-green-500 rounded-md p-3 flex items-center gap-3">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00FFD1]"
                  placeholder="Username"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00FFD1]"
                  placeholder="Email address"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00FFD1]"
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00FFD1]"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={() => setAgreeToTerms(!agreeToTerms)}
              className="h-4 w-4 rounded border-gray-300 text-[#00FFD1] focus:ring-[#00FFD1]"
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
              I agree to the{' '}
              <a href="#" className="font-medium text-[#00FFD1] hover:text-[#00FFD1]/80">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-[#00FFD1] hover:text-[#00FFD1]/80">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-[#00FFD1] px-3 py-2 text-sm font-semibold text-black hover:bg-[#00FFD1]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00FFD1] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            By creating an account, you'll receive updates about new features, promotions, and product announcements.
          </div>
        </form>
      </div>
    </div>
  );
}














import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Church, AlertCircle, Mail, Lock } from 'lucide-react';

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('');
    setLoading(true);

    try {
      await login(data.email, data.password);
      // Redirect to dashboard on successful login
      navigate('/');
    } catch (err: any) {
      setAuthError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Left Panel - Branding (Hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 items-center justify-center p-12">
        <div className="max-w-md text-white space-y-6">
          <div className="flex items-center space-x-4">
            <Church className="h-16 w-16" />
            <div>
              <h1 className="text-4xl font-bold">MFMC</h1>
              <p className="text-primary-100 text-lg">Church Management System</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-8">
            <h2 className="text-2xl font-semibold">
              Mahayahay Free Methodist Church
            </h2>
            <p className="text-primary-100 text-lg leading-relaxed">
              Empowering ministry through modern technology. Manage your church community, 
              events, finances, and more—all in one place.
            </p>
          </div>

          <div className="pt-8 space-y-3 text-primary-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
              <span>Member & Small Group Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
              <span>Event Planning & Coordination</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
              <span>Financial Tracking & Reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <Church className="h-12 w-12 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Mahayahay Free Methodist Church
            </h2>
            <p className="text-neutral-600 mt-2">Church Management System</p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-900">Welcome Back</h3>
              <p className="text-neutral-600 mt-2">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {authError && (
                <div className="flex items-center space-x-2 text-error-600 bg-error-50 p-3 rounded-lg border border-error-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{authError}</span>
                </div>
              )}
              
              <Input
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="your.email@church.com"
                error={errors.email?.message}
                icon={<Mail className="h-5 w-5" />}
                iconPosition="left"
                disabled={loading}
                required
              />

              <Input
                {...register('password')}
                type="password"
                label="Password"
                placeholder="••••••••"
                error={errors.password?.message}
                icon={<Lock className="h-5 w-5" />}
                iconPosition="left"
                disabled={loading}
                required
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    {...register('rememberMe')}
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
                    disabled={loading}
                  />
                  <span className="text-sm text-neutral-700">Remember me</span>
                </label>

                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Implement forgot password functionality
                    alert('Forgot password functionality coming soon!');
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
              <h4 className="text-sm font-medium text-primary-900 mb-2">Demo Credentials:</h4>
              <p className="text-sm text-primary-700">
                <strong>Email:</strong> admin@example.com<br />
                <strong>Password:</strong> password
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-neutral-500 mt-6">
            © 2024 Mahayahay Free Methodist Church. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

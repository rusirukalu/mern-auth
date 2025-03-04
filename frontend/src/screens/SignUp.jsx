import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import Spinner from '../components/ui/Spinner';
import { motion as Motion } from 'framer-motion';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ 
          name: formData.name,
          email: formData.email, 
          password: formData.password 
        }).unwrap();
        
        dispatch(setCredentials(res));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900/80 via-green-800/80 to-teal-900/80 animate-gradient-bg dark:from-emerald-950 dark:via-green-900 dark:to-teal-950">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-emerald-200/20 dark:border-emerald-800/20 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-emerald-500/10 hover:border-emerald-400/30">
            <CardHeader className="p-8">
              <CardTitle className="text-4xl font-bold text-emerald-100 dark:text-emerald-300 mb-2 text-center">Sign Up</CardTitle>
              <CardDescription className="text-lg text-emerald-300 dark:text-emerald-400 text-center">
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400 rounded-xl"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400 rounded-xl"
                  required
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400 rounded-xl"
                  required
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400 rounded-xl"
                  required
                />
                {isError && (
                  <div className='text-red-400 text-center text-sm'>
                    {error?.data?.message || 'Registration failed. Please try again.'}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden
                    ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                >
                  {isLoading && (
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Spinner />
                    </span>
                  )}
                  <span className="relative z-10">
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                  </span>
                  {!isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  )}
                </Button>
              </form>
              <p className="mt-6 text-center text-emerald-300">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="group text-sm font-semibold text-emerald-400 transition-all duration-300 hover:text-emerald-200"
                >
                  Sign In
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </p>
              <div className="mt-6 text-center">
                <Link 
                  to="/" 
                  className="group text-sm font-semibold text-emerald-300 transition-all duration-300 hover:text-emerald-200"
                >
                  <span className="inline-block transition-all duration-300 group-hover:-translate-x-2">←</span>
                  {' '}Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </Motion.div>
      </div>
    </section>
  );
}

export default SignUp;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: userInfo?.name || '',
    email: userInfo?.email || '',
    password: '',
    confirmPassword: '',
  });
  
  const [updateProfile, { isLoading, isError, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin'); // Redirect to sign-in if not authenticated
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      const res = await updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(setCredentials(res)); // Update user info in Redux store
      toast.success("Profile updated successfully!"); // Notify user
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      toast.error(error?.data?.message || err.error); // Display error to user
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900/80 via-green-800/80 to-teal-900/80 animate-gradient-bg">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-emerald-200/20 dark:border-emerald-800/20 shadow-xl rounded-2xl">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl font-bold text-emerald-100 dark:text-emerald-300 text-center">Update Profile</CardTitle>
              <CardDescription className="text-lg text-emerald-300 dark:text-emerald-400 text-center">
                Update your information below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400"
                  required
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-emerald-900/50 border-emerald-700 text-emerald-100 placeholder-emerald-400"
                />
                
                {isError && (
                  <div className='text-red-400 text-center text-sm mt-2'>
                    {error?.data?.message || 'Update failed. Please try again.'}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full group relative rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden ${
                    isLoading ? 'cursor-not-allowed opacity-70' : ''
                  }`}
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                  {!isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <Link 
                  to="/" 
                  className="text-emerald-400 hover:text-emerald-200 transition-colors duration-300 text-sm"
                >
                  Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Profile;

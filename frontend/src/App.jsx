import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-emerald-950/30 backdrop-blur-xl border border-emerald-700/50 shadow-lg rounded-xl overflow-hidden max-w-[90vw] sm:max-w-md"
        bodyClassName="text-emerald-100 font-medium text-xs sm:text-sm flex items-center"
        progressClassName="bg-gradient-to-r from-teal-400 to-emerald-600 h-1"
        closeButton={
          <span className="text-teal-400 hover:text-teal-200 transition-colors duration-300 cursor-pointer text-base sm:text-lg pl-4 sm:pl-7">
            ×
          </span>
        }
      />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
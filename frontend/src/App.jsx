import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import About from './pages/About';
import useAuthStore from './store/useAuthStore';
import Home from './pages/Home';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import ShowSingers from './pages/ShowSingers';
import { Loader } from 'lucide-react';
import BookSinger from './pages/BookSinger';
import UserDashboard from './pages/UserDashboard';
import SingerDashboard from './pages/SingerDashboard';
import VerifyEmail from './pages/VerifyEmail';
import MessagesPage from './pages/MessagesPage'
import CreateSingerAccount from './pages/CreateSingerAccount';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const navigate = useNavigate()

  useEffect(() => {
    // authUser && authUser.isAccountVerified === false && navigate('/verify-email');
  }, [authUser])

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex h-screen w-full justify-center items-center bg-white z-10'>
      </div>
    )
  }

  return (
    <div className='w-full mx-auto text-black'>
      <ToastContainer position='top-center' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <SignUpPage />} />
        <Route path='/singer-account' element={authUser ? <Navigate to={'/'} /> : <CreateSingerAccount />} />
        <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <Login />} />
        <Route path='/singers' element={authUser ? <ShowSingers /> : <Navigate to={'/'} />} />
        {/* <Route path='/details' element={authUser ? <SingerDetail /> : <Navigate to={'/'} />} /> */}
        <Route path='/book/:id' element={authUser ? <BookSinger /> : <Navigate to={'/'} />} />
        <Route path='/dashboard' element={authUser && authUser.userRole === 'singer' ? <SingerDashboard /> : authUser ? <UserDashboard authUser={authUser} /> : <Navigate to={'/'} />} />
        <Route path='/verify-email' element={authUser && authUser.isAccountVerified === false ? <VerifyEmail /> : <Navigate to={'/'} />} />
        <Route path='/messages' element={authUser ? <MessagesPage /> : <Navigate to={'/login'} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
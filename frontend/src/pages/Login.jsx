import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { Loader2, Lock, LockIcon, MailIcon, User2 } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const { authUser, setUserRole, userRole, setAuthUser, userLogin, singerLogin, isLoggingIn } = useAuthStore();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userData.email === '' || userData.password === '') {
                return toast.error('Please fill all the fields');
            }
            if (userRole === 'user') {
                await userLogin(userData);
            } else if (userRole === 'singer') {
                await singerLogin(userData);
            }
        } catch (error) {
            console.log(error);
            setUserRole('user');
            navigate('/login')
        }
    }

    window.scrollTo(0, 0);


    return (
        <div className='w-full min-h-screen flex justify-center items-center -mt-20 bg-gray-100'>

            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h1 className='text-xl sm:text-4xl uppercase text-gray-600 text-center'>Login <span className='text-purple-600 font-semibold'>Account</span></h1>
                <p className=' text-gray-600 sm:text-2xl text-center'>login {userRole} account</p>
                <form className='w-full max-w-[400px] my-6' onSubmit={handleOnSubmit}>
                    {/* <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                        <User2 className='w-5' />
                        <input type="text" placeholder='Your Name' className='outline-none px-3 rounded w-full' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                    </div> */}
                    <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                        <MailIcon className='w-5' />
                        <input type="text" placeholder='Email address' className='outline-none px-3 rounded w-full' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    </div>
                    <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                        <Lock className='w-5' />
                        <input type="password" autoComplete='false' placeholder='●●●●●●●●●●' className='outline-none px-3 rounded w-full' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    </div>
                    {/* forgot password */}
                    {/* <a href="" target="_blank" rel="noopener noreferrer" className=' text-purple-600'>forgot password?</a> */}
                    <button className='w-full mt-4 bg-purple-600 px-4 py-1 sm:py-2 rounded-2xl text-white text-lg cursor-pointer'>{isLoggingIn ? <Loader2 size={20} className=' animate-spin text-center w-full' /> : 'Login'}</button>

                    {/* create design like this - Are you a singer? Create your account */}
                    <div className='flex flex-col gap-2 group mt-4 text-center'>
                        {
                            userRole === 'user'
                                ?
                                <p className='font-light'>Are you a singer?<Link to={'/login'} className='cursor-pointer text-purple-600 active:border-none' onClick={() => { setUserRole('singer'); }}> login your account </Link></p>
                                :
                                <p className='font-light'><Link to={'/login'} className='cursor-pointer text-purple-600 border-none border-0' onClick={() => { setUserRole('user') }}> login user account?</Link></p>
                        }
                        {/* already login */}
                        <p className='font-light'>Don't have an account <span className='cursor-pointer text-purple-600' onClick={() => { setUserRole('user'); navigate('/signup') }}>SignUp</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

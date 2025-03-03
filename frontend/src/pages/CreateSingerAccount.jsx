import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import { File, Lock, MailIcon, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateSingerAccount = () => {

    const { setUserRole, userRole, authUser, isSigningUp, createUser, createSinger } = useAuthStore();
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    })
    

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (userRole === "singer") {
            await createSinger(userData);
            setRegister(true)
        }
    }


    return (
        <div className='w-full px-1 h-screen flex justify-center items-center -mt-20 transition-all duration-300 bg-gray-100'>

            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                {
                    !register
                        ?
                        <>
                            <h1 className='text-xl sm:text-4xl uppercase text-gray-600 text-center'>Create <span className='text-purple-600 font-semibold'>Account</span></h1>
                            <p className=' text-gray-600 sm:text-2xl text-center'>create {userRole} account</p>
                            <form className='w-full max-w-[400px] my-6' onSubmit={handleOnSubmit}>
                                <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                                    <User2 className='w-5' />
                                    <input type="text" placeholder='Your Name' className='outline-none px-3 rounded w-full' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
                                </div>
                                <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                                    <MailIcon className='w-5' />
                                    <input type="text" placeholder='Email address' className='outline-none px-3 rounded w-full' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} required />
                                </div>
                                <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                                    <Lock className='w-5' />
                                    <input type="password" placeholder='●●●●●●●●●●' className='outline-none px-3 rounded w-full' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} required />
                                </div>
                                {/* forgot password */}
                                {/* <a href="" target="_blank" rel="noopener noreferrer" className=' text-purple-600'>forgot password?</a> */}
                                <button className='w-full mt-4 bg-purple-600 px-4 py-1 sm:py-2 rounded-2xl text-white text-lg cursor-pointer'>{isSigningUp ? <Loader size={20} className=' animate-spin text-center w-full' /> : 'Create Account'}</button>

                                {/* create design like this - Are you a singer? Create your account */}
                                <div className='flex flex-col gap-2 group mt-4 text-center'>

                                    <p className='font-light'><span className='cursor-pointer text-purple-600' onClick={() => { setUserRole('user'); navigate('/signup') }}> Create user account?</span></p>

                                    {/* already login */}
                                    <p className='font-light'>Already have an account? <span className='cursor-pointer text-purple-600' onClick={() => { setUserRole('user'); navigate('/login') }}>Login</span></p>
                                </div>
                            </form>
                        </>
                        :
                        <div>
                            <h1 className='text-xl sm:text-4xl uppercase text-gray-600 text-center'> <span className='text-purple-600 font-semibold'>Verification</span></h1>
                            <p className=' text-gray-600 sm:text-xl text-center'>upload your recorded video to verify your singer account</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default CreateSingerAccount

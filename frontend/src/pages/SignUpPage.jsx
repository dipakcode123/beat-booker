import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { Loader, Loader2, Lock, LockIcon, MailIcon, User2, VideoIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {

    const { setUserRole, userRole, authUser, isSigningUp, createUser, createSinger } = useAuthStore();
    // const [error, setError] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     video: ''
    // })
    // const [userData, setUserData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    // })
    const [error, setError] = useState("")

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [video, setVideo] = useState(null);


    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            return setError("All fields are required.")
        }

        setError("")

        if (name && email && password) {
            try {
                if (userRole === 'user') {
                    await createUser({ name: name, email: email, password: password });
                    navigate('/login');
                } else if (userRole === 'singer') {
                    await createSinger({ name: name, email: email, password: password, identifyVideo: video });
                    navigate('/login');
                    setRegister(true);
                }
            } catch (error) {
                console.log(error);
                setUserRole('');
            }

        }

    }

    window.scrollTo(0, 0);

    return (
        <div className='w-full px-1 h-screen flex justify-center items-center -mt-20 transition-all duration-300 bg-gray-100'>

            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h1 className='text-xl sm:text-4xl uppercase text-gray-600 text-center'>Create <span className='text-purple-600 font-semibold'>Account</span></h1>
                <p className=' text-gray-600 sm:text-2xl text-center'>create {userRole} account</p>
                <form className='w-full max-w-[400px] my-6' onSubmit={handleOnSubmit}>
                    <div className={`w-full flex border ${error.name && "border-red-600"} items-center rounded px-2 py-1 sm:py-1.5 mb-2`}>
                        <User2 className='w-5' />
                        <input type="text" placeholder='Your Name' className='outline-none px-3 rounded w-full' value={name} onChange={(e) => { setName(e.target.value); setError("") }} />
                    </div>
                    <div className={`w-full flex border ${error.email && "border-red-600"} items-center rounded px-2 py-1 sm:py-1.5 mb-2`}>
                        <MailIcon className='w-5' />
                        <input type="text" placeholder='Email address' className='outline-none px-3 rounded w-full' value={email} onChange={(e) => { setEmail(e.target.value); setError("") }} />
                    </div>
                    <div className={`w-full flex border ${error.password && "border-red-600"} items-center rounded px-2 py-1 sm:py-1.5 mb-2`}>
                        <Lock className='w-5' />
                        <input type="password" placeholder='●●●●●●●●●●' className='outline-none px-3 rounded w-full' value={password} onChange={(e) => { setPassword(e.target.value); setError("") }} />
                    </div>
                    <p className='text-red-600'>{error}</p>
                    {/* forgot password */}
                    {/* <a href="" target="_blank" rel="noopener noreferrer" className=' text-purple-600'>forgot password?</a> */}
                    {
                        userRole === "singer" && <>
                            <p className=' text-gray-600 text-center'>upload your music recorded video to verify</p>
                            <div className='w-full flex border items-center rounded px-2 py-1 sm:py-1.5 mb-2'>
                                <VideoIcon className='w-5' />
                                <input onChange={(e) => setVideo(e.target.files[0])} type="file" accept='video/*' placeholder='' className='outline-none px-3 rounded w-full' required />
                            </div>
                            <p className='text-red-600'>{error.video}</p>
                        </>
                    }
                    <button className='w-full mt-4 bg-purple-600 px-4 py-1 sm:py-2 rounded-2xl outline-none text-white text-lg cursor-pointer'>{isSigningUp ? <Loader size={20} className=' animate-spin text-center w-full' /> : 'Create Account'}</button>

                    {/* create design like this - Are you a singer? Create your account */}
                    <div className='flex flex-col gap-2 group mt-4 text-center'>
                        {
                            userRole === 'user'
                                ?
                                <p className='font-light'>Are you a singer?<span className='cursor-pointer text-purple-600' onClick={() => { setUserRole('singer'); navigate('/signup') }}> Create your account </span></p>
                                :
                                <p className='font-light'><span className='cursor-pointer text-purple-600' onClick={() => { setUserRole('user'); navigate('/signup') }}> Create user account?</span></p>
                        }
                        {/* already login */}
                        <p className='font-light'>Already have an account? <span className='cursor-pointer text-purple-600' onClick={() => { setUserRole('user'); navigate('/login') }}>Login</span></p>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default SignUpPage

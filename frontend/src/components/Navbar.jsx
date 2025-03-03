import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { Bold, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {

    const { authUser, logoutuser } = useAuthStore();
    const navigate = useNavigate();

    const [mobilemenu, setMobileMenu] = useState(false);

    const logout = async () => {
        await logoutuser()
        setMobileMenu(false);
        navigate('/')
    }

    return (
        <div>

            <div className='flex w-full px-4 sm:px-12 items-center py-4 justify-between bg-white shadow'>
                <h1 className='flex items-center text-2xl text-purple-700 font-bold uppercase'><Bold className='-mr-0.5 h-7' />eat</h1>
                <div className='flex items-center gap-12 text-gray-600 font-medium text-lg'>
                    <div className='hidden sm:flex gap-6'>
                        <NavLink to={'/'} >Home</NavLink>
                        {authUser && <NavLink to={'/singers'} >Singers</NavLink>}
                        <NavLink to={'/about'} >About</NavLink>
                    </div>
                    {
                        authUser ?
                            <div className=''>
                                <div className='rounded-full hidden sm:flex items-center justify-center overflow-hidden group'>
                                    {
                                        authUser.profilePicture?.secure_url ?
                                            <img src={authUser.profilePicture.secure_url} alt={authUser.name} className='w-8 h-8 object-center object-cover border border-purple-600 rounded-full' /> :
                                            <span className='flex items-center justify-center border rounded-full bg-black w-8 h-8  text-white text-xl cursor-pointer'>{authUser.name[0].toUpperCase()}</span>
                                    }
                                    <div className=' group-hover:flex flex-col gap-2 hidden p-4 absolute right-12 z-10 top-12 shadow bg-white rounded'>
                                        <Link to={'/dashboard'}>Dashboard</Link>
                                        {authUser.userRole === "singer" && authUser.status === "approved" && < Link to={'/messages'}>Messages</Link>}
                                        {authUser.userRole === "user" && <Link to={'/messages'}>Messages</Link>}
                                        <button className={'flex items-center gap-2 cursor-pointer'} onClick={() => logout()}>Logout <LogOut className='w-4 h-4' /></button>
                                    </div>
                                </div>
                            </div>
                            :
                            <Link to={'/login'} className=' sm:block hidden px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xl'>Login</Link>
                    }
                </div>
                <Menu className='w-7 h-7 text-purple-600 sm:hidden' onClick={() => setMobileMenu(!mobilemenu)} />

            </div>
            {
                mobilemenu &&
                <div className={`fixed bg-white top-0 min-h-screen pt-5 sm:pt-0 px-4 z-10 sm:min-h-0 ${mobilemenu ? 'w-full' : 'w-0'} `}>
                    <X className='w-7 h-7 text-purple-600 sm:hidden' onClick={() => setMobileMenu(!mobilemenu)} />
                    <div className='sm:hidden flex flex-col gap-6 w-full py-8'>
                        <NavLink to={'/'} className={' mx-auto'} onClick={() => setMobileMenu(false)}>Home</NavLink>
                        {authUser && <NavLink to={'/singers'} className={' mx-auto'} onClick={() => setMobileMenu(false)}>Singers</NavLink>}
                        <NavLink to={'/about'} className={' mx-auto'} onClick={() => setMobileMenu(false)}>About</NavLink>
                        {authUser && <NavLink to={'/dashboard'} className={' mx-auto'} onClick={() => setMobileMenu(false)}>Dashboard</NavLink>}
                        {authUser
                            ? <button className={'cursor-pointer'} onClick={() => logout()}>Logout</button>
                            : <button className={'cursor-pointer'} onClick={() => { navigate('/login'); setMobileMenu(false) }}>Login</button>
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export default Navbar

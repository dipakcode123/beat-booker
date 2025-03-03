import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { CircleEqualIcon, Lock, MailIcon, User2, UserCheck, UserIcon } from 'lucide-react'
import useAuthStore from '../store/useAuthStore';

const UserProfile = () => {

    const [edit, setEdit] = useState(true);
    const { authUser } = useAuthStore();

    return (
        <div className='w-full py-6 px-4 sm:px-12 shadow'>
            <div className='flex w-full flex-col mx-auto rounded gap-6 px-2 md:px-6'>
                <img src={assets.singer_image1} className='w-44 h-44 object-cover border rounded-full my-4 border-b mx-auto sm:mx-0' alt="" />
                <div className='mb-4 w-full flex flex-col'>
                    <div className='flex flex-col flex-wrap gap-1 px-2'>
                        <h4 className=' sm:text-xl font-medium'>Name: <span className=' text-gray-600'>{authUser.name}</span></h4>
                        <h4 className=' sm:text-xl font-medium'>Email: <span className=' text-gray-600'>{authUser.email}</span></h4>
                        <h4 className=' sm:text-xl font-medium'>Gender: <span className=' text-gray-600'>male</span></h4>
                        <h4 className=' sm:text-xl font-medium'>Address: <span className=' text-gray-600'>Ahemdabad, new nagar road, gujarat</span></h4>
                    </div>
                </div>
                {
                    !edit && <button className='px-4 py-1 bg-green-700 text-xl text-white w-full max-w-2xl mx-auto rounded'>Edit profile</button>
                }
                <div className='flex w-full max-w-2xl sm:px-4 py-6 mx-auto flex-col'>
                    <h1 className=' sm:text-xl font-medium'>Edit your profile</h1>
                    <div className='flex gap-4 items-center w-full border rounded my-2'>
                        <span className='bg-black p-1 w-24 text-center text-white'>Name</span><input type="text" className='w-full h-full outline-none sm:text-xl' />
                    </div>
                    <div className='flex gap-4 items-center w-full border rounded my-2'>
                        <span className='bg-black p-1 w-24 text-center text-white'>Gender</span><select type="text" className='w-full h-full outline-none sm:text-xl'>
                            <option value="">Select</option>
                            <option value="">Male</option>
                            <option value="">Female</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserProfile

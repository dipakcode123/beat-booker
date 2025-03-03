import React from 'react'
import useChatStore from '../store/useChatStore';
import useAuthStore from '../store/useAuthStore';
import { X } from 'lucide-react';
import { assets } from '../assets/assets';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser, blockUser } = useChatStore();
    const { authUser } = useAuthStore();

    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className=' flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    {/* avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser?.profilePicture?.secure_url || assets.defaultImage} alt={''} className='rounded-full object-cover h-full ' />
                        </div>
                    </div>

                    {/* user info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.name}</h3>
                        <p className="text-sm text-base-content/70">
                            {/* {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'} */}
                        </p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    {/* close button */}
                    {
                        authUser.userRole === "singer" &&
                        <button onClick={() => blockUser({ userId: selectedUser._id, singerId: authUser._id })} className='px-2 py-1 rounded bg-red-600 text-white'>
                            Blcok
                        </button>
                    }
                    <button onClick={() => setSelectedUser(null)}>
                        <X />
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ChatHeader

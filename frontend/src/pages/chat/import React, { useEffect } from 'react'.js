import React, { useEffect } from 'react'
import useChatStore from '../../store/useChatStore'
import useAuthStore from '../../store/useAuthStore';

const Sidebar = () => {

    const { selectedUser, users, getUsers, getAllUsers, allUsers } = useChatStore();
    const { authUser } = useAuthStore()

    const receiverId = users.filter((user) => user.receiverId)

    const filteredUsers = allUsers.filter((user) => user.includes(receiverId));

    console.log(receiverId.map((user) => user));


    useEffect(() => {

        return () => {
            getUsers()
            getAllUsers()
        };
    }, [getAllUsers]);

    return (
        <aside className={`h-full w-20 lg:w-72 border-r border-base-300 ${selectedUser ? "hidden" : "flex"} sm:flex flex-col trasition-all duration-200`}>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <span className='font-medium hidden lg:block'>Chats</span>
                </div>
            </div>
            <div className='overflow-y-auto w-full py-3'>
                {
                    filteredUsers.map((user, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?.id === user.id ? 'bg-base-200' : ''}`}
                        >
                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user.profilePicuter || ''} alt={user.fullName} className='size-12 object-cover/s rounded-full' />

                                {/* online status indicator */}
                                {
                                    filteredUsers.includes(user._id) && (
                                        <div
                                            className={`absolute bottom-0 right-0 size-3 bg-green-500 ring-2 ring-zinc-900 rounded-full`}
                                        >
                                        </div>
                                    )
                                }
                                {/* <div className={`absolute bottom-0 right-0 size-3 bg-green-500 ring-2 ring-zinc-900 rounded-full`} >
              </div> */}
                            </div>

                            {/* user info - only visible on larger screens */}
                            {/* <div className='hidden lg:block text-left min-w-0 flex-1'>
                                <div className='font-medium text-sm text-zinc-400'>{user.fullName}</div>
                                <div className='text-xs text-base-800'>{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
                            </div> */}
                        </button>
                    ))
                }
            </div>
        </aside>
    )
}

export default Sidebar

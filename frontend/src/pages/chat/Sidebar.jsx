import React, { useEffect } from 'react'
import useChatStore from '../../store/useChatStore'
import useAuthStore from '../../store/useAuthStore';
import { assets } from '../../assets/assets';

const Sidebar = () => {

    const { selectedUser, users, getUsers, getAllUsers, allUsers, setSelectedUser, getUsersByAuth, chats } = useChatStore();
    const { authUser } = useAuthStore()

    const receiverIds = users
        .filter(user => user.receiverId) // Filter to get only users with a receiverId
        .map(user => user.receiverId); // Map to get the receiverId values

    const senderId = users
        .filter(user => user.senderId) // Filter to get only users with a receiverId
        .map(user => user.senderId); // Map to get the receiverId values

    const filteredUsers = authUser.userRole === "user" ? allUsers.filter(user => receiverIds.includes(user._id)) : allUsers.filter(user => senderId.includes(user._id))

    console.log(filteredUsers);
    console.log(selectedUser);

    useEffect(() => {
        async function get() {
            await getUsers();
            await getAllUsers();
            await getUsersByAuth()
        }
        return () => {
            get()
        };
    }, [getAllUsers, getUsers, getUsersByAuth]);

    return (
        <aside className={`h-full w-20 lg:w-72 border-r ${selectedUser ? "hidden" : "flex"} sm:flex flex-col trasition-all duration-200`}>
            <div className='border-b w-full p-5'>
                <span className='font-medium hidden lg:block'>Chats</span>
            </div>
            <div className='overflow-y-auto w-full py-3'>
                {
                    filteredUsers.map((user, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${selectedUser?.id === user.id ? '' : ''}`}
                        >
                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user?.profilePicture?.secure_url || assets.defaultImage} alt={user.name} className='size-12 object-cover rounded-full' />
                            </div>
                            {user.name}
                        </button>
                    ))
                }
                {
                    filteredUsers.length === 0 && <p className=' hidden sm:flex justify-center'>No chats available </p>
                }
            </div>
        </aside>
    )
}

export default Sidebar

import React, { useEffect, useRef } from 'react'
import useChatStore from '../../store/useChatStore';
import ChatHeader from '../../components/ChatHeader';
import MessageInput from '../../components/MessageInput';
import { assets } from '../../assets/assets';
import useAuthStore from '../../store/useAuthStore';
import { formatMessage } from '../../lib/utils';
import MessageSkeleton from '../../components/skeletons/MessageSkeleton';

const SelectedChat = () => {

    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unSubscribeToMessage, getUsers } = useChatStore();
    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null);
    

    useEffect(() => {
        async function getMsg() {
            await getMessages(selectedUser?._id)
        }
        return () => {
            getMsg()
        };
    }, [selectedUser._id, getMessages]);


    useEffect(() => {
        if (selectedUser && messageEndRef.current)
            messageEndRef.current.scrollTo({ behavior: 'smooth' });
    }, [messages]);


    if (isMessagesLoading) return (
        <div className=' flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )



    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <div className='flex-1 p-4 space-y-4 overflow-y-auto scroll-m-0'>
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start mb-4 ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`} ref={messageEndRef}>
                        {
                            message.senderId !== authUser._id && <div className='chat-image avatar mr-2'>
                                <div className="w-8 h-8 rounded-full border">
                                    <img src={message.senderId === authUser._id ? authUser?.profilePicture?.secure_url || assets.defaultImage : selectedUser?.profilePicture?.secure_url || assets.defaultImage} alt="avatar" className='rounded-full h-full object-cover' />
                                </div>
                            </div>
                        }
                        <div className={`flex flex-col max-w-xs ${message.senderId === authUser._id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} p-2 rounded-lg`}>
                            <div className='chat-header mb-1'>
                                <time className='text-xs opacity-50'>{formatMessage(message?.createdAt)}</time>
                            </div>
                            <p className='text-sm'>{message.messages}</p>  {/* Note: Changed from message.messages to message.text */}
                        </div>
                        {
                            message.senderId === authUser._id && <div className='chat-image avatar ml-2'>
                                <div className="w-8 h-8 rounded-full border">
                                    <img src={message.senderId === authUser._id ? authUser?.profilePicture?.secure_url || assets.defaultImage : selectedUser?.profilePicture?.secure_url || assets.defaultImage} alt="avatar" className='rounded-full h-full object-cover' />
                                </div>
                            </div>
                        }
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <MessageInput />
        </div>
    )
}

export default SelectedChat

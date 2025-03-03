import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircleCheckIcon, Instagram, Loader2, Twitter, Youtube } from 'lucide-react'
import CheckAvailable from '../components/CheckAvailable';
import AboutSinger from '../components/AboutSinger';
import { data } from '../singer-data/data';
import useAuthStore from '../store/useAuthStore';
import useChatStore from '../store/useChatStore';


const BookSinger = () => {

    const { authUser, getSingerProfile, singer, approvedSingers } = useAuthStore();
    const { getAllUsers, allUsers, setSelectedUser, sendMessage } = useChatStore()

    const { id: singerId } = useParams();

    const findOne = approvedSingers.filter((singer) => singer._id === singerId);

    const navigate = useNavigate()

    window.scrollTo(0, 0)

    // console.log(singerId);

    const user = allUsers.find(user => user._id === singerId)

    const sendDirectMSG = async (e) => {
        setSelectedUser(user)
        // e.preventDefault();

        // await sendMessage({
        //     senderId: authUser._id,
        //     receiverId: user._id,
        //     messages: "book",
        // });
        navigate("/messages")
        // await sendMessage({ messages: "Book" })
        console.log(user);
    }


    useEffect(() => {

        async function getSinger() {
            await getSingerProfile(singerId)
        }
        return () => {
            getSinger()
            console.log(user);
        };

    }, [getSingerProfile, authUser]);


    useEffect(() => {

        return () => {
            getAllUsers()
        };
    }, [getAllUsers]);


    return (

        <div className='px-4 sm:px-12 '>
            <div className='flex justify-center flex-col md:flex-row items-center mt-12 gap-12'>
                <div>
                    <img src={singer?.profilePicture?.secure_url} alt="" className='w-96 md:w-60 lg:w-96 h-96 object-cover border border-gray-400 rounded' />
                </div>
                <div className='w-full flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 md:mx-0 mt-[-80px] md:mt-0 md:h-96 overflow-y-scroll h-auto'>
                    <p className='font-medium text-gray-900 flex gap-2 items-center' title='verified'>
                        {singer?.name} <CircleCheckIcon size={20} className='bg-green-600 text-white rounded-full' />
                    </p>
                    <div className='flex gap-2 items-center flex-wrap mt-1'>
                        <span className='font-medium'>Genre:</span>
                        <p className=' text-gray-600'>{singer?.genre},</p>
                        <div className='flex gap-2 items-center flex-wrap mt-1'>
                            <span className='font-medium'>Performance:</span>
                            <p className=' text-gray-600'>{singer?.performance}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center flex-wrap mt-1'>
                        <span className='font-medium'>Experience:</span>
                        <p className=' text-gray-600'>{singer?.experience},</p>
                        <div className='flex gap-2'>
                            <span className='font-medium'>Languages</span>
                            <p className=' text-gray-600'>{singer.language}</p>
                        </div>
                        <div className='flex gap-2 flex-wrap items-center mt-1'>
                            <span className='font-medium'>Events:</span>
                            <p className=' text-gray-600'>{singer?.events}</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <span className='font-medium'>About</span>
                        <div className=''>
                            <p className='text-gray-600 block py-0.5 w4/5 text-ellipsis line-clamp-2'>{singer?.description}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 mt-1 flex-wrap'>
                        <span className=' font-medium'>Address:</span>
                        <p className=' text-gray-600'>{singer?.address}</p>
                    </div>
                    <div className='flex gap-2 mt-1 flex-wrap'>
                        {/* <span className=' font-medium'>Follow us</span> */}
                        {/* <div className='flex items-center gap-2'>
                            <a target='_blank' href="https://www.instagram.com/">
                                <Instagram size={20} />
                            </a>
                            <a target='_blank' href="https://www.x.com/">
                                <Twitter size={20} />
                            </a>
                            <a target='_blank' href="https://www.youtube.com/">
                                <Youtube size={20} />
                            </a>
                        </div> */}
                    </div>
                    <div className='flex flex-wrap my-4'>
                        <a href="#more" className='text-sky-600'>See videos</a>
                    </div>
                    <button type='submit' className='bg-purple-600 text-white px-4 py-1 rounded' onClick={(e) => sendDirectMSG(e.preventDefault())}>Chat Now</button>
                </div>
            </div>

            {
                authUser.userRole === 'singer' ? null :

                    <CheckAvailable singerId={singerId} user={authUser} />
            }


            <div id='more' className='my-12 text-center w-full'>
                <AboutSinger singerId={singerId} />
            </div>
        </div >
    )
}

export default BookSinger


{/*  */ }
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import useAuthStore from '../store/useAuthStore'
import { BookUser, CheckCircle, CircleCheckIcon, Instagram, Loader, MailIcon, RedoIcon, SortAsc, Twitter, User, UsersRound, X, Youtube } from 'lucide-react'
import UserBookings from './UserBookings'

const UserDashboard = ({ authUser }) => {

    const { getUserAppointments, isUpdatingProfile, updateUserProfile } = useAuthStore();

    const [edit, setEdit] = useState();
    const [filled, setFilled] = useState(false);
    const [isChanged, setIsChanged] = useState(false)


    const [data, setData] = useState({
        _id: authUser?._id,
        name: authUser?.name,
        email: authUser?.email,
        gender: authUser?.gender,
        address: authUser?.address,
        phoneNumber: authUser?.phoneNumber,
        profilePicture: authUser.profilePicture?.secure_url,
    })


    const onsubmitHandler = async (e) => {
        e.preventDefault();
        await updateUserProfile(data);
        setFilled(true)
        setEdit(false)
        window.scrollTo(0, 0)
    }

    const onchChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setIsChanged(true);
    }

    const updateProfilePicture = async (e) => {
        const file = e.target.files[0];
        await updateUserProfile({ _id: authUser._id, profilePicture: file });
    }

    useEffect(() => {
        async function getAppointMents() {
            await getUserAppointments(authUser._id)
        }
        return () => {
            getAppointMents()
        };
    }, [getUserAppointments]);

    useEffect(() => {
        // check all fields are filled or not
        if (data.name && data.address && data.gender && data.email && data.phoneNumber) {
            setFilled(true)
            // setEdit(false)
        } else {
            setFilled(false)
            setEdit(true)
        }

        console.log(authUser._id);

    }, [authUser]);


    return (
        <div className='bg-gray-100 py-8 sm:p-12 transition-all duration-300'>

            <div className='w-full sm:max-w-6xl mx-auto bg-white rounded-md shadow-md p-2 sm:p-6 mb-20'>
                {
                    filled ?
                        <>
                            <div className="flex justify-between items-center">
                                <h1 className='text-lg sm:text-2xl font-bold'>Profile Details</h1>
                                {/* <p className='flex flex-wrap text-lg items-center gap-1 font-semibold'>status: {authUser.status === 'pending' ? <p className='text-yellow-600'>pending</p> : <p className='text-green-600'>approved</p>} </p> */}
                            </div>
                            <div className='flex flex-col gap-4'>
                                <img src={authUser.profilePicture?.secure_url !== '' ? authUser.profilePicture.secure_url : assets.defaultImage} className='aspect-square w-36 rounded-full object-cover border outline-none border-purple-600 mt-4 mx-auto' alt="" />
                                <div className='mx-auto w-fit p-2 rounded'>
                                    <input type="file" hidden id='image' onChange={updateProfilePicture} />
                                    <label htmlFor='image' className='flex flex-col w-fit gap-2 cursor-pointer text-blue-600'>{isUpdatingProfile ? "updating..." : "update profile picture"}</label>
                                </div>
                                <div className='w-full border border-gray-400 rounded-lg p-8 py-7 overflow-y-scroll text-lg'>
                                    <p className='font-medium text-gray-900 flex gap-2 items-center'>
                                        {authUser.name}
                                    </p>
                                    <div className='flex gap-2 items-center flex-wrap mt-1'>
                                        <span className='font-medium'>Email:</span>
                                        <p className=' text-gray-600'>{authUser?.email}</p>
                                        <div className='flex gap-2'>
                                            <span className='font-medium'>Gender:</span>
                                            <p className=' text-gray-600'>{authUser?.gender}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center flex-wrap mt-1'>
                                        <div className='flex gap-2'>
                                            <span className='font-medium'>Address:</span>
                                            <p className=' text-gray-600'>{authUser?.address},</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <span className='font-medium'>Phone:</span>
                                            <p className=' text-gray-600'>{authUser?.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!edit && <button onClick={() => { setEdit(true); window.scrollTo(0, 200) }} className='w-full my-4 px-4 py-1 bg-green-700 rounded text-white text-lg'>Edit Profile</button>}
                        </>
                        : null
                }

                {
                    edit ?
                        <form onSubmit={onsubmitHandler} className='flex flex-wrap gap-2 sm:gap- w-full mt-6'>
                            <h1 className='text-2xl font-semibold'>Update Profile</h1>
                            {/* upload profile picture */}
                            <div className='flex justify-between w-full gap-2 md:gap-6 flex-wrap md:flex-nowrap'>
                                <div className='w-full'>
                                    <span>Name</span>
                                    <input type="text" value={data.name} name='name' onChange={onchChangeHandler} className='border outline-none rounded w-full p-1' required placeholder='Enter your name' />
                                </div>
                                <div className='w-full'>
                                    <span>Email</span>
                                    <p type="text" value={data.email} name='name' className='border outline-none rounded w-full p-1' required placeholder='Enter your name' >{data.email}</p>
                                </div>

                            </div>
                            <div className='flex justify-between w-full gap-2 md:gap-6 flex-wrap md:flex-nowrap'>
                                <div className='w-full'>
                                    <span>Gender</span>
                                    <select value={data.gender} name='gender' className='border outline-none rounded w-full p-1' required onChange={onchChangeHandler}>
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-full'>
                                <span>Address</span>
                                <input type="text" value={data.address} name='address' onChange={onchChangeHandler} className='border outline-none rounded w-full p-1 appearance-none' required placeholder='current addresss' />
                            </div>
                            <div className='w-full'>
                                <span>Phone number </span>
                                <input type="text" value={data.phoneNumber} name='phoneNumber' onChange={onchChangeHandler} className='border outline-none rounded w-full p-1 ' required placeholder='current addresss' />
                            </div>

                            <div className='flex w-full gap-6 justify-between flex-wrap sm:flex-nowrap'>
                                {
                                    !filled && <button type='submit' className='w-full px-4 py-1 bg-green-600 text-white text-xl mt-4 rounded'>
                                        {isUpdatingProfile ? <Loader className='animate-spin' size={20} /> : "Save"}
                                    </button>
                                }

                                {
                                    filled && isChanged ?
                                        <button type='submit' className='w-full px-4 py-1 bg-green-600 text-white text-xl mt-4 rounded'>
                                            {isUpdatingProfile ? <Loader className='animate-spin' size={20} /> : "Save"}
                                        </button>
                                        : (filled && <span className='w-full px-4 py-1 bg-gray-600 text-center text-white text-xl mt-4 rounded'>
                                            {isUpdatingProfile ? <Loader className='animate-spin' size={20} /> : "Save"}
                                        </span>)
                                }
                                {
                                    filled && <button onClick={() => { setEdit(false); window.scrollTo(0, 0) }} className='w-full text-center px-4 py-1 bg-red-600 text-white text-xl mt-4 rounded'>
                                        Cancel
                                    </button>
                                }
                            </div>

                        </form>
                        : null
                }

            </div>

            {filled && <UserBookings />}

        </div >
    )
}

export default UserDashboard

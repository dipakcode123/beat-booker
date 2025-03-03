import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import useAuthStore from '../store/useAuthStore'
import { BookUser, CheckCircle, CircleCheckIcon, ImageIcon, Instagram, Loader, MailIcon, RedoIcon, SortAsc, Twitter, UploadIcon, User, X, Youtube } from 'lucide-react'
import ShowSingerBookings from './ShowSingerBookings'
import SingerVideos from './SingerVideos'
import VideoSubmission from './VideoSubmission'



const SingerDashboard = () => {

  const { authUser, updateSingerProfile, getSingerProfile, isUpdatingProfile } = useAuthStore();
  const [edit, setEdit] = useState(false);
  const [filled, setFilled] = useState(false);
  const [option, setOption] = useState('profile');
  const [image, setImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  const [data, setData] = useState({
    _id: authUser._id,
    name: authUser.name,
    email: authUser.email,
    phoneNumber: authUser.phoneNumber,
    gender: authUser.gender,
    genre: authUser.genre,
    performance: authUser.performance,
    experience: authUser.experience,
    events: authUser.events,
    description: authUser.description,
    feePerCunsultation: authUser.feePerCunsultation,
    address: authUser.address,
    language: authUser.language,
    profilePicture: authUser.profilePicture?.secure_url,
  })

  const onchChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setIsChanged(true);
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    await updateSingerProfile(data);
    setFilled(true)
    setEdit(false)
    window.scrollTo(0, 0)
  }

  // update profile picture call api
  const updateProfilePicture = async (e) => {
    const file = e.target.files[0];
    await updateSingerProfile({ _id: authUser._id, profilePicture: file });
  }

  useEffect(() => {
    // check all fields are filled or not
    if (data.name && data.address && data.experience && data.genre && data.gender && data.phoneNumber && data.email && data.performance && data.description && data.language && data.events) {
      setFilled(true)
    } else {
      setFilled(false)
      setEdit(true)
    }
  }, [authUser]);


  if (authUser.status === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-6xl mx-auto p-12 bg-white rounded-lg shadow-md w-full">
          <h1 className="text-4xl font-bold mb-8 text-center">Account Status: {authUser.status}</h1>
          <div className="flex flex-wrap justify-center mb-12">
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <h2 className="text-2xl font-bold mb-4">Account Details:</h2>
              <ul>
                <li className="text-lg mb-2">Singer Name: {authUser.name}</li>
                <li className="text-lg mb-2">Email: {authUser.email}</li>
                {/* <li className="text-lg mb-2">Phone: [{authUser.name}]</li> */}
                <li className="text-lg mb-2">Account Type: Singer</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <h2 className="text-2xl font-bold mb-4">What to Expect:</h2>
              <ul>
                <li className="text-lg mb-2">Our admin team will review your application within 24-48 hours.</li>
                <li className="text-lg mb-2">Once your account is approved, you will receive an email notification.</li>
                <li className="text-lg mb-2">You can then login to your account and start using our platform.</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Us:</h2>
              <ul>
                <li className="text-lg mb-2">Email: admin@beat.com</li>
                <li className="text-lg mb-2">Phone: [admin phone]</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className='bg-gray-100 sm:flex w-full px-1 py-8 sm:p-6 transition-all duration-300 overflow-hidden'>
      <div className='flex sm:h-[650px]  w-full sm:w-auto lg:w-80 bg-white rounded-md shadow-md p-1 py-2 sm:p-4 flex-col sm:mx-1'>
        {/* show options like profile or my bookings or upload videos */}
        <div className='flex sm:flex-col gap-1 sm:gap-4 w-full'>
          <button onClick={() => setOption('profile')} className={`flex gap-1 sm:gap-2 items-center w-full px-1 sm:px-4 py-2 rounded-md ${option === 'profile' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            <User size={20} />
            <span>Profile</span>
          </button>
          <button onClick={() => setOption('bookings')} className={`flex gap-1 sm:gap-2 items-center w-full px-1 sm:px-4 py-2 rounded-md ${option === 'bookings' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            <BookUser size={20} />
            <span>Bookings</span>
          </button>
          <button onClick={() => setOption('videos')} className={`flex gap-1 sm:gap-2 items-center w-full px-4 py-2 rounded-md ${option === 'videos' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            <Youtube size={20} />
            <span>Videos</span>
          </button>
        </div>
      </div>
      <div className='w-full'>
        {/* write a message*/}


        {
          option === 'profile' &&

          <div className='flex w-full sm:w-auto bg-white rounded-md shadow-md p-1 py-2 sm:p-4 flex-col sm:mx-1 my-2 sm:my-0 overflow-scroll'>
            {!filled && <p className='text-xl text-center'>Your account has been approved please fill up your all details below.</p>}

            {
              filled ?
                <>
                  <div className="flex justify-between items-center">
                    <h1 className='text-lg sm:text-2xl font-bold'>Profile Details</h1>
                    {/* <p className='flex flex-wrap text-lg items-center gap-1 font-semibold'>status: {authUser.status === 'pending' ? <p className='text-yellow-600'>pending</p> : <p className='text-green-600'>approved</p>} </p> */}
                  </div>
                  <div className='flex flex-col gap-4'>
                    <img src={authUser.profilePicture.secure_url !== '' ? authUser.profilePicture.secure_url : assets.defaultImage} className='aspect-square w-36 rounded-full object-cover border outline-none border-purple-600 mt-4 mx-auto' alt="" />
                    <div className='mx-auto w-fit p-2 rounded'>
                      <input type="file" hidden id='image' onChange={updateProfilePicture} />
                      <label htmlFor='image' className='flex flex-col w-fit gap-2 cursor-pointer text-blue-600'>{isUpdatingProfile ? "updating..." : "update profile picture"}</label>
                    </div>
                    <div className='w-full border border-gray-400 rounded-lg p-8 py-7 overflow-y-scroll text-lg'>
                      <p className='font-medium text-gray-900 flex gap-2 items-center'>
                        {authUser.name} {data.status === 'approved' && <CircleCheckIcon size={20} className='bg-green-600 text-white rounded-full' />}
                      </p>
                      <div className='flex gap-2 items-center flex-wrap mt-1'>
                        <span className='font-medium'>Email:</span>
                        <p className=' text-gray-600'>{data?.email},</p>
                        <div className='flex gap-2'>
                          <span className='font-medium'>Gender:</span>
                          <p className=' text-gray-600'>{authUser?.gender},</p>
                        </div>
                        <div className='flex gap-2'>
                          <span className='font-medium'>Address:</span>
                          <p className=' text-gray-600'>{authUser?.address},</p>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center flex-wrap mt-1'>
                        <span className='font-medium'>Genre:</span>
                        <p className=' text-gray-600'>{authUser?.genre},</p>
                        <div className='flex gap-2'>
                          <span className='font-medium'>Performance:</span>
                          <p className=' text-gray-600'>{authUser?.performance}</p>
                        </div>
                      </div>
                      <div className='flex gap-2 items-center flex-wrap mt-1'>
                        <span className='font-medium'>Experience:</span>
                        <p className=' text-gray-600'>{authUser?.experience}</p>
                        <div className='flex gap-2'>
                          <span className='font-medium'>Events:</span>
                          <p className=' text-gray-600'>{authUser?.events}</p>
                        </div>
                        {/* <div cs */}
                      </div>
                      <div className='flex gap-2 mt-1 flex-wrap'>
                        <span className=' font-medium'>Language:</span>
                        <p className=' text-gray-600'>{authUser?.language}</p>
                      </div>
                      <div className='mt-2'>
                        <span className='font-medium'>About</span>
                        <div className=''>
                          <p className='text-gray-600 block py-0.5 w-4/5'>{authUser.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!edit && <button onClick={() => { setEdit(true); window.scrollTo({ top: window.innerHeight }) }} className='w-full my-4 px-4 py-1 bg-green-700 rounded text-white text-lg'>Edit Profile</button>}
                </>
                : null
            }

            {/* edit profile */}
            {
              edit ?
                <form onSubmit={onsubmitHandler} className='flex flex-wrap gap-2 sm:gap- w-full mt-6'>
                  <h1 className='text-2xl font-semibold'>Edit Profile</h1>
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
                    <div className='w-full'>
                      {!filled && <>  <span>Phone Number</span>
                        <input type="text" value={data.phoneNumber} name='phoneNumber' maxLength={10} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1 appearance-none' placeholder='+91 ' required />
                      </>
                      }
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
                    <div className='w-full'>
                      <span>Address</span>
                      <input type="text" value={data.address} name='address' onChange={onchChangeHandler} className='border outline-none rounded w-full p-1 appearance-none' required placeholder='current addresss' />
                    </div>
                    <div className='w-full'>
                      <span>Experience</span>
                      <input type="text" name='experience' value={data.experience} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1 appearance-none' required placeholder='e.g., 2 years' />
                    </div>
                  </div>
                  <div className='flex justify-between w-full gap-2 md:gap-6 flex-wrap md:flex-nowrap'>
                    <div className='w-full'>
                      <span>Genre</span>
                      <select name='genre' value={data.genre} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1' required>
                        <option value="">Genre</option>
                        <option value="Bollywood">Bollywood</option>
                        <option value="Pop">Pop</option>
                      </select>
                    </div>
                    <div className='w-full'>
                      <span>Language</span>
                      <input type="text" name='language' value={data.language} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1' required placeholder='hindi, english ' />
                    </div>
                    <div className='w-full'>
                      <span>Performance type</span>
                      <input type="text" name='performance' value={data.performance} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1' required placeholder='hindi, english ' />
                    </div>
                  </div>
                  <div className='flex justify-between w-full gap-2 md:gap-6 flex-wrap md:flex-nowrap'>
                    <div className='w-full'>
                      <span>Events</span>
                      <input type="text" name='events' value={data.events} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1' required placeholder='weddings, party, etc.' />
                    </div>
                    {/* <div className='w-full'>
                        <span>Base Fees</span>
                        <div className='flex gap-2'>
                          <input type="text" name='feePerCunsultation' value={data.feePerCunsultation} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1' placeholder='base fee' required />
                        </div>
                      </div> */}
                  </div>
                  <div className='flex justify-between w-full gap-2 md:gap-6 flex-wrap md:flex-nowrap'>
                    <div className="w-full">
                      <span>Bio</span>
                      <textarea type="text" name='description' value={data.description} onChange={onchChangeHandler} className='border outline-none rounded w-full p-1 appearance-none size-20 resize-none' required placeholder='write about your yourself' />
                    </div>
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
        }
        {/* show my bookings */}

        {
          option === 'bookings' && <ShowSingerBookings id={authUser._id} />
        }

        {
          option === 'videos' && <SingerVideos />
        }

      </div>

    </div>
  )
}


export default SingerDashboard
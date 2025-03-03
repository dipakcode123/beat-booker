import { CheckCheck, CheckCircle, CheckIcon, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useAuthStore from '../store/useAuthStore';
import moment from 'moment';

const CheckAvailable = ({ singerId, user }) => {

  const { isBooking, bookingRequest, getSingerProfile, singer, checkAvailability } = useAuthStore();



  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [event, setEvent] = useState('');

  const formattedDate = moment(date).format('DD-MM-YYYY');
  const formattedTime = moment(time, 'HH:mm').format('HH:mm');

  const data = {
    userId: user._id,
    singerId: singerId,
    singerInfo: { name: singer.name, email: singer.email },
    userInfo: { name: user.name, email: user.email },
    date: formattedDate,
    time: formattedTime,
    address: location,
    eventType: event
  }

  const checkAvailable = async (e) => {
    e.preventDefault();
    // if (date !== '') {
    //   // await checkAvailability({ singerId, date, time })
    //   setIsAvailable(true);
    //   window.scrollTo({ top: 400 });
    // } else {
    //   setIsAvailable(false)
    // }
  }

  const BookAppointMent = async (e) => {
    e.preventDefault()
    try {
      await bookingRequest(data);
      // setIsAvailable(false);
      setTime('');
      setDate('');
    } catch (error) {
      toast.error('Network error');
    }
  }

  async function getSinger() {
    await getSingerProfile(singerId)
  }

  useEffect(() => {
    return () => {
      getSinger()
      console.log(date, time, location);
    };

  }, [getSingerProfile]);


  return (
    <div className={`flex flex-col items-center my-12 sm:p-12 gap-6 `}>
      {/* {
        !isAvailable && (

          <div className='flex flex-col w-full md:max-w-2xl'>
            <div className='flex flex-col items-center rounded  p-4 bg-gray-100 shadow-md'>
              <h1 className=' font-medium sm:text-xl'>Check Availability </h1>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='px-4 py-1 border rounded w-full my-2 border-gray-400 bg-white outline-none' required />
              <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className='px-4 py-1 border rounded w-full mb-4 border-gray-400 bg-white outline-none' required />
              <button type='button' className='bg-purple-600 w-full px-4 py-1 text-white sm:text-xl rounded' onClick={checkAvailable}>{isBooking ? 'Checking...' : 'Check'}</button>
            </div>
          </div>

        )} */}
      {/* {
        isAvailable && <h1 className='gap-2 font-black text-center items-center my-4 text-2xl text-green-600 flex justify-center w-fu'>{date} Available <CheckIcon size={20} /> </h1>
      } */}
      {/* 
      {
        isAvailable && ( */}
      <div className='flex flex-col items-start justify-center rounded w-full md:max-w-2xl p-4 bg-gray-100 shadow-md'>
        {/* <h1 className='text-center text-xl font-medium w-full my-2 border-b py-2'>Booking Available for {date}</h1> */}

        <form className='w-full' onSubmit={BookAppointMent}>
          <h1 className=' font-medium sm:text-xl mb-2'>Booking Form</h1>
          <div className='flex flex-col w-full'>
            <span>Event type</span>
            <select name="" id="" className='px-4 py-1 border border-gray-400 bg-white rounded w-full my-2 outline-none appearance-none' value={event} onChange={(e) => setEvent(e.target.value)} required>
              <option value="">Select</option>
              <option value="Wedding">Wedding</option>
              <option value="Party">Party</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <span>Date</span>
            <input type="date" className='px-4 py-1 border border-gray-400 bg-white rounded w-full my-2 outline-none' value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className='flex flex-col w-full'>
            <span>Time</span>
            <input type="time" className='px-4 py-1 border border-gray-400 bg-white rounded w-full my-2 outline-none' value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div className='flex flex-col w-full'>
            <span>Location</span>
            <textarea name="" id="" placeholder='Your event location' className='p-2 border border-gray-400 rounded bg-white w-full my-2 outline-none resize-none' value={location} onChange={(e) => setLocation(e.target.value)} required></textarea>
          </div>
          <div className='flex flex-col w-full my-2'>
            <p>you receives a message from singer to confirm booking.</p>
          </div>
          <button type='submit' className='bg-purple-600 w-full px-4 py-1 text-white sm:text-xl rounded flex items-center justify-center gap-2'>Book Request</button>
        </form>
      </div>

    </div>
  )
}

export default CheckAvailable
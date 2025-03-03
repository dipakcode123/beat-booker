import { CheckCircle, MessageSquare, SendIcon, X } from 'lucide-react'
import React, { useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import moment from 'moment'

const UserBookings = () => {

    const { userAppointments, cancelBooking } = useAuthStore();

    const cancel = async (userId, appointmentId) => {
        await cancelBooking({ userId: userId, appointmentId: appointmentId })
        // alert(appointmentId)
    }

    console.log(userAppointments);


    return (
        <div className='flex w-full sm:w-auto bg-white rounded-md shadow-md p-1 py-2 sm:p-4 flex-col sm:mx-1 '>
            <p className='my-4'>you receives message from singer for booking confirmation</p>
            <h1 className='text-lg sm:text-2xl font-bold'>My Bookings</h1>
            <div className='w-full overflow-x-scroll my-4'>
                <div className="flex border-b pb-2 w-full font-semibold">
                    <div className='w-[300px]'>
                        Singer Name
                    </div>
                    <div className=' w-[300px]'>
                        Date & time
                    </div>
                    <div className=' w-[300px]'>
                        Event type
                    </div>
                    <div className=' w-[300px]'>
                        Location
                    </div>
                    <div className=' w-[300px]'>
                        Status
                    </div>
                    <div className=' w-[300px]'>
                        Action
                    </div>
                </div>
                {
                    userAppointments.map((data, index) => (

                        <div className="flex border-b py-2 my-4 w-full font-medium" key={index}>
                            <div className='w-[300px]'>
                                {data.singerInfo.name}
                            </div>
                            <div className='w-[300px]'>
                                {moment(data.date).format("DD_MM_YYYY")}, {" "}
                                {moment(data.time).format("HH:mm")}
                            </div>
                            <div className='w-[300px]'>
                                {data.eventType}
                            </div>
                            <div className='w-[300px]'>
                                {data.address}
                            </div>
                            <div className='w-[300px]'>
                                {data.status}
                            </div>
                            <div className='w-[300px]'>
                                <button onClick={() => cancel(data.userId, data._id)} className='px-4 py-1 rounded bg-red-600 text-white'>Cancel</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserBookings

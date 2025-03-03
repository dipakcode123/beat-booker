import React, { useEffect, useState } from 'react';
import { CheckCircle, InfoIcon, MessageCircle, MessageSquare, X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import moment from 'moment'
import useChatStore from '../store/useChatStore';


// Main Component
const ShowSingerBookings = () => {
    const { getSingerAppointments, singerAppointments, authUser, getAppointMent, approvedBySinger, rejectBySinger } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Function for model 
    const handleShowModal = async (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const confirmBooking = async (appointmentId) => {
        await approvedBySinger(appointmentId)
    }

    const cancel = async (appointmentId) => {
        await rejectBySinger(appointmentId)
    }


    // fetch appointment
    useEffect(() => {
        const fetchAppointments = async () => {
            await getSingerAppointments(authUser._id);
        };
        fetchAppointments();
    }, [getSingerAppointments, authUser._id]);

    return (
        <>
            <div className={`flex h-[650px] w-full sm:w-auto bg-white ${isModalOpen && ' opacity-25'}  rounded-md shadow-md p-1 py-2 sm:p-4 flex-col sm:mx-1 my-2 sm:my-0`} >
                <p className='my-4'>
                    Before confirming your booking you must discuss your other details by messaging the user directly above.
                </p>
                <h1 className='text-lg sm:text-2xl font-bold'>My Bookings</h1>
                <div className='w-full overflow-x-auto my-4'>
                    <div className="flex border-b pb-2">
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>Name</div>
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>Date & Time</div>
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>Event Type</div>
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>Location</div>
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>Cancel</div>
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>status</div>
                        <div className='w-full text-ellipsis px-1 line-clamp-1'>Action</div>
                    </div>
                    {singerAppointments.length > 0 ? (
                        singerAppointments.map((appointment, index) => (
                            <div className={`flex border-b py-2 my-4 items-center`} key={index}>
                                <div className='w-full'>{appointment.userInfo.name}</div>
                                <div className='w-full'>
                                    {moment(appointment.date).format("DD_MM_YYYY")}, {" "}
                                    {moment(appointment.time).format("HH:mm")}
                                </div>
                                <div className='w-full text-ellipsis px-1 line-clamp-1'>{appointment.eventType}</div>
                                <div className='w-full text-ellipsis px-1 line-clamp-1'>{appointment.address}</div>
                                <div className='w-full text-ellipsis px-1 line-clamp-1'>{appointment?.cancelBooking}</div>
                                <div className='w-full text-ellipsis px-1 line-clamp-1'>{appointment.status}</div>
                                <div className='w-full flex gap-3 items-center'>
                                    <button className='cursor-pointer' title='Message?' onClick={() => handleShowModal(appointment)}>
                                        <InfoIcon />
                                    </button>
                                    <button className='text-red-600 cursor-pointer' title='Reject' onClick={() => cancel(appointment._id)} >
                                        <X />
                                    </button>

                                    <button onClick={() => confirmBooking(appointment._id)} className='text-green-600 cursor-pointer' title='Confirm'>
                                        <CheckCircle />
                                    </button>


                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center my-4'>No bookings</div>
                    )}
                </div>
            </div >
            {isModalOpen && <Modal data={selectedAppointment} onClose={() => setIsModalOpen(false)} />
            }
        </>
    );
};

export default ShowSingerBookings;

// Modal Component
const Modal = ({ data, onClose }) => {

    const { sendMessage } = useChatStore()
    const [fee, setFee] = useState('');
    const [msg, setMsg] = useState(false)

    

    const messages = "Hii";

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!msg) {
            await sendMessage({ senderId: data.singerId, receiverId: data.userId, messages })
            localStorage.setItem(`${data._id}`, true)
        }
        // console.log(messages);

    }

    console.log(data);
    useEffect(() => {

        return () => {
            localStorage.getItem(`${data._id}`) ? setMsg(true) : setMsg(false)
        };
    }, [msg]);


    return (
        <div className='fixed top-0 px-4 flex h-[650px] w-full items-center pt-32 -left-1 sm:left-20'>
            <div className='sm:w-2/4 w-full mx-auto bg-white shadow-md rounded-md p-6 opacity-100 z-20'>
                {/* You can display whatever is needed from the 'data' object here */}
                <form onSubmit={handleSubmit}>

                    {data && (
                        <>
                            <h2 className='text-lg font-semibold'>{data.userInfo.name}</h2>
                            <p className='font-semibold'>Date & Time: {moment(data.date).format("DD_MM_YYYY")}, {" "}
                                {moment(data.time).format("HH:mm")}</p>
                            <p className='font-semibold'>Event:  {data.eventType}</p>
                            <p className='font-semibold'>Locatioin: {data.address}</p>
                            {/* Add more details as necessary */}
                            {
                                data.status === "approved" &&
                                <div className='flex flex-col'>
                                    {
                                        !msg && <>
                                            <span className='my-2'>send booking fee to {data.userInfo.name}</span>
                                            <div className='flex gap-2'>
                                                <input type="text" className='px-2 py-1 border w-full' placeholder='Booking fee' onChange={(e) => setFee(e.target.value)} required />
                                                <button type='submit' className=' bg-purple-600 text-white px-4 py-1 border rounded'>Send</button>
                                            </div>
                                        </>
                                    }
                                </div>
                            }
                            <button onClick={onClose} className='mt-4 bg-blue-500 text-white rounded px-4 py-2'>Close</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};
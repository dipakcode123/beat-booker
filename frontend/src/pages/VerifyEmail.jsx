import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from '../store/useAuthStore';

const VerifyEmail = () => {

    const { verifyEmail, auhtUser } = useAuthStore();

    // create a reference for the input field
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState('');
    // create a function to handle the input change

    // create a function to handle the input change

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[otp.length - 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        const pastArray = paste.split('');
        pastArray.forEach((value, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = value;
            }
        })
    }


    // create a function to handle the form submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const otpArray = inputRefs.current.map(input => input.value);
        const otp = otpArray.join('');
        await verifyEmail({ otp });

    }


    useEffect(() => {
        auhtUser && auhtUser.isAccountVerified === true && navigate('/');
    }, [auhtUser])


    return (
        // create verify email page including a form with only otp enter field and a submit button design with tailwind
        <div className='w-full min-h-screen flex justify-center items-center -mt-20 bg-gray-100'>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className='text-xl sm:text-4xl uppercase text-gray-600 text-center'>Verify <span className='text-purple-600 font-semibold'>Email</span></h1>
                <p className=' text-gray-600  text-center'>
                    We sent otp to your email paste it below.
                </p>
                <form onSubmit={handleOnSubmit} className='w-full max-w-[400px] mt-4'>
                    <div className='w-full flex gap-1 itcms-center justify-center mb-2'>
                        {/* <input type="text" className='outline-none px-3 rounded w-full' placeholder='Enter OTP' /> */}
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <input key={index} type="text" maxLength={1} className='outline-none border w-12 h-12 text-center rounded' ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} onPaste={handlePaste} required />
                            ))
                        }
                    </div>
                    <button type='submit' className='w-full mt-4 py-2 bg-purple-600 text-white' >Continue</button>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail
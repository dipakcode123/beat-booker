import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div className='sm:mx-12 mx-1 transition-all duration-300 ease-in-out'>
            <div className='flex flex-col w-full h-full items-center mt-12'>
                <h1 className='text-4xl uppercase text-gray-600'>About <span className='text-purple-700 font-semibold'>Us</span></h1>
                {/* about the singer booking platform */}
                {/* img for singer booking platform */}
                <div className='flex flex-col md:flex-row w-full my-12 px-2 py-4'>
                    <div className='w-full md:w-1/2'>
                        <img src={assets.about} alt='about' className='w-full h-96 object-cover rounded-2xl' />
                    </div>
                    <div className=' w-full md:w-1/2 px-2 md:px-6 py-4 sm:py-0'>
                        <p className='text-gray-600 text-sm sm:text-base font-medium mb-4' >Singer Booking Platform created in the year 2025. This platform is created to help singers and event organizers to connect and book singers for their events. This platform is created by a group of developers who are passionate about music and technology. We believe that music is a universal language that can bring people together. We hope that this platform will help singers to showcase their talent and help event organizers to find the right singer for their events.</p>
                        <h2 className='font-semibold uppercase'>Our Mission</h2>
                        <p className='text-gray-600 text-sm sm:text-base font-medium'>Our mission is to help singers to showcase their talent and help event organizers to find the right singer for their events. We believe that music is a universal language that can bring people together. We hope that this platform will help singers to showcase their talent and
                            help event organizers to find the right singer for their events.</p>
                    </div>
                </div>

                {/* Benifits for user and singer */}
            </div>
        </div>
    )
}

export default About



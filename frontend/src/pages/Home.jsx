import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { assets } from '../assets/assets';
import FeaturedSinger from '../components/FeaturedSinger';

const Home = () => {

    const { authUser } = useAuthStore();

    return (
        <div className='w-full'>
            {/* hero section */}
            <div className='px-4 sm:px-12 py-24 transition-all duration-300 bg-gradient-to-tr from-blue-100 to-purple-200 shadow-md'>
                <div className='text-center py-16 sm:p-20 transition-all duration-300'>
                    <h3 className='text-2xl md:text-3xl font-medium mb-4 text-black'>Welcome to Beat Booker</h3>
                    <h1 className='text-4xl md:text-5xl font-extrabold mb-4 text-gray-800'>The Easiest Way to Book a Singer</h1>
                    <p className='text-lg md:text-xl  text-gray-600 mb-8'>Find talented singers for any event, quickly and easily.</p>
                    {
                        authUser ?
                            <Link to={'/singers'} className='px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xl'>Find a Singer</Link>
                            :
                            <Link to={'/signup'} className='px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-xl'>Create Account</Link>
                    }
                </div>
            </div>

            <FeaturedSinger />

        </div>
    )
}

export default Home
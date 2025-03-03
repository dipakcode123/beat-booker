import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import useAuthStore from '../store/useAuthStore'


const FeaturedSinger = () => {

    const { approvedSingers, fetchSingers, authUser } = useAuthStore();

    const featuredSinger = approvedSingers.filter((singer) => singer.feePerCunsultation > 10000)

    useEffect(() => {
        async function fetch() {
            await fetchSingers()
        }
        return () => {
            fetch()
        };
    }, [fetchSingers]);

    return (
        <div className='w-full flex flex-col mx-auto transition-all duration-300 py-20 px-12 bg-gray-100'>
            <h1 className='text-4xl uppercase text-gray-900 text-center my-12'>Featured <span className='font-black text-purple-600'>singers</span></h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>

                {authUser ?
                    featuredSinger.slice(0, 3).map((singer) => (
                        <div key={singer._id} className='border p-2 rounded-lg overflow-hidden bg-white sm:w-72'>
                            <img src={singer.profilePicture.secure_url} alt={'singer'} className="w-full aspect-square border object-cover mx-auto rounded" />
                            <div className='py-4 px-2'>
                                <h2 className='text-xl font-semibold'>{singer.name}</h2>
                                <p>Genre: {singer.genre}</p>
                                <p>Location: {singer.address}</p>
                                <p>Language: {singer.language}</p>
                            </div>
                        </div>
                    ))

                    : <>

                        <div className='border p-2 rounded-lg overflow-hidden bg-white sm:w-72'>
                            <img src={''} alt={'singer'} className="w-full aspect-square border object-cover rounded" />
                            <div className='py-4 px-2'>
                                <h2 className='text-xl font-semibold'>singer.name</h2>
                                <p>Genre: singer.genre</p>
                                <p>Location: singer.location</p>
                                <p>Language: singer.language</p>
                            </div>
                        </div>
                        <div className='border p-2 rounded-lg overflow-hidden bg-white sm:w-72'>
                            <img src={assets.singer_image1} alt={'singer'} className="w-full aspect-square border object-cover rounded" />
                            <div className='py-4 px-2'>
                                <h2 className='text-xl font-semibold'>singer.name</h2>
                                <p>Genre: singer.genre</p>
                                <p>Location: singer.location</p>
                                <p>Language: singer.language</p>
                            </div>
                        </div>
                        <div className='border p-2 rounded-lg overflow-hidden bg-white sm:w-72'>
                            <img src={'https://today.ganganews.com/wp-content/uploads/2023/11/Shreya-Ghoshal.jpg'} alt={'singer'} className="w-full aspect-square border object-cover rounded" />
                            <div className='py-4 px-2'>
                                <h2 className='text-xl font-semibold'>singer.name</h2>
                                <p>Genre: singer.genre</p>
                                <p>Location: singer.location</p>
                                <p>Language: singer.language</p>
                            </div>
                        </div>

                    </>
                }
            </div>
        </div>
    )
}

export default FeaturedSinger

import { ArrowBigDown } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { data } from '../singer-data/data';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ShowSingers = () => {

    const { fetchSingers, approvedSingers, auhtUser } = useAuthStore()

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [location, setLocation] = useState('');
    const [language, setLanguage] = useState('');

    const singers = approvedSingers.filter((singer) => singer.profilePicture.secure_url)

    const filteredSingers = approvedSingers.filter((singer) => {
        return (
            (singer.name.toLowerCase().includes(search.toLowerCase()) || search === '') &&
            (singer.genre === genre || genre === '') &&
            (singer.location === location || location === '') &&
            (singer.language === language || language === '')
        )
    })

    window.scrollTo(0, 0)

    useEffect(() => {
        async function fetAllchSingers() {
            await fetchSingers();
        }
        fetAllchSingers()
        // console.log(approvedSingers);

    }, [fetchSingers]);


    return (
        <div className={`w-full px-4 py-6 sm:px-12 ${filteredSingers.length === 0 ? 'h-screen' : ''}`}>
            <h2 className='font-semibold text-2xl my-2'>Search your perfect singer</h2>
            <div className={`flex flex-wrap my-4 gap-2`}>
                <input type="text" className='border rounded p-2 w-full sm:w-auto' placeholder='Search here...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <select name="" id="" className='border rounded p-2' value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">All Genres</option>
                    <option value="Bollywood">Bollywood</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                </select>
                <select name="" id="" className='border rounded p-2' value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="">All Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Tami">Marathi</option>
                </select>
                <select name="" id="" className='border rounded p-2' value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">All Location</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Surat">Surat</option>
                    <option value="Ahemdabad">Ahemdabad</option>
                    <option value="Rajkot">Rajkot</option>
                    <option value="Vadodra">Vadodra</option>
                </select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-6'>
                {
                    filteredSingers.map((singer) => (
                        <div key={singer._id} className='border p-2 rounded-lg overflow-hidden'>
                            <img src={singer.profilePicture.secure_url} alt={singer.name} className="w-full aspect-square border object-cover mx-auto rounded" />
                            <div className='py-4 px-2'>
                                <h2 className='text-xl font-semibold'>{singer.name}</h2>
                                <p className=' text-ellipsis line-clamp-1'>Genre: {singer.genre}</p>
                                <p className=' text-ellipsis line-clamp-1'>Performance: {singer.performance}</p>
                                <p className=' text-ellipsis line-clamp-1'>Events: {singer.events}</p>
                                <p className=' text-ellipsis line-clamp-1'>Language: {singer.language}</p>
                            </div>
                            <Link to={`/book/${singer._id}`} className='w-full flex justify-center rounded-lg p-2 text-white bg-purple-600 hover:bg-purple-700 '>{singer.name}</Link>
                        </div>
                    ))
                }
            </div>
            {
                filteredSingers.length === 0 &&
                (
                    <p>no available {search}</p>
                )
            }
        </div >
    )
}

export default ShowSingers

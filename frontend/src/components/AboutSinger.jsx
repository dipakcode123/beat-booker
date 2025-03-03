import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { ArrowBigLeftDash, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams } from 'react-router-dom'

const AboutSinger = () => {

    const { singer, getSingerVideos } = useAuthStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentVideo, setCurrentVideo] = useState([]);

    const videosArray = [singer.videos];
    const videosArray2 = videosArray.flatMap(vid => vid)
    const videos = videosArray2.flatMap(vid => vid)

    console.log(videos[currentIndex]);



    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const handleNext = (e) => {
        e.preventDefault()
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    return (
        <div className='bg-gray-100 p-2 sm:p-4'>
            <h1 className='text-2xl uppercase font-semibold text-purple-600 my-4'>Videos uploaded by singer</h1>
            {
                videos.length > 0
                    ?
                    <div className=' relative'>
                        <video src={videos[currentIndex]} controls controlsList='nodownload' onContextMenu={(e) => e.preventDefault()} className='aspect-video w-[700px] border mx-auto rounded'>
                            not work
                        </video>
                        <div className='flex w-full lg:w-[700px] mx-auto justify-between items-center my-4'>
                            <button className='flex cursor-pointer' onClick={handlePrevious} disabled={currentIndex === 0}><ChevronLeft />Previous</button>
                            <button className='flex cursor-pointer' onClick={handleNext} disabled={currentIndex === videos.length - 1}>Next<ChevronRight /></button>
                        </div>
                    </div>
                    : <p>No video available</p>

            }
        </div >
    )
}

export default AboutSinger

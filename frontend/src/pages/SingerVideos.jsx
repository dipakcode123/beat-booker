import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import useAuthStore from '../store/useAuthStore'
import { PenLine, PlayIcon, Trash } from 'lucide-react'

const SingerVideos = () => {

  const { uploadVideo, isUploading, authUser, deleteVideo } = useAuthStore();

  const videoRef = useRef(null);
  const videos = authUser?.videos;
  const [currentVideo, setCurrentVideo] = useState(videos[0])

  const upload = async (e) => {
    const singerId = authUser._id;
    const videoFile = e.target.files[0]

    await uploadVideo(singerId, videoFile)
  }

  const handleDelete = async (videoFile) => {
    const singerId = authUser._id;
    // const videoFile = e.target.files[0]

    await deleteVideo(singerId, videoFile)
  }


  // const playVideo = (url) => {
  //   if (videoRef.current) {
  //     videoRef.current.src = url
  //     videoRef.current.play();
  //   }
  // }

  // const stopVideo = () => {
  //   if (videoRef.current) {
  //     videoRef.current.pause();
  //     videoRef.current.currentTime = 0;
  //   }
  // }



  console.log(videos);



  return (
    <div className='flex sm:h-[650px] w-full sm:w-auto bg-white rounded-md shadow-md p-1 py-2 sm:p-4 flex-col sm:mx-1 my-2 sm:my-0 overflow-hidden'>
      <h1 className='text-2xl font-semibold'>My Videos</h1>
      <label htmlFor='video' className='my-4 text-blue-600 cursor-pointer text-left w-fit'>
        <span>  {isUploading ? "uploading..." : "upload new video"}</span>
        <input type="file" id='video' hidden multiple accept='video/*' onChange={upload} />
      </label>


      <div className='w-full mx-auto'>
        <div className={`w-full max-w-xl backdrop-opacity-95`}>
          <video ref={videoRef} src={currentVideo} controls accessKey='h' className='w-full h-72 mb-6 rounded border mx-auto'>
          </video>
        </div>

        <div className='flex flex-wrap lg:flex-row justify-center md:justify-normal sm:h-84 sm:flex-row gap-4 overflow-scroll relative my-4'>
          {videos.map((video, index) =>
          (
            <div key={index}>
              <div className='group relative'>
                <video src={video} accessKey='h' className='h-40  w-60 aspect-square border rounded' onClick={() => setCurrentVideo(video)}>
                  your browser not spport video.
                </video>
                <div className='absolute right-2 bottom-2 hidden group-hover:block' title='delete' onClick={() => handleDelete(video)}>
                  <Trash size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}

export default SingerVideos
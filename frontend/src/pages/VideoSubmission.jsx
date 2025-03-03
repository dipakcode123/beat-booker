import React, { useState } from 'react'

const VideoSubmission = () => {

    const [videoFile, setVideoFile] = useState(null);

    const handleSubmit = async () => {

    }

    return (
        <div className='w-full text-center my-12'>
            <h1 className='text-xl py-4 text-purple-600'>Submit Your Video for Verification</h1>
            <p className='pb-4'>you are not an approved singer, please upload a video of you singing to get verified.</p>
            <form onSubmit={handleSubmit} className='flex gap-2 justify-center'>
                <input type="file" className='border p-2 rounded' accept='video/*' onChange={(e) => setVideoFile(e.target.value)} />
                <button type='submit' className='px-4 py-2 bg-purple-600 text-white rounded'>Send</button>
            </form>
        </div>
    )
}

export default VideoSubmission

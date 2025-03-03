import React from 'react'

const MessageSkeleton = () => {

    // create an array of 6 elements for the skeleton messages
    const skeletonMessages = Array(6).fill(null);

    return (
        <div>
            <div className='flex-1 ovyaerflow-auto p-4 space-y-4'>
                {
                    skeletonMessages.map((_, index) => (
                        <div key={index} className={`flex items-start mb-4 ${index % 2 === 0 ? 'justify-start' : "justify-end"}`}>
                            <div className="chat-image avatar mr-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <div className="bg-gray-300 w-full h-full animate-pulse rounded-full"></div>
                                </div>
                            </div>

                            <div className='chat-header mb-1'>
                                <div className='bg-gray-300 w-16 h-4 animate-pulse rounded'></div>
                            </div>

                            <div className='chat-bubble bg-transparent p-0'>
                                <div className='bg-gray-300 h-16 w-[200px] animate-pulse rounded'></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageSkeleton

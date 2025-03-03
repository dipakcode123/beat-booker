import React from 'react'
import useChatStore from '../store/useChatStore'
import Sidebar from './Chat/Sidebar'
import NoSelectedChat from './Chat/NoSelectedChat'
import SelectedChat from './Chat/SelectedChat'

const MessagesPage = () => {

  const { selectedUser } = useChatStore()

  return (
    <div className="">
      <div className="flex items-center justify-center pt-8 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden border">
            <Sidebar />
            {!selectedUser ? <NoSelectedChat /> : <SelectedChat />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
import { useEffect } from 'react'
import Stream from './Stream'
import ChatNdParticipants from './ChatNdParticipants'
import Controls from './Controls'
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti'

function Room() {

  return (
    <div className='room'>
      <div className='room__streamSpace'>
        <Stream />
        <Toaster />
        
        <Controls />
      </div>
      <ChatNdParticipants />
    </div>
  )
}

export default Room
import React from 'react'

function HighlightText({text}) {
  return (
    
      <span className='font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>
      {" "} 
      {text}
      </span>
    
  )
}

export default HighlightText

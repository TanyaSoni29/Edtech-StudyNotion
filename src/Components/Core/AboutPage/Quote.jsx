import React from 'react'
import HighlightText from '../Homepage/HighlightText'

function Quote() {
  return (
    <div className='text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white'>
    We are Passionate about revolutionizing the way we learn. Our innnovative platform <HighlightText text={"combines technology"} />,{" "}
    <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold' >{" "} expertise

    </span> , community to create an
    <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'> {" "} unparalleled educational experience.

    </span>
      
    </div>
  )
}

export default Quote

import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({position, heading, subHeading, ctabtn1, ctabtn2, CodeBlocks, backgroundGradient, codeColor}) {
  return (
    <div className={`flex ${position} my-20 justify-between lg:gap-10 gap-10`}>

    <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'> 
      {heading}
      <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3'>{subHeading}</div>

      <div className='flex mt-7 gap-7'>
        <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight />
            </div>
        </CTAButton>
        <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
           
                {ctabtn2.btnText}
               
        </CTAButton>
      </div>

    </div>

    <div className='h-fit code-border flex flex-row text-[10px] w-[100%] py-3 sm:text-sm leading-[18px] sm:leading-6 relative lg:w-[470px]'>
    {backgroundGradient}
    <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
    </div>
    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1` }>
    <TypeAnimation 
        sequence={[CodeBlocks, 5000, ""]}
        repeat={Infinity}
        cursor={true}
        style={
            {
                whiteSpace: "pre-line",
                display: "block"
            }
        }
        omitDeletionAnimation={true}
        
    />

    </div>

    </div>
      
    </div>
  )
}

export default CodeBlocks

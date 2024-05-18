import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plane_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from './Button';

function LearningLanguageSection() {
  return (
    
      <div>
        <div className='font-semibold text-4xl text-center my-10'>  
        Your Swiss Knife for
        <HighlightText text={"learning any language"} />
        <div className='text-center text-richblack-700 mx-auto leading-6 mt-3 text-base font-medium lg:w-[75%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
            <img src={Know_your_progress} alt='KnowyourProgressImg' className='object-contain lg:-mr-32'/>
            <img src={Compare_with_others} alt='CompareWithOthersImg' className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'/>
            <img src={Plane_your_lesson} alt='PlaneYourLessonImg' className='object-contain lg:-ml-36 lg:-mt-5 -mt-16'/>
        </div>
        </div>
       
          <div className='w-fit mx-auto lg:mb-20 mb-8 -mt-5'>
          <CTAButton active={true} linkto={"/signup"} >
               <div>
                   Learn More
               </div>
           </CTAButton>
          </div>


      </div>
    
  )
}

export default LearningLanguageSection
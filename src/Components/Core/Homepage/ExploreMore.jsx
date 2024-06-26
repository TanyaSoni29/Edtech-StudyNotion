import React, { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CoursesCard from './CoursesCard';

const tabsName = [
"Free",
"New to coding",
"Most popular",
"Skills paths",
"Career paths"
]

function ExploreMore() {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMycard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter(course => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading)
  }
  return (
    
      <div>
        <div>
        <div className='text-4xl font-semibold text-center my-10'>
        Unlock the 
          <HighlightText text={"Power of Code"} />
          <p className='text-richblack-300 text-center text-lg font-semibold mt-1'>
           Learn to Build Anything You Can Imagine
          </p>
        </div>
        </div>
         

          <div className='hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 rounded-full text-richblack-200 p-1 font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
              tabsName.map( (element, index) => {
                return (
                  <div className={`flex items-center gap-2 text-[16px] ${currentTab === element? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-[7px]`} key={index} onClick={() => setMycard(element)}>
                  {element}
                  </div>
                )
              })
            }
          </div>
          <div className='hidden lg:block lg:h-[200px]'></div>
          {/* Course card */}
          <div className='flex flex-wrap lg:justify-between w-full gap-10 lg:absolute lg:gap-0 justify-center lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
            {
              courses.map( (element, index) => {
                return (
                  <CoursesCard key={index} cardData={element} setCurrentCard={setCurrentCard} currentCard={currentCard} />
                )
              }) 
            }
          </div>
       
      </div>
    
  )
}

export default ExploreMore

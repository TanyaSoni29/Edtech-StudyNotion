import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../Components/Core/Homepage/HighlightText"
import CTAButton from '../Components/Core/Homepage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/Core/Homepage/CodeBlocks';
import TimelineSection from '../Components/Core/Homepage/TimelineSection';
import LearningLanguageSection from '../Components/Core/Homepage/LearningLanguageSection';
import InstructorSection from "../Components/Core/Homepage/InstructorSection";
import ExploreMore from '../Components/Core/Homepage/ExploreMore';
import Footer from '../Components/common/Footer';
import ReviewSlider from '../Components/common/ReviewSlider';


function Home() {
  return (
    <div >
      {/* sectrion 1 */}

      <div className='flex-col flex mx-auto relative w-11/12 max-w-maxContent items-center justify-between gap-8 text-white'>

            
        <Link to={"/signup"}>
        <div className='group mt-16 p-1 rounded-full mx-auto bg-richblack-800 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become an Instructor</p>
                <FaArrowRight />
            </div>
        </div>
        </Link>
        <div className='text-center text-4xl font-semibold'>
            
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            
        </div>
        <div className=' -mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex gap-7 mt-8'>
        <CTAButton active={true} linkto={"/signup"}>
           Learn More
  
        </CTAButton>
        <CTAButton active={false} linkto={"/login"}>
          Book a Demo 
          </CTAButton>

        </div>

        <div className='mx-3 my-7 shadow-blue-200 shadow-[10px_-5px_50px_-5px]'>
          <video
          muted
          loop
          autoPlay className='shodow-[20px_20px_rgba(255,255,255)]'>
           <source src={Banner} type='video/mp4'/>

          </video>
        </div>

        {/* code section 1 */}

        <div>
          <CodeBlocks position={"lg:flex-row"} heading={<div className='text-4xl font-semibold '>
            Unlock Your 
            <HighlightText text={"coding potential"} />{" "}
             with our online courses
          </div>} subHeading={  "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
          ctabtn1={{
            btnText: "Try it Yourself",
            linkto: "/signup",
            active: true
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/signup",
            active: false
          }}

          CodeBlocks={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><a href="/">Header<a/>\n/h1>\nnav><ahref="one/">One</a><ahref="/two">Two</\na><ahref="/three>Three</a>\n/nav>`}
          backgroundGradient={<div className='codeblock1 absolute'></div>}  
          codeColor={"text-yellow-25 "}
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks position={"lg:flex-row-reverse"} heading={<div className='w-[100%] text-4xl font-semibold lg:w-[50%] '>
            Start
            <HighlightText text={"coding in seconds"} />
            
          </div>} subHeading={  "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first"} 
          ctabtn1={{
            btnText: "Continue Lesson",
            linkto: "/signup",
            active: true
          }}
          ctabtn2={{
            btnText: "Learn More",
            linkto: "/signup",
            active: false
          }}

          CodeBlocks={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
          backgroundGradient={<div className='codeblock2 absolute'></div>}
          codeColor={"text-white"}
          />
        </div>
         <ExploreMore/>
      </div>

      {/* sectrion 2 */}

      <div className='bg-pure-greys-5 text-richblack-700'>

       <div className='homepage_bg h-[320px] '>

           <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8 mx-auto'>
           <div className='lg:h-[150px]'></div>
            <div className='flex gap-7 text-white lg:mt-8'>
              <CTAButton active={true} linkto={"/signup"} >
              <div className='flex gap-2 items-center'>
                Explore Full Catelog
                <FaArrowRight/>
              </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/login"} >
                  <div>
                   Learn More
                  </div>
              </CTAButton>

            </div>

           </div>
           
       </div>

       <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8'>

        <div className='flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0 mb-10 mt-[-100px]'>

          <div className='font-semibold text-4xl lg:w-[45%]'>
             Get the skill you need for a{" "}
             <HighlightText text={"job that is in demand."} />
          </div>

          <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
            <div className='text-[16px]'>
               The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </div>

            <CTAButton active={true} linkto={"/signup"}>
             <div> 
             Learn More
             </div>
            </CTAButton>
           
         </div>
        </div>

        <TimelineSection />

        <LearningLanguageSection />
         
       </div>
      </div>

      

      {/* sectrion 3 */}

      <div className='relative my-20 w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
         <InstructorSection />

         <h1 className='text-center text-4xl font-semibold mt-8'>Review from other learners</h1>
         <ReviewSlider />
    
          </div>

      {/* footer */}
      <Footer/>

    </div>
  )
}

export default Home

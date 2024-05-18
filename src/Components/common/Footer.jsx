import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
import {FooterLink2} from "../../data/footer-links";

const Plans= ["Paid memberships", "For Students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources =[
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code Challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces"
]

function Footer() {
  return (
    <div className='bg-richblack-800'>
    <div className='flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative p-14'>
    <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700'>
    {/* Section1 */}
    <div className='lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>
      <div className='w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0'>
      <img src={Logo} alt="" className='object-contain' />
      <h1 className='text-richblack-50 font-semibold text-[16px]'>Company</h1>

      <div className='flex flex-col gap-2'>
      {["About", "Careers", "Affiliates"].map((ele, i) => {
        return (
            <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                <Link to={ele.toLowerCase()}>{ele}</Link>
            </div>
        )
      })}

      </div>
      <div className='flex gap-3 text-lg'>
      <FaFacebook/>
      <FaGoogle/>
      <FaTwitter/>
      <FaYoutube/>

      </div>
      <div></div>

      </div>
      <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
      <h1 className='text-richblack-50 font-semibold text-[16px]'>Resources</h1>

      <div className='flex flex-col gap-2 mt-2'>{
           Resources.map( (ele, i) => {
            return (
                <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                    <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
            )
           })
      }

      </div>

       <h1 className="text-richblack-50 mt-7 font-semibold text-[16px]">Support</h1>
       <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2'>
       <Link to={"/help-center"}>Help Center</Link>

       </div>
      </div>
      <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
        <h1 className='text-richblack-50 font-semibold text-[16px]'>Plans</h1>

        <div className='flex flex-col gap-2 mt-2'>{
          Plans.map((ele, i) => {
            return (
              <div
              key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
               <Link to={ele.split(" ").join("-").toLowerCase()}>
                {ele}
               </Link>

              </div>
            );
          })
        }</div>
        <h1 className='text-richblack-50 font-semibold text-[16px] mt-7'>Community</h1>
        <div className='flex flex-col gap-2 mt-2'>
          {
            Community.map((ele,i) =>{
              return (
                <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                  <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
       {/* Section2 */}
    <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3'>
      {
        FooterLink2.map((ele, i) =>{
          return (
            <div key={i} className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'><h1 className='text-richblack-50 font-semibold text-[16px]'>
              {ele.title}
            </h1>
            <div className='flex flex-col gap-2 mt-2'>
              {ele.links.map((link, i) =>{
                return (
                  <div key={i} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'><Link to={link.link}>{link.title}</Link></div>
                )
              })}
            </div>
            
            </div>
          )
        })
      }
    </div>

    </div>

    </div>

    <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm'>
     {/* Section1 */}
     <div className='flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full'>
     <div className='flex flex-row'>
     {
      BottomFooter.map((ele, i) => {
        return (
          <div key ={i}
          className={`${BottomFooter.length - 1 ===i ? "": "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"} px-3`}>
            <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>{ele}</Link>
          </div>
        )
      })
     }

     </div>
     <div className='text-center'> Made with ❤️ CodeHelp © 2024 StudyNotion</div>

     </div>
    </div>
      
    </div>
  )
}

export default Footer

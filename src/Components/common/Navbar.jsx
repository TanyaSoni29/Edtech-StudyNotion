import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../Core/Auth/ProfileDropDown';
import { apiConnecter } from '../../services/apiConnecter';
import { categories } from '../../services/api';
import { BsChevronDown} from "react-icons/bs"
import { ACCOUNT_TYPE } from '../../utils/constants';

function Navbar() {
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector ((state) => state.cart);
    const location = useLocation(); 

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const res = await apiConnecter("GET", categories.CATEGORIES_API)
                setSubLinks(res.data.data)
            } catch (error) {
                console.log("Could not fetch Categories.", error )
            }
            setLoading(false)
        })()
    },[])

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

   
  
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800": ""} transition-all duration-200 `}>
    <div className='w-11/12 flex justify-between max-w-maxContent items-center'>
    <Link to="/">
        <img src={logo} width={160} height={32} loading='lazy' alt='Logo' />

    </Link>

    <nav className='hidden md:block'>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map((link, index) => (
             <li key={index}>
                    {
                        link.title === "Catalog" ? 
                        (
                     <>
                        <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                            <p>{link.title}</p>
                            <BsChevronDown/> 

                            <div className='invisible absolute left-[50%] z-[1000] translate-x-[-50%] translate-y-[3em] top-[50%] flex w-[200px] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>

                            <div className='absolute w-6 h-6 left-[50%] top-0 rotate-45 rounded select-none bg-richblack-5 translate-x-[80%] -z-10 translate-y-[-40%]'>

                            </div>
                            {loading? (
                                <p className='text-center'>Loading...</p>
                            ) : subLinks.length ? (
                                <>
                                   {subLinks?.filter((subLink) => subLink?.courses?.length > 0)?.map((subLink, i) => (
                                    <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' key = {i}
                                   >
                                   <p>{subLink.name}</p>


                                   </Link>))}
                                </>
                            ) : (<p className='text-center'>No Courses Found</p>)}
                            </div>
                            </div>
                            </>) : (
                                <Link to={link?.path}><p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p></Link>
                            )}
                            </li>
            ))}
            </ul>
            </nav>

    <div className='md:flex hidden items-center gap-x-4'>
    {
        user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to={"/dashboard/cart"} className='relative'>
                <AiOutlineShoppingCart className='text-2xl text-richblack-100' />
                {
                    totalItems >0 && (
                        <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                            {totalItems}
                        </span>
                    )
                }
            </Link>
        )
    }

    {
        token === null && (
            <Link to="/login">
            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-[8px]'>
                Log In
            </button>

            </Link>
        )
    }
    {
        token === null && (
            <Link to="/signup" >
                <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-[8px]'>
                    Sign Up
                </button>
            </Link>

        )
    }
    {
        token !== null && <ProfileDropDown/>
    }

    </div>
    <button className='mr-4 md: hidden'><AiOutlineMenu fontSize={24} fill='#AFB2BF'/></button>
    </div>  
    </div>
  )
}

export default Navbar




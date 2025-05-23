import toast from "react-hot-toast"
import { setLoading, setUser} from "../../Slices/profileSlice"
import {profileEndpoints} from "../api"
import {logout} from "./authAPI"
import { apiConnecter } from "../apiConnecter"

const {
    GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API
} = profileEndpoints

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...") extra loading part online Spinner will come....
        dispatch(setLoading(true))
        try {
           const response = await apiConnecter("GET", GET_USER_DETAILS_API, null, {
            Authorization: `Bearer ${token}`,
           }) 
           console.log("GET_USER_DETAILS API RESPONSE..........", response)
           if(!response.data.success) {
            throw new Error(response.data.message)
           }
           const userImage = response.data.data.image ? response.data.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
           dispatch(setUser({...response.data.data, image: userImage}))

        } catch (error) {
         dispatch(logout(navigate))
         console.log("GET_USER_DETAILS API ERROR......",error)   
         toast.error("Could Not Get User Details")
        }
        // toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading....")
    let result = []
    try {
       
        const response = await apiConnecter("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })
       

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data

    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR........", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnecter("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`
        })

        console.log("GET_INSTRUCTOR_API_RESPONSE", response)
        result = response?.data?.courses
    } catch (error) {
        console.log("GET_INSTRUCTOR_API ERROR", error);
        toast.error("Could not get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
}

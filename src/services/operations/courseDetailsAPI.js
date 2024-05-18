import {toast} from "react-hot-toast";

import {apiConnecter} from "../apiConnecter"
import {coursesEndpoints} from "../api";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
} = coursesEndpoints

export const getAllCourse = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnecter("GET", GET_ALL_COURSE_API)
   
        if(!response.data.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data

    } catch (error) {
        console.log("GET_ALL COURSE_API API ERROR.......", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnecter("POST", COURSE_DETAILS_API, {
            courseId
        })

        console.log("COURSE_DETAILS_API API RESPONSE.......", response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR.....", error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnecter("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE.......", response)
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR........", error)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
       const response = await apiConnecter("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization : `Bearer ${token}`
       }) 
       console.log("CREATE_COURSE_API API RESPONSE......", response)

       if(!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
       
       }
       toast.success("Course Details Added Successfully")
       result = response?.data?.data
    } catch (error) {
        console.log("CREATE_COURSE_API API ERROR......", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT_COURSE_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Update Course Details")

        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT_COURSE_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", CREATE_SECTION_API, data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_SECTION_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Create Section")

        }
        toast.success("Course Section Created")
        result = response?.data?.updatedCourseDetails
    } catch (error) {
        console.log("CREATE_SECTION_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", CREATE_SUBSECTION_API,data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_SUB-SECTION_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Add Lecture")

        }
        toast.success("Lecture Added")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE_SUB-SECTION_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const updateSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", UPDATE_SECTION_API, data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE_SECTION_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Update Section")

        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE_SECTION_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const updateSubSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", UPDATE_SUBSECTION_API,data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE_SUB-SECTION_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Update Lecture")

        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE_SUB-SECTION_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", DELETE_SECTION_API, data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_SECTION_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Delete Section")

        }
        toast.success("Course Section Deleted")
    
        result = response?.data?.data
       
    } catch (error) {
        console.log("DELETE_SECTION_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const deleteSubSection = async(data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", DELETE_SUBSECTION_API,data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_SUB-SECTION_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Delete Lecture")

        }
        toast.success("Lecture Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE_SUB-SECTION_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const fetchInstructorCourses = async(token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("GET", GET_ALL_INSTRUCTOR_COURSES_API,null, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("INSTRUCTOR_COURSE_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")

        }
        result = response?.data?.data
    } catch (error) {
        console.log("INSTRUTOR_COURSES_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteCourse = async(data, token) => {
    
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("DELETE", DELETE_COURSE_API, data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("DELETE_COURSE_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Delete Course")

        }
        toast.success("Course Deleted")
       
    } catch (error) {
        console.log("DELETE_COURSE_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    
}



export const getFullDetailsOfCourse = async(courseId, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId}, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("COURSE_FULL_DETAILS_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error(response.data.message)

        }
        
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR........", error)
       result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}



export const markLectureAsComplete = async(data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnecter("POST", LECTURE_COMPLETION_API, data, { 
            Authorization: `Bearer ${token}`
        })
        console.log("MARK_LECTURE_AS_COMPLETE_API API RESPONSE....", response)
        if(!response.data.message) {
            throw new Error(response.data.error)

        }
        toast.success("Lecture Completed")
        result = true
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR........", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}



export const createRating = async(data, token) => {
    
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnecter("POST", CREATE_RATING_API, data, {
           
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_RATING_API API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could Not Create Rating")

        }
        toast.success("Rating Created")
        success= true
    } catch (error) {
        success = false
        console.log("CREATE_RATING_API API ERROR........", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
}





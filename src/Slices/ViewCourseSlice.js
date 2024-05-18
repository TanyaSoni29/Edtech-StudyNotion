import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLecture : 0
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers : {
        setCourseSectionData : (state, action) =>{
            state.courseSectionData = action.payload
        },
        setEntireCourseData : (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLecture = action.payload
        },
        setCompletedLectures: (state,action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state,action) => {
            if (!Array.isArray(state.completedLectures)) {
                state.completedLectures = [];
            }
            
            if (!state.completedLectures.includes(action.payload)) {
                state.completedLectures = [...state.completedLectures, action.payload];
            }
        }
    }
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
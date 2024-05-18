
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./Components/Core/Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./Components/Core/Dashboard/Settings"
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses"
import Cart from "./Components/Core/Dashboard/Cart"
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import AddCourse from "./Components/Core/Dashboard/AddCourse"
import { useEffect } from "react";
import MyCourses from "./Components/Core/Dashboard/MyCourses";
import EditCourse from "./Components/Core/Dashboard/EditCourse";
import Instructor from "./Components/Core/Dashboard/Instructor"
import VideoDetails from "./Components/Core/ViewCourse/VideoDetails"
import Catalog from "./pages/Catelog"
import CourseDetails from "./pages/CourseDetails"
import ViewCourse from "./pages/ViewCourse"
import { getUserDetails } from "./services/operations/profileAPI";


function App() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {user} = useSelector((state) => state.profile)
   
   useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
   }, [])

  return (
  <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">
  <Navbar />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contactus/>} />
    <Route path="/courses/:courseId" element={<CourseDetails />} />
    <Route path="/catalog/:catalogName" element={<Catalog/>} />


    <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>} />
    <Route path="/login" element={<OpenRoute><Login/></OpenRoute>} />
    <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>} />
    <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
    <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>} />
    
   
    <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>

      <Route path="dashboard/my-profile" element={<MyProfile/>}/>
      <Route path="dashboard/Settings" element={<Settings />}/> 
      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="/dashboard/instructor" element={<Instructor/>} />
          <Route path="/dashboard/my-courses" element={<MyCourses/>} />
          <Route path="/dashboard/add-course" element={<AddCourse/>} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />

          </>
        )
      }
      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </>
        )
      }
      <Route path="/dashboard/settings" element={<Settings/>} />
    </Route>
    
    <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
     {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
          <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
        </>
      )
     }

    </Route>
    <Route path="*" element={<Error/>} />
  </Routes>
   </div>
  );
}

export default App;

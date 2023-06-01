import { createBrowserRouter } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserCRUD from "./pages/UserCRUD"
import Activities from "./pages/Activities"
import Blogposts from "./pages/Blogposts"
import ClassInfo from "./pages/ClassInfo"
import Rooms from "./pages/Rooms"
import TrainingClass from "./pages/TrainingClasses"
import Bookings from "./pages/Bookings"
import CreateBlogpost from "./pages/CreateBlogpost"
import EditBlogpost from "./pages/EditBlogpost"
import { RestrictedRoute } from "./components/RestrictedRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
            <Dashboard />
        </RestrictedRoute>
       
    },
    {
        path: "/bookings/:bookingID",
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
            <Bookings />
        </RestrictedRoute>
    },
    {
        path: "/bookings",
        
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
            <Bookings />
        </RestrictedRoute>
    },
    {
        path: "/activities",
        
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer"]}>
            <Activities />
        </RestrictedRoute>
    },
    {
        path: "/blogposts",
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
            <Blogposts />
        </RestrictedRoute>
    },
    {
        path: "/blogposts/create",
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
            <CreateBlogpost />
        </RestrictedRoute>
    },
    {
        path: "/blogposts/:id",
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
            <EditBlogpost />
        </RestrictedRoute>
    },
    {
        path: "/classes",
        element: <TrainingClass />
    },
    {
        path: "/classes/:trainingClassID",
        element: <ClassInfo />
    },
    {
        path: "/rooms",
        element: 
        <RestrictedRoute allowedRoles={["admin", "trainer"]}>
            <Rooms />
        </RestrictedRoute>
    },
    {
        path: "/users",
        element: 
            <RestrictedRoute allowedRoles={["admin"]}>
                <UserCRUD />
            </RestrictedRoute>
    },
    {
        path: "/register",
        element: <Register />
    }
])

export default router
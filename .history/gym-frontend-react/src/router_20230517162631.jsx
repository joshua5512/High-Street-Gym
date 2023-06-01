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
        element: <Dashboard />
    },
    {
        path: "/bookings/:bookingID",
        element: <Bookings />
    },
    {
        path: "/bookings",
        element: <Bookings />
    },
    {
        path: "/activities",
        
        element: 
        <RestrictedRoute allowedRoles={["admin"]}>
        <Activities />
        </RestrictedRoute>
    },
    {
        path: "/blogposts",
        element: <Blogposts />
    },
    {
        path: "/blogposts/create",
        element: <CreateBlogpost />
    },
    {
        path: "/blogposts/:id",
        element: <EditBlogpost />
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
        element: <Rooms />
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
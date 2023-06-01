// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUserBookings } from "../api/bookings";
// import { getTop } from "../api/trainingClasses";
// import { getByUserID } from "../api/trainingClasses";
// import { getClassByID } from "../api/trainingClasses";
// import { getUserByID } from "../api/user";
// import Nav from "../components/Nav";
// import Spinner from "../components/Spinner";

// export default function Bookings(props) {
//     const navigate = useNavigate()
//     const {userID} = props

   
//     const [bookings, setBookings] = useState([])

//     useEffect(() => {
//         getUserBookings(userID).then(async bookings => {
//             const bookingsWithExtras = await Promise.all(bookings.map(async booking => {
//                 const user_id = await getUserByID(booking.user_id)
//                 const class_id = await getClassByID(booking.class_id)

//                 return Promise.resolve({
//                     id: booking.id,
//                     user_id,
//                     class_id,

//                     datetime: new Date(booking.created_datetime).toLocaleDateString(),
                    
//                 })
//             }))

//             setBookings(bookingsWithExtras)
//         })
//     }, [userID])

//     return <>
//         <Nav />
//         <div className="container p-2 mx-auto">
//             <div className="rounded border-2 border-primary p-2 w-full">
//                 {bookings.length == 0
//                     ? <Spinner />
//                     : <table className="table w-full">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>User ID</th>
//                                 <th>Class ID</th>
//                                 <th>Created Datetime</th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {bookings.map(booking =>
//                                 <tr key={booking.id}>
//                                     <td>{booking.id}</td>
//                                     <td>{booking.user_id}</td>
//                                     <td>{booking.class_id}</td>
//                                     <td>{booking.created_datetime}</td>
//                                     <td>
//                                         <button
//                                             onClick={() => navigate("/bookings/" + booking.id)}
//                                             className="btn btn-primary btn-sm">Details</button>
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 }
//             </div>
//         </div>
//     </>
// }


import { useEffect, useState } from "react"
import { getAll } from "../api/activities"
import { getAllRooms } from "../api/rooms"
import { createClass } from "../api/trainingClasses"
import { useAuthentication } from "../hooks/authentication"
import { getAllUsers } from "../api/user"


export function Bookings({ onAdded }) {
    const [user, login, logout] = useAuthentication()

    const [formData, setFormData] = useState({
        activity_id: "",
        room_id: "",
        datetime: "",
        trainer_user_id: ""
    })
    const [statusMessage, setStatusMessage] = useState("")

    const [activities, setActivities] = useState([])
    useEffect(() => {
        getAll().then(activities => setActivities(activities))
    }, [])

  
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        getAllRooms().then(rooms => setRooms(rooms))
    }, [])

    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers().then(users => setUsers(users))
    }, [])

    const [trainers, setTrainers] = useState([]);

    // Filter trainers from the users state and update the trainers state
    useEffect(() => {
        const filteredTrainers = users.filter(user => user.role === 'trainer');
        setTrainers(filteredTrainers);
    }, [users]);


    function addClass(e) {
        e.preventDefault()
        setStatusMessage("Creating class...")

        // Add user_id to the sighting object before sending
        const trainingClassData = {
            ...formData,
            trainer_user_id: user.id,
        }

        createClass(trainingClassData).then(result => {
            setStatusMessage(result.message)
            setFormData({
              activity_id: "",
              room_id: "",
              datetime: "",
              trainer_user_id: ""
            })

            if (typeof onAdded === "function") {
                onAdded()
            }
        })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={addClass} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Activity</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.activity_id}
                    onChange={(e) => setFormData(existing => { return { ...existing, activity_id: e.target.value } })}
                >
                    <option selected>Pick one</option>
                    {activities.map(activity => <option key={activity.id} value={activity.id}>{activity.name} - {activity.description}-{activity.duration}</option>)}
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Room</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.room_id}
                    onChange={(e) => setFormData(existing => { return { ...existing, room_id: e.target.value } })}
                >
                    <option selected>Pick one</option>
                    {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Datetime</span>
                </label>
                <input
                    type="datetime-local"
                    className="input input-bordered w-full"
                    value={formData.datetime}
                
                    onChange={(e) => setFormData(existing => { return { ...existing, datetime: e.target.value } })}

                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Trainer</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.trainer_user_id}
                    onChange={(e) => setFormData(existing => { return { ...existing, trainer_user_id: e.target.value } })}
                >
                    <option selected>Pick Trainer</option>
                    {trainers.map(trainer => <option key={trainer.id} value={trainer.id}>{trainer.name} - {trainer.role}-{trainer.firstname}-{trainer.lastname}</option>)}
                </select>
            </div>


            <div className="my-2">
                <button className="btn btn-primary mr-2" >Add</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}
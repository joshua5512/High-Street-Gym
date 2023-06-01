import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByID } from "../api/activities";
import { getClassByID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { createBooking } from "../api/bookings";

export default function ClassInfo() {
    const navigate = useNavigate()
    const { trainingClassID } = useParams()

    const [trainingClass, setTrainingClass] = useState(null)
    useEffect(() => {
        console.log("Loading class")

        getClassByID(trainingClassID).then(trainingClass => setTrainingClass(trainingClass)).catch(error => console.log(error))
    }, [])

    const [activity, setActivity] = useState(null)
    useEffect(() => {
        if (trainingClass) {
            getByID(trainingClass.activity_id).then(activity => setActivity(activity))
        }
    }, [trainingClass])

// const [booking, setBooking] = useState(null)
//     useEffect(() => {
//         if (trainingClass) {
//             getByID(trainingClass.activity_id).then(activity => setActivity(activity))
//         }
//     }, [trainingClass])
    
    const [room, setRoom] = useState(null)
    useEffect(() => {
        if (trainingClass) {
            getRoomByID(trainingClass.room_id).then(room => setRoom(room))
        }
    }, [trainingClass])

    

// ...






    const [user, setUser] = useState(null)
    useEffect(() => {
        if (trainingClass) {
            getUserByID(trainingClass.trainer_user_id).then(user => setUser(user))
        }
        
    }, [trainingClass])

    

    const handleBooking = async () => {
        if (!trainingClass) return;
      
        // Get the user ID of the logged-in user (replace with your own method)
        const userID = getUserByID();
      
        const newBooking = {
          user_id: userID,
          class_id: trainingClass.id,
          created_datetime: new Date().toISOString(),
        };
      
        try {
          await createBooking(newBooking);
          navigate(`/bookings/${trainingClassID}`);
        } catch (error) {
          console.error("Failed to create booking:", error);
        }
      };
    

    return <>
        <Nav />
        <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Class</h2>
                {trainingClass == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Datetime</div>
                            <div className="stat-value">{new Date(trainingClass.datetime).toLocaleString()}</div>
                        </div>

                        <div className="stat">
                        <div className="stat-title">Trainer ID</div>
                        {/* <div className="stat-value">
                            {trainer ? `${trainer.firstname} ${trainer.lastname}` : ''}
                        </div> */}
                        <div className="stat-value">
                            {trainingClass.trainer_user_id}
                        </div>
            </div>
            </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Room</h2>
                {room == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Location</div>
                            <div className="stat-value whitespace-normal">{room.location}</div>  
                        </div>
                        <div className="stat">
                        <div className="stat-title">Room Number</div>
                            <div className="stat-value whitespace-normal">{room.number}</div>
                        </div>
                    </div>
                }
       

            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Activity</h2>
                {activity == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">Name</div>
                            <div className="stat-value">{activity.name}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Description</div>
                            <div className="stat-value whitespace-normal">{activity.description}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Duration(Mins)</div>
                            <div className="stat-value whitespace-normal">{activity.duration_minutes}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Trainer Info</h2>
                {user == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">First Name</div>
                            <div className="stat-value whitespace-normal">{user.firstname}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Last Name</div>
                            <div className="stat-value whitespace-normal">{user.lastname}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Role</div>
                            <div className="stat-value whitespace-normal">{user.role}</div>
                        </div>
                    </div>
                }
            </div>
            <button
                onClick={handleBooking}
                className="btn btn-primary btn-sm mt-2 w-3/12" 
            >Book Now
            </button>
            {/* <button onClick={()=> navigate("/bookings/")} className="btn btn-primary btn-sm">BOOK NOW</button> */}
        </div>
    </>
}
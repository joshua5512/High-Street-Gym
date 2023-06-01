import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getByID } from "../api/activities";
import { getClassByID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function ClassInfo() {
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

    const [room, setRoom] = useState(null)
    useEffect(() => {
        if (trainingClass) {
            getRoomByID(trainingClass.room_id).then(room => setRoom(room))
        }
    }, [trainingClass])

    const [trainer, setTrainer] =useState(null)
    useEffect(() => {
        if (trainingClass) {
            getUserByID(trainingClass.trainer_user_id).then(user => setUser(user))
        }
    }, [trainingClass])

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (trainingClass) {
            getUserByID(trainingClass.trainer_user_id).then(user => setUser(user))
        }
    }, [trainingClass])

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
                            <div className="stat-title">Trainer</div>
                            <div className="stat-value">{user.firstname}</div>
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
                <h2 className="text-center">Class Booking Info</h2>
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
        </div>
    </>
}
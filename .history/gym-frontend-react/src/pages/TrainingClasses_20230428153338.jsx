import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getByID } from "../api/activities";
import { getTop } from "../api/trainingClasses";
// import { TrainingClass } from "../api/trainingClasses";
import { getUserClasses } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Classes() {
    const navigate = useNavigate()

    const [trainingClasses, setTrainingClasses] = useState([])

    useEffect(() => {
        getTop(200).then(async trainingClasses => {

            const trainingClassesWithExtras = await Promise.all(trainingClasses.map(async trainingClass => {
                
                const activity = await getByID(trainingClass.activity_id)
                const room = await getRoomByID(trainingClass.room_id)
                const trainer = await getUserClasses(trainingClass.trainer_user_id)

                return Promise.resolve({
                    id: trainingClass.id,
                    date: new Date(trainingClass.datetime).toLocaleDateString(),
                    trainer,
                    activity,
                    room,
                })
            }))

            setTrainingClasses(trainingClassesWithExtras)
        })
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mx-auto">
            <div className="rounded border-2 border-primary p-2 w-full">
                {trainingClasses.length == 0
                    ? <Spinner />
                    : <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Room</th>
                                <th>Datetime</th>
                                <th>Trainer</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingClasses.map(trainingClass =>
                                <tr key={trainingClass.id}>
                                    <td>{trainingClass.activity.name}</td>
                                    <td>{trainingClass.room.location}</td>
                                    <td>{trainingClass.date}</td>
                            
                                    <td>{trainingClass.user_id}</td>
                                    
                                    <td>
                                        <button
                                            onClick={() => navigate("/classes/" + trainingClass.id)}
                                            className="btn btn-primary btn-sm">Details</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
}
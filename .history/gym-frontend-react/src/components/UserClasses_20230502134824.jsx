import { useEffect, useState } from "react"
import { getByID } from "../api/activities"
import { getByUserID } from "../api/trainingClasses"
import { getRoomByID } from "../api/rooms"
import Spinner from "./Spinner"
import { getUserByID } from "../api/user" 

export default function UserClasses({ userID, refreshDependency }) {
    const [trainingClasses, setTrainingClasses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getByUserID(userID).then(async trainingClasses => {
            const trainingClassesWithExtras = await Promise.all(trainingClasses.map(async trainingClass => {
                const room = await getRoomByID(trainingClass.room_id)
                const activity = await getByID(trainingClass.activity_id)
                const trainer = await getByUserID(trainingClass.trainer_user_id)

                return Promise.resolve({
                    id: trainingClass.id,
                    datetime: new Date(trainingClass.datetime).toLocaleDateString(),
                    room,
                    activity,
                    trainer
                })
            }))

            setTrainingClasses(trainingClassesWithExtras)
            setLoading(false)
        })
    }, [refreshDependency])

    return loading
        ? <Spinner />
        : <table className="table table-compact w-full">
            <thead>
                <th>Activity</th>
                <th>Room</th>
                <th>Datetime</th>
                <th>Trainer</th>
            </thead>
            <tbody>
                {trainingClasses.map(trainingClass =>
                    <tr key={trainingClass.id}>
                        <td>{trainingClass.activity.name}</td>
                        <td>{trainingClass.room.number}</td>
                        <td>{(trainingClass.datetime).toLocaleDateString()}</td>
                        <td>{trainingClass.trainer_user_id}</td>
               
                    </tr>
                )}
            </tbody>
        </table>
}
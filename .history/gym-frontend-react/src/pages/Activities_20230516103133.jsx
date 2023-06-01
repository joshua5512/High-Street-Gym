import { useEffect, useState } from "react";
import { getAll } from "../api/activities";
import Nav from "../components/Nav";
import { XMLUpload } from "../components/XMLUpload";

export default function Activities() {
    const [activities, setActivities] = useState([])
    const [selectedActivityID, setSelectedActivityID] = useState(null)

    useEffect(() => {
        getAll().then(activities => setActivities(activities))
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mt-16 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border-2 border-primary p-4">
                <h2 className="text-center">All activities</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Duration (MINS)</th>
                            {/* <th>Select</th> */}
                        </thead>
                        <tbody>
                            {activities.map(activity =>
                                <tr key={activity.id}>
                                    <td>{activity.name}</td>
                                    <td>{activity.description}</td>
                                    <td>{activity.duration_minutes}</td>
                                    {/* <button
                                            className="btn btn-xs mt-1"
                                            onClick={() => setSelectedActivityID(user.id)}
                                        >Edit</button> */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded-2xl border-2 border-primary  min-h-16 p-2">
                <h2 className="text-center">Upload Activities</h2>
                <XMLUpload />
            </div>
        </div>
    </>
}
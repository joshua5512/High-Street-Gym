import { useEffect, useState } from "react";
import { getAll } from "../api/activities";
import Nav from "../components/Nav";
import { XMLUpload } from "../components/XMLUpload";

export default function Activities() {
    const [activities, setActivities] = useState([])
    useEffect(() => {
        getAll().then(activities => setActivities(activities))
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">All rooms</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                        </thead>
                        <tbody>
                            {activities.map(activity =>
                                <tr key={activity.id}>
                                    <td>{activity.description}</td>
                                    <td>{activity.duration}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded border-2 border-primary  min-h-16 p-2">
                <h2 className="text-center">Upload Activities</h2>
                <XMLUpload />
            </div>
        </div>
    </>
}
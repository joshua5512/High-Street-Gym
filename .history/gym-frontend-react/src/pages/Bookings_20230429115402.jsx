import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingByID } from "../api/bookings";
import { getTop } from "../api/trainingClasses";
import { getByUserID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Booking() {
    const navigate = useNavigate()

   
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        getTopBookings(200).then(async bookings => {
            // fetch trails and animals for each sighting
            const bookingsWithExtras = await Promise.all(bookings.map(async booking => {
                const user_id = await getUserByID(booking.user_id)
                const class_id = await getClassByID(booking.class_id)

                return Promise.resolve({
                    id: booking.id,
                    user_id,
                    class_id,

                    datetime: new Date(booking.created_datetime).toLocaleDateString(),
                    
                })
            }))

            setBookings(bookingsWithExtras)
        })
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mx-auto">
            <div className="rounded border-2 border-primary p-2 w-full">
                {sightings.length == 0
                    ? <Spinner />
                    : <table className="table w-full">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Class ID</th>
                                <th>Created Datetime</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sightings.map(sighting =>
                                <tr key={sighting.id}>
                                    <td>{sighting.animal.name}</td>
                                    <td>{sighting.trail.name}</td>
                                    <td>{sighting.date}</td>
                                    <td>{sighting.time}</td>
                                    <td>
                                        <button
                                            onClick={() => navigate("/sightings/" + sighting.id)}
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingByID } from "../api/bookings";
import { getTop } from "../api/trainingClasses";
import { getByUserID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Booking() {
    const navigate = useNavigate()

   
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        getTopBookings(200).then(async bookings => {
            // fetch trails and animals for each sighting
            const sightingsWithExtras = await Promise.all(sightings.map(async sighting => {
                const trail = await getTrailByID(sighting.trail_id)
                const animal = await getAnimalByID(sighting.animal_id)

                return Promise.resolve({
                    id: sighting.id,
                    date: new Date(sighting.date).toLocaleDateString(),
                    time: sighting.time,
                    trail,
                    animal,
                })
            }))

            setSightings(sightingsWithExtras)
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
                                <th>Animal</th>
                                <th>Trail</th>
                                <th>Date</th>
                                <th>Time</th>
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
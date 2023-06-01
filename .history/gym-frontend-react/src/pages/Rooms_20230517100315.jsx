import { useEffect, useState } from "react";
import { getAllRooms } from "../api/rooms";
import Nav from "../components/Nav";
import { XMLRoomUpload } from "../components/XMLRoomUpload";

export default function Rooms() {
    const [rooms, setRooms] = useState([])
    const [refreshTrigger, setRefreshTrigger] = useState({})

    useEffect(() => {
        getAllRooms().then(rooms => setRooms(rooms))
    }, [])

    return <>
        <Nav />
        <div className="container p-2 mt-16 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="rounded-2xl border-2 border-primary p-2">
                <h2 className="text-center">All Rooms</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-full">
                        <thead>
                            {/* <th>ID</th> */}
                            <th>Location</th>
                            <th>Room number</th>
                        </thead>
                        <tbody>
                            {rooms.map(room =>
                                <tr key={room.id}>
                                    {/* <td>{room.id}</td> */}
                                    <td>{room.location}</td>
                                    <td>{room.number}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded-2xl border-2 border-primary  min-h-16 p-2">
                <h2 className="text-center">Upload Rooms</h2>
                <XMLRoomUpload />
            </div>
        </div>
    </>
}
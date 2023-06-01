import { db } from "../database/mysql.js";

export function Room(id, location, number) {
  return {
    id,
    location,
    number
  }
}

export async function getAll() {
    const [allRoomsResults] = await db.query("SELECT * FROM rooms")

    return await allRoomsResults.map((roomResult) =>
        Room(roomResult.id, roomResult.location,roomResult.number)
    )
}

export async function create(room) {
    delete room.id
    return db.query(
        "INSERT INTO rooms (location, number) VALUES (?,?)",
        [room.location,room.number]
    ).then(([result]) => {   
        return { ...room, id: result.insertId }
    })
}

export async function update(room) {
    return db.query(
        "UPDATE rooms SET (location, number) VALUES (?,?)",
        [room.location,room.number]
    )
}

export async function deleteByID(roomID) {
    return db.query("DELETE FROM rooms WHERE id = ?", roomID)
}

export async function getByID(roomID) {

    const [roomsResults] = await db.query(
        "SELECT * FROM rooms WHERE id = ?", roomID
    )

    if (roomsResults.length > 0) {
        const roomResult = roomsResults[0];
        return Promise.resolve(
            Room(roomResult.id, roomResult.location,roomResult.number)
        )
    } else {
        return Promise.reject("no results found")
    }
}
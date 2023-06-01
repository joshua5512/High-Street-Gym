import { API_URL } from "./api.js"

    export async function getAllRooms() {
    const response = await fetch(
        API_URL + "/rooms",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.rooms
}



export async function createRoom(room) {
    const response = await fetch(
        API_URL + "/rooms",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(room)
        }
    )

    const postCreateRoomResponse = await response.json()

    return postCreateRoomResponse.room
}

export async function updateRoom(room) {
    const response = await fetch(
        API_URL + "/rooms",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(room)
        }
    )

    const patchRoomResponse = await response.json()

    return patchRoomResponse.trail
}

export async function deleteRoom(room) {
    const response = await fetch(
        API_URL + "/rooms",
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(room)
        }
    )

    const deleteRoomResponse = await response.json()

    return deleteRoomResponse
}

export async function getRoomByID(roomID) {

    const response = await fetch(
        API_URL + "/rooms/" + roomID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.room
}
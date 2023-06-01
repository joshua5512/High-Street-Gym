import { API_URL } from "./api.js"

export async function getAll() {
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.activities
}

export async function getByID(activityID) {

    const response = await fetch(
        API_URL + "/activities/" + activityID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.activity
}

// export async function getByClassID(classID) {

//     const response = await fetch(
//         API_URL + "/activities/" + classID,
//         {
//             method: "GET",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//         }
//     )

//     const APIResponseObject = await response.json()

//     return APIResponseObject.class
// }


export async function createActivity(activity) {
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(activity)
        }
    )

    const postCreateActivityResponse = await response.json()

    return postCreateActivityResponse.activity
}

export async function updateActivity(activity) {
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(activity)
        }
    )

    const patchActivityResponse = await response.json()

    return patchActivityResponse.activity
}

export async function deleteActivity(activity) {
    const response = await fetch(
        API_URL + "/activities",
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(activity)
        }
    )

    const deleteActivityResponse = await response.json()

    return deleteActivityResponse
}
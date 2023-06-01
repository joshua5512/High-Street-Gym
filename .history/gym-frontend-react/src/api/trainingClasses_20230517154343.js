import { API_URL } from "./api.js"

export async function getAllClasses() {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject.trainingClasses
}

export async function getTop(amount) {  
    const response = await fetch(
        API_URL + "/classes/top/" + amount,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject.trainingClasses
}

export async function getByUserID(userID, authenticationKey) {
    const response = await fetch(
        API_URL + "/classes/user-id/" + userID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
         
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject.trainingClasses
}

export async function getClassByID(trainingClassID) {
    const response = await fetch(
        API_URL + "/classes/" + trainingClassID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject.trainingClass
}

export async function createClass(trainingClass) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(trainingClass)
        }
    )
    const postCreateClassResponse = await response.json()
    return postCreateClassResponse
}


export async function updateClass(trainingClass) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(trainingClass)
        }
    )
    const patchClassResponse = await response.json()
    return patchClassResponse.trainingClass
}

export async function deleteClass(trainingClass, authenticationKey) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(authenticationKey)
        }
    )
    const deleteClassResponse = await response.json()
    return deleteClassResponse
}
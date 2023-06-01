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

export async function getByUserID(userID) {
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

export async function createClass(trainingClass, authenticationKey) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({...trainingClass, authenticationKey})
        }
    )
    const postCreateClassResponse = await response.json()
    return postCreateClassResponse
}

export async function updateClass(trainingClass, authKey) {
    const response = await fetch(
        API_URL + "/classes",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${authKey}`
            },
            body: JSON.stringify({...trainingClass, authKey})
        }
    )
    const patchClassResponse = await response.json()
    return patchClassResponse.trainingClass
}

export async function deleteClass(trainingClassID, authenticationKey) {
    const response = await fetch(
      API_URL + "/classes/" + trainingClassID,  // pass id in the URL
      {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({trainingClassID, authenticationKey})
      }
    )
    return await response.json();
}
  

  
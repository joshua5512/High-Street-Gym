import { API_URL } from "./api.js"

export async function getAllBlogposts() {
    const response = await fetch(
        API_URL + "/blogposts",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogposts
}

export async function getBlogpostByID(blogpostID) {

    const response = await fetch(
        API_URL + "/blogposts/" + blogpostID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blogpost
}

export async function createBlogposts(blogpost) {
    const response = await fetch(
        API_URL + "/blogposts",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogpost)
        }
    )

    const postCreateBlogpostResponse = await response.json()

    return postCreateAnctivityResponse.activity
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
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

export async function createBlogpost(blogpost) {
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

    return postCreateBlogpostResponse.blogpost
}

export async function updateBlogpost(blogpost) {
    const response = await fetch(
        API_URL + "/blogposts",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogpost)
        }
    )

    const patchBlogpostResponse = await response.json()

    return patchBlogpostResponse.blogpost
}

export async function deleteBlogpost(blogpost) {
    const response = await fetch(
        API_URL + "/blogposts",
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blogpost)
        }
    )

    const deleteBlogpostResponse = await response.json()

    return deleteBlogpostResponse
}
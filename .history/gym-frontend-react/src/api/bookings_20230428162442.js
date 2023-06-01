import { API_URL } from "./api.js"

export async function getAllBookings() {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.bookings
}

export async function getBookingByID(bookingID) {

    const response = await fetch(
        API_URL + "/bookings/" + bookingID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.booking
}

export async function createBookingbooking) {
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
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

export async function getUserBookings(userID) {

  const response = await fetch(
      API_URL + "/bookings/user-id/" + userID,
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

export async function createBooking(booking) {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        }
    )

    const postCreateBookingResponse = await response.json()

    return postCreateBookingResponse.booking
}

export async function updateBooking(booking) {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        }
    )

    const patchBookingResponse = await response.json()

    return patchBookingResponse.booking
}

export async function deleteBooking(booking) {
    const response = await fetch(
        API_URL + "/bookings",
        {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(booking)
        }
    )

    const deleteBookingResponse = await response.json()

    return deleteBookingResponse
}
import { API_URL } from "./api.js"

export async function getAllBookings() {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const APIResponseObject = await response.json();
  return APIResponseObject.bookings;
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

export async function createBooking(booking, authenticationKey) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...booking, authenticationKey}),
  });
  const APIResponseObject = await response.json();
  return APIResponseObject.booking;
}
  
export async function updateBooking(booking, authenticationKey) {
  const response = await fetch(
    API_URL + "/bookings",
    {
      method: "PATCH",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({...booking, authenticationKey})
    }
  )
  const patchBookingResponse = await response.json()
  return patchBookingResponse.booking
}

export async function deleteBooking(bookingID, authenticationKey) {
  const response = await fetch(`${API_URL}/bookings/${bookingID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({authenticationKey})
  });
  const deleteBookingResponse = await response.json();
  return deleteBookingResponse;
}
  
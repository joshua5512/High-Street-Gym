import { db } from "../database/mysql.js";

export function Booking(id, user_id, class_id, created_datetime) {
  return {
      id,
      user_id,
      class_id,
      created_datetime
  }
}


export async function getAllBookings() {
    // Get the collection of all bookings
    const [allBookingsResults] = await db.query("SELECT * FROM bookings")
   
    return await allBookingsResults.map((bookingResult) =>
        Booking(
          bookingResult.id,
          bookingResult.user_id,
          bookingResult.class_id,
          bookingResult.created_datetime

        ))
}


export async function getBookingByID(bookingID) {

    const [bookingsResults] = await db.query(
        "SELECT * FROM bookings WHERE id = ?", bookingID
    )

    if (bookingsResults.length > 0) {
        const bookingResult = bookingsResults[0];
        return Promise.resolve(
            Booking(
              bookingResult.id,
              bookingResult.user_id,
              bookingResult.class_id,
              bookingResult.created_datetime

            )
        )
    } else {
        return Promise.reject("no results found")
    }
}

// export async function getBookingByUserID(userID) {

//     const [bookingsResults] = await db.query(
//         "SELECT * FROM bookings WHERE user_id = ?", userID
//     )
//     // Convert the result into a Sighting object
//     return await bookingsResults.map((bookingResult) =>
//         Booking(
//           bookingResult.id,
//           bookingResult.user_id,
//           bookingResult.class_id,
//           bookingResult.created_datetime
//         ))
// }

export async function getBookingByUserID(userID) {
    const [bookingsResults] = await db.query(
      `
      SELECT b.id, b.user_id, c.activity_id AS activity_name, b.created_datetime
      FROM bookings AS b
      INNER JOIN classes AS c ON b.class_id = c.id
      INNER JOIN activities AS a ON c.activity_id = a.id
      WHERE b.user_id = ?
      `,
      userID
    );
  
    return await bookingsResults.map((bookingResult) =>
      Booking(
        bookingResult.id,
        bookingResult.user_id,
        bookingResult.activity_name,
        bookingResult.created_datetime
      )
    );
  }
  

export async function createBooking(booking) {
    
    delete booking.id

    return db.query(
        "INSERT INTO bookings (user_id, class_id, created_datetime) " +
        "VALUES (?, ?, ?)",
        [booking.user_id, booking.class_id, booking.created_datetime]
    ).then(([result]) => {
     
        return { ...booking, id: result.insertId }
    })
}

export async function updateBooking(booking) {
    return db.query(
        "UPDATE bookings SET created_datetime = ? WHERE id = ?",
        [booking.created_datetime, booking.id]
    )
}

export async function deleteBooking(bookingID) {
    return db.query("DELETE FROM bookings WHERE id = ?", bookingID)
}
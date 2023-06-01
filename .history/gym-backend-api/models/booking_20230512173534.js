import { db } from "../database/mysql.js";

export function Booking(id, user_id, class_id, created_datetime, activity_name
    ) {
  return {
      id,
      user_id,
      class_id,
      created_datetime,
      activity_name
  }
}


export async function getAllBookings() {
    // Get the collection of all bookings
    const query = `
    SELECT b.id, b.user_id, b.class_id, b.created_datetime, a.name AS activity_name
    FROM bookings AS b
    INNER JOIN training_classes AS tc ON b.class_id = tc.id
    INNER JOIN activities AS a ON tc.activity_id = a.id
  `;

  const [allBookingsResults] = await db.query(query);

    return await allBookingsResults.map((bookingResult) =>
        Booking(
          bookingResult.id,
          bookingResult.user_id,
          bookingResult.class_id,
          bookingResult.created_datetime,
          bookingResult.activity_name

        ))
}


// export async function getBookingByID(bookingID) {

//     const [bookingsResults] = await db.query(
//         "SELECT * FROM bookings WHERE id = ?", bookingID
//     )

//     if (bookingsResults.length > 0) {
//         const bookingResult = bookingsResults[0];
//         return Promise.resolve(
//             Booking(
//               bookingResult.id,
//               bookingResult.user_id,
//               bookingResult.class_id,
//               bookingResult.created_datetime

//             )
//         )
//     } else {
//         return Promise.reject("no results found")
//     }
// }

export async function getBookingByID(bookingID) {
    const query = `
      SELECT b.id, b.user_id, b.class_id, b.created_datetime, a.name AS activity_name
      FROM bookings AS b
      INNER JOIN training_classes AS tc ON b.class_id = tc.id
      INNER JOIN activities AS a ON tc.activity_id = a.id
      WHERE b.id = ?
    `;
  
    const [bookingsResults] = await db.query(query, bookingID);
  
    if (bookingsResults.length > 0) {
      const bookingResult = bookingsResults[0];
      return Promise.resolve(
        Booking(
          bookingResult.id,
          bookingResult.user_id,
          bookingResult.class_id,
          bookingResult.created_datetime,
          bookingResult.activity_name
        )
      );
    } else {
      return Promise.reject("no results found");
    }
  }
  

export async function getBookingByUserID(userID) {

    const query = `
      SELECT b.id, b.user_id, b.class_id, b.created_datetime, a.name AS activity_name
      FROM bookings AS b
      INNER JOIN training_classes AS tc ON b.class_id = tc.id
      INNER JOIN activities AS a ON tc.activity_id = a.id
      WHERE b.user_id = ?
    `;
  
    const [bookingsResults] = await db.query(query, userID);
  
    // Convert the result into a Sighting object
    return await bookingsResults.map((bookingResult) =>
        Booking(
          bookingResult.id,
          bookingResult.user_id,
          bookingResult.class_id,
          bookingResult.created_datetime,
          bookingResult.activity_name
        ))
}

// export async function createBooking(booking) {
    
//     delete booking.id

//     return db.query(
//         "INSERT INTO bookings (user_id, class_id, created_datetime) " +
//         "VALUES (?, ?, ?)",
//         [booking.user_id, booking.class_id, booking.created_datetime]
//     ).then(([result]) => {
     
//         return { ...booking, id: result.insertId }
//     })
// }

export async function createBooking(booking) {
    delete booking.id;
  
    const query = `
      INSERT INTO bookings (user_id, class_id, created_datetime)
      SELECT ?, tc.id, ?
      FROM training_classes AS tc
      INNER JOIN activities AS a ON tc.activity_id = a.id
      WHERE tc.id = ?
    `;
  
    const params = [booking.user_id, booking.created_datetime, booking.class_id];
  
    return db.query(query, params).then(([result]) => {
      return { ...booking, id: result.insertId };
    });
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



// export async function deleteBooking(bookingID) {
//     const query = `
//       DELETE b
//       FROM bookings AS b
//       INNER JOIN training_classes AS tc ON b.class_id = tc.id
//       INNER JOIN activities AS a ON tc.activity_id = a.id
//       WHERE b.id = ?
//     `;
  
//     const params = [bookingID];
  
//     return db.query(query, params);
//   }



// export async function deleteBooking(bookingID) {
//   const query = `
//     DELETE FROM bookings WHERE id = ?
//   `;
//   const params = [bookingID];

//   return db.query(query, params);
// }

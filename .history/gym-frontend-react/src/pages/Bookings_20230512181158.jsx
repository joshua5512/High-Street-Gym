import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserBookings, deleteBooking, getBookingByID } from "../api/bookings";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";
import { Link } from "react-router-dom";

export default function Bookings({ refreshDependency }) {
  const [bookings, setBookings] = useState([]);
  const [user] = useAuthentication();

  useEffect(() => {
    if (user && user.id) {
      getUserBookings(user.id).then(async (bookings) => {
        const bookingsWithExtras = await Promise.all(
          bookings.map(async (booking) => {
            const activity = await getBookingByID(booking.id);

            return Promise.resolve({
              id: booking.id,
              user,
              activity: activity.activity_name,
              date: new Date(booking.created_datetime).toLocaleString(),
            });
          })
        );

        setBookings(bookingsWithExtras);
      });
    }
  }, [user, refreshDependency]);

  const handleDeleteBooking = async (bookingID) => {
    try {
      await deleteBooking(bookingID);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingID)
      );
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="rounded border-2 border-primary p-2">
  <h2 className="text-center">Booking Information</h2>
  {bookings.length === 0 ? (
    <p>No bookings available</p>
  ) : (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Member Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>
              {booking.user.firstname} {booking.user.lastname}
            </td>
            <td>{new Date(booking.created_datetime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

    </>
  );
}

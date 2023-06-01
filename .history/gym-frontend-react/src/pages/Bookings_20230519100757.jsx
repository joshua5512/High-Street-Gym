import { useEffect, useState } from "react";
import { getUserBookings, deleteBooking, getBookingByID, getAllBookings  } from "../api/bookings";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";
import { useNavigate } from "react-router-dom";

export default function Bookings({ refreshDependency }) {
  const [bookings, setBookings] = useState([]);
  const [user] = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    
    if (user && ( user.role === "admin")) {
      getAllBookings(user.authenticationkey).then(async (bookings) => {
        const bookingsWithExtras = await Promise.all(
          bookings.map(async (booking) => {
            const activity = await getBookingByID(booking.id);
            const trainingClass = await getClassByID(activity.class_id);
            const user = await getUserByID(activity.user_id);

            return Promise.resolve({
              id: booking.id,
              user,
              activity: activity.activity_name,
              date: new Date(booking.created_datetime).toLocaleString(),
              trainingClass,
            });
          })
        );

        setBookings(bookingsWithExtras);
      });
    } else if (user && user.id) {
      getUserBookings(user.id).then(async (bookings) => {
        const bookingsWithExtras = await Promise.all(
          bookings.map(async (booking) => {
            const activity = await getBookingByID(booking.id);
            const trainingClass = await getClassByID(activity.class_id);

            return Promise.resolve({
              id: booking.id,
              user,
              activity: activity.activity_name,
              date: new Date(booking.created_datetime).toLocaleString(),
              trainingClass,
            });
          })
        );

        setBookings(bookingsWithExtras);
      });
    }
  }, [user, refreshDependency]);

  const handleDeleteBooking = async (bookingID) => {
    try {
      await deleteBooking(bookingID, user.authen);
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
      <div className="container mt-16 p-2 mx-auto">
        <div className="rounded-2xl border-2 border-primary p-2 w-full">
        {bookings.length === 0 ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th>Booking number</th>
                  <th>Member name</th>
                  <th>Activity name</th>
                  <th>Created Datetime</th>
                  <th>Class Details</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="md:table-row flex flex-col md:flex-row">
                    <td className="md:table-cell">
                      <div className="font-semibold md:hidden">Booking number:</div> 
                      {booking.id}
                    </td>
                    <td className="md:table-cell">
                      <div className="font-semibold md:hidden">Member name:</div> 
                      {booking.user.firstname} {booking.user.lastname}
                    </td>
                    <td className="md:table-cell">
                      <div className="font-semibold md:hidden">Activity name:</div> 
                      {booking.activity}
                    </td>
                    <td className="md:table-cell">
                      <div className="font-semibold md:hidden">Created Datetime:</div> 
                      {booking.date}
                    </td>
                    <td className="md:table-cell">
                      <div className="font-semibold md:hidden">Class Details:</div>
                      <button
                        onClick={() => navigate(`/classes/${booking.trainingClass.id}`)}
                        className="btn btn-info btn-sm"
                      >
                        Details
                      </button>
                    </td>
                    <td className="md:table-cell">
                      <div className="font-semibold md:hidden">Delete:</div>
                      <button
                        className="btn btn-button btn-sm"
                        onClick={() => handleDeleteBooking(booking.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
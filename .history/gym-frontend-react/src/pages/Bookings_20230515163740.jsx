import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserBookings, deleteBooking, getBookingByID, getAllBookings  } from "../api/bookings";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export default function Bookings({ refreshDependency }) {
  const [bookings, setBookings] = useState([]);
  const [user] = useAuthentication();
  const navigate = useNavigate();


  useEffect(() => {
    
    if (user && ( user.role === "admin")) {
      getAllBookings().then(async (bookings) => {
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
  <div className="container p-2 mx-auto">
    <div className="rounded border-2 border-primary p-2 w-full">
      {bookings.length === 0 ? (
        <Spinner />
      ) : (
        <div className="flex flex-col space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-2 rounded flex flex-col space-y-2">
              <div>Booking number: {booking.id}</div>
              <div>
                Member name: {booking.user.firstname} {booking.user.lastname}
              </div>
              <div>Activity name: {booking.activity}</div>
              <div>Created Datetime: {booking.date}</div>
              <div>
                <button
                  onClick={() => navigate(`/classes/${booking.trainingClass.id}`)}
                  className="btn btn-info btn-sm"
                >
                  Details
                </button>
              </div>
              <div>
                <button
                  className="btn btn-button btn-sm"
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</>

  );
}

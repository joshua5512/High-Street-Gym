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
            <table className="table w-full">
              <thead>
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
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>
                      {booking.user.firstname} {booking.user.lastname}
                    </td>
                    <td>{booking.activity}</td>
                    
                    <td>{booking.date}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/classes/${booking.trainingClass.id}`)}
                        className="btn btn-button btn-sm"
                      >
                        Details
                      </button>
                    </td>

                    <td>
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
          )}
        </div>
      </div>
    </>
  );
}

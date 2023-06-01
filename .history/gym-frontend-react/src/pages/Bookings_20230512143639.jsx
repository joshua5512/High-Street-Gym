
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserBookings, getBookingByID } from "../api/bookings";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";
import { Link } from "react-router-dom";
// import { getAllBookings } from "../api/bookings";

export default function Bookings({ refreshDependency }) {
  const [bookings, setBookings] = useState([]);
  const [user] = useAuthentication();

  useEffect(() => {
    if (user && user.id) {
      getUserBookings(user.id).then(async (bookings) => {
        console.log(user.id);

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
                      <Button
                        
                        className="btn btn-button btn-sm"
                      >
                        Delete
                      </Button>
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
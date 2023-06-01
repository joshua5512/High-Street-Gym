import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookingByID } from "../api/bookings";
import { getClassByID } from "../api/trainingClasses";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function BookingDetail() {
  const [booking, setBooking] = useState(null);
  const [trainingClass, setTrainingClass] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getBookingDetails();
  }, []);

  const getBookingDetails = async () => {
    try {
      const booking = await getBookingByID(id);
      const trainingClass = await getClassByID(booking.class_id);
      const user = await getUserByID(booking.user_id);

      setBooking(booking);
      setTrainingClass(trainingClass);
      setUser(user);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="container p-2 mx-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="rounded border-2 border-primary p-2 w-full">
            <h1 className="text-xl font-bold mb-4">Booking Detail</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <h2 className="text-lg font-bold mb-2">User</h2>
                <p>
                  {user.firstname} {user.lastname}
                </p>
                <p>{user.email}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h2 className="text-lg font-bold mb-2">Class</h2>
                <p>{trainingClass.activity_id}</p>
                <p>{trainingClass.date}</p>
                <p>
                  {trainingClass.start_time} - {trainingClass.end_time}
                </p>
              </div>
              <div className="col-span-2">
                <h2 className="text-lg font-bold mb-2">Booking</h2>
                <p>Booking ID: {booking.id}</p>
                <p>Created at: {booking.created_datetime}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

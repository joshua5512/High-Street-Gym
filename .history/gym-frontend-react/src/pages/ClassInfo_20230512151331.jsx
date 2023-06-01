import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByID } from "../api/activities";
import { getClassByID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { createBooking } from "../api/bookings";
import { useAuthentication } from "../hooks/authentication";

export default function ClassInfo() {
  const [logged_in_user] = useAuthentication();
  const navigate = useNavigate();
  const { trainingClassID } = useParams();

  const [trainingClass, setTrainingClass] = useState(null);
  useEffect(() => {
    console.log("Loading class");

    getClassByID(trainingClassID)
      .then((trainingClass) => setTrainingClass(trainingClass))
      .catch((error) => console.log(error));
  }, []);

  const [activity, setActivity] = useState(null);
  useEffect(() => {
    if (trainingClass) {
      getByID(trainingClass.activity_id).then((activity) =>
        setActivity(activity)
      );
    }
  }, [trainingClass]);

  const [room, setRoom] = useState(null);
  useEffect(() => {
    if (trainingClass) {
      getRoomByID(trainingClass.room_id).then((room) => setRoom(room));
    }
  }, [trainingClass]);

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (trainingClass) {
      getUserByID(trainingClass.trainer_user_id).then((user) => setUser(user));
    }
  }, [trainingClass]);

  const [bookingModalVisible, setBookingModalVisible] = useState(false); // State variable for modal visibility

  const handleBooking = async () => {
    if (!trainingClass) return;

    const newBooking = {
      user_id: logged_in_user.id,
      class_id: trainingClass.id,
      created_datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
      activity_name: activity.name,
    };

    try {
      await createBooking(newBooking);
      setBookingModalVisible(true); // Show the booking modal
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  const closeBookingModal = () => {
    setBookingModalVisible(false); // Hide the booking modal
    navigate(`/bookings/${trainingClass.id}`);
  };

  return (
    <>
      <Nav />
      <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="rounded border-2 border-primary p-2">
          <h2 className="text-center">Class</h2>
          {trainingClass == null ? (
            <Spinner />
          ) : (
            <div className="stats stats-vertical w-full">
              <div className="stat">
                <div className="stat-title">Datetime</div>
                <div className="stat-value">
                  {new Date(trainingClass.datetime).toLocaleString()}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Trainer ID</div>
                <div className="stat-value">{trainingClass.trainer_user_id}</div>
              </div>
            </div>
          )}
        </div>
            <div className="rounded border-2 border-primary p-2">
                <h2 className="text-center">Trainer Info</h2>
                {user == null
                    ? <Spinner />
                    : <div className="stats stats-vertical w-full">
                        <div className="stat">
                            <div className="stat-title">First Name</div>
                            <div className="stat-value whitespace-normal">{user.firstname}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Last Name</div>
                            <div className="stat-value whitespace-normal">{user.lastname}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Role</div>
                            <div className="stat-value whitespace-normal">{user.role}</div>
                        </div>
                    </div>
                }
            </div>
            <button
                onClick={handleBooking}
                className="btn btn-primary btn-sm mt-2 w-3/12" 
            >Book Now
            </button>
            {/* <button onClick={()=> navigate("/bookings/")} className="btn btn-primary btn-sm">BOOK NOW</button> */}
        </div>
    </>
}
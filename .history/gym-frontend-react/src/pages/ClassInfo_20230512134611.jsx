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
  }, [trainingClassID]);

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
      getUserByID(trainingClass.trainer_user_id).then((user) =>
        setUser(user)
      );
    }
  }, [trainingClass]);

  const handleBooking = async () => {
    if (!trainingClass) return;

    const newBooking = {
      user_id: logged_in_user.id,
      class_id: trainingClass.id,
      created_datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      await createBooking(newBooking);
      navigate(`/bookings/${trainingClass.id}`);
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* ... */}

        <button
          onClick={handleBooking}
          className="btn btn-primary btn-sm mt-2 w-3/12

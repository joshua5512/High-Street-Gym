import { useEffect, useState } from "react";
import { getByID } from "../api/activities";
import { getByUserID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import Spinner from "./Spinner";
import { getUserByID } from "../api/user";
import { getTop } from "../api/trainingClasses";


export default function UserClasses({ userID, refreshDependency }) {
  const [trainingClasses, setTrainingClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTop(200).then(async (trainingClasses) => {
      const currentDateTime = new Date();

      const trainingClassesWithExtras = await Promise.all(
        trainingClasses.map(async (trainingClass) => {
          const activity = await getByID(trainingClass.activity_id);
          const room = await getRoomByID(trainingClass.room_id);
          const trainer = await getUserByID(trainingClass.trainer_user_id);
          const trainingClassDateTime = new Date(trainingClass.datetime);

          return Promise.resolve({
            id: trainingClass.id,
            date: trainingClassDateTime.toLocaleString(),
            trainer,
            activity,
            room,
            // Add a flag to check if the class is before the current time
            isBeforeCurrentTime: trainingClassDateTime < currentDateTime,
          });
        })
      );

      // Filter out the classes that are before the current time
      const filteredTrainingClasses = trainingClassesWithExtras.filter(
        (trainingClass) => !trainingClass.isBeforeCurrentTime
      );

      setTrainingClasses(filteredTrainingClasses);
    });
  }, []);

//   const filteredClasses = trainingClasses.filter((trainingClass) => {
//     const classDateTime = new Date(trainingClass.datetime);
//     const currentTime = new Date();
//     return classDateTime > currentTime;
//   });

  return loading ? (
    <Spinner />
  ) : (
    <table className="table table-compact w-full">
      <thead>
        <tr>
          <th>Activity</th>
          <th>Room</th>
          <th>Datetime</th>
          <th>Trainer</th>
        </tr>
      </thead>
      <tbody>
        {setTrainingClasses.map((trainingClass) => (
          <tr key={trainingClass.id}>
            <td>{trainingClass.activity.name}</td>
            <td>{trainingClass.room.number}</td>
            <td>{trainingClass.date}</td>
            <td>
              {trainingClass.user.firstname} {trainingClass.user.lastname}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getByID } from "../api/activities";
import { getTop } from "../api/trainingClasses";
import { getByUserID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
// import { getTop } from "../api/trainingClasses";

export default function UserClasses({ user, refreshDependency }) {
    const navigate = useNavigate();
  
    const [trainingClasses, setTrainingClasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
  
    useEffect(() => {
        if (user.role === 'admin') {
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
          } else {
      getByUserID(user.id).then(async (trainingClasses) => {
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
    }
    }, [user, refreshDependency]); 

  // Filter training classes by search query
  const filteredTrainingClasses = trainingClasses.filter((trainingClass) =>
    trainingClass.activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container p-2 mx-auto">

          {trainingClasses.length == 0 ? (
            <Spinner />
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Room</th>
                  <th>Datetime</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainingClasses.map((trainingClass) => (
                  <tr key={trainingClass.id}>
                    <td>{trainingClass.activity.name}</td>
                    <td>{trainingClass.trainer.name}</td>
                    <td>{trainingClass.room.number}</td>
                    <td>{trainingClass.date}</td>

                    <td>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

    </>)
}

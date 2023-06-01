import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getByID } from "../api/activities";
import { getTop } from "../api/trainingClasses";
import { getByUserID } from "../api/trainingClasses";
import { getRoomByID } from "../api/rooms";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";

export default function Classes() {
  const navigate = useNavigate();

  const [trainingClasses, setTrainingClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter training classes by search query
  const filteredTrainingClasses = trainingClasses.filter((trainingClass) =>
    trainingClass.activity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
  <Nav />
  <div className="container p-2 mx-auto">
    <div className="rounded border-2 border-primary p-2 w-full">
      <div className="mb-2">
        <label htmlFor="search" className="block font-bold">
          Search:
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1 w-3/12"
        />
      </div>
      {trainingClasses.length === 0 ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="hidden md:table-header-group">
              <tr>
                <th>Activity</th>
                <th>Room</th>
                <th>Datetime</th>
                <th>Created by</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainingClasses.map((trainingClass) => (
                <tr key={trainingClass.id} className="md:table-row flex flex-col md:flex-row">
                  <td className="md:table-cell">
                    <div className="font-semibold md:hidden">Activity:</div> 
                    {trainingClass.activity.name}
                  </td>
                  <td className="md:table-cell">
                    <div className="font-semibold md:hidden">Room:</div> 
                    {trainingClass.room.number}
                  </td>
                  <td className="md:table-cell">
                    <div className="font-semibold md:hidden">Datetime:</div> 
                    {trainingClass.date}
                  </td>
                  <td className="md:table-cell">
                    <div className="font-semibold md:hidden">Created by:</div> 
                    {trainingClass.trainer.firstname +
                      " " +
                      trainingClass.trainer.lastname}
                  </td>
                  <td className="md:table-cell">
                    <div className="font-semibold md:hidden">Details:</div>
                    <button
                      onClick={() => navigate("/classes/" + trainingClass.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Details
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
)
}

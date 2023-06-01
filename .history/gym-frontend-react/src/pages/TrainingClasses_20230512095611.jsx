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
      const trainingClassesWithExtras = await Promise.all(
        trainingClasses.map(async (trainingClass) => {
          const activity = await getByID(trainingClass.activity_id);
          const room = await getRoomByID(trainingClass.room_id);
          const trainer = await getUserByID(trainingClass.trainer_user_id);

          return Promise.resolve({
            id: trainingClass.id,
            date: new Date(trainingClass.datetime).toLocaleString(),
            trainer,
            activity,
            room,
          });
        })
      );

      setTrainingClasses(trainingClassesWithExtras);
    });
  }, []);

  // Filter training classes by search query and current time
  const filteredTrainingClasses = trainingClasses.filter((trainingClass) => {
    const currentTime = new Date();
    const classTime = new Date(trainingClass.date);
    return (
      trainingClass.activity.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      classTime > currentTime
    );
  });

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
          {trainingClasses.length == 0 ? (
            <Spinner />
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Room</th>
                  <th>Datetime</th>
                  <th>Booked by</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainingClasses.map((trainingClass) => (
                  <tr key={trainingClass.id}>
                    <td>{trainingClass.activity.name}</td>
                    <td>{trainingClass.room.number}</td>
                    <td>{trainingClass.date}</td>

                    <td>
                      {trainingClass.trainer.firstname +
                        " " +
                        trainingClass.trainer.lastname}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          navigate("/classes/" + trainingClass.id)
                        }
                        className="btn btn-primary btn-sm"
                      >
                        Details
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
 
}
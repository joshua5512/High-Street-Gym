import { useState, useEffect } from "react";
import { getClassesByUserID } from "../api/trainingClasses";
import { useAuthentication } from "../hooks/authentication";
import Spinner from "./Spinner";

export default function UserClasses({ userID, refreshDependency }) {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user] = useAuthentication();

  useEffect(() => {
    setIsLoading(true);
    getClassesByUserID(userID)
      .then((classes) => {
        // Filter classes if user is a trainer
        if (user && user.role === "trainer") {
          classes = classes.filter(
            (trainingClass) => trainingClass.trainer_user_id === user.id
          );
        }
        setClasses(classes);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [userID, refreshDependency, user]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {classes.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Room</th>
                  <th>Datetime</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((trainingClass) => (
                  <tr key={trainingClass.id}>
                    <td>{trainingClass.activity.name}</td>
                    <td>{trainingClass.room.number}</td>
                    <td>{new Date(trainingClass.datetime).toLocaleString()}</td>
                    <td>
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
          ) : (
            <p>No classes found.</p>
          )}
        </>
      )}
    </>
  );
}

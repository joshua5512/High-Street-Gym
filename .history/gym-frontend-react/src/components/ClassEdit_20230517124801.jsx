import { useEffect, useState } from "react";
import { getAllClasses, deleteClass } from "../api/class";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import ClassEdit from "../components/ClassEdit";
import UserClasses from "../components/UserClasses";

export default function ClassEdit() {
  const [refreshTrigger, setRefreshTrigger] = useState();
  const [selectedClassID, setSelectedClassID] = useState(null);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    getAllClasses()
      .then(classes => {
        setClasses(classes)
      })
  }, [refreshTrigger])

  const handleDeleteClass = async (classID) => {
    try {
      await deleteClass(classID);
      setClasses((prevClasses) =>
        prevClasses.filter((class) => class.id !== classID)
      );
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  return <>
    <Nav />
    <div className="container mx-auto grid grid-cols-2 mt-16 gap-16">
      <div className="rounded-2xl border-2 border-primary p-2 ">
        <h2 className="text-center">Classes</h2>
        <div className="overflow-auto w-full">
          {classes == null
            ? <Spinner />
            : <table className="table table-compact w-full overflow-scroll">
                <thead>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Select</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  {classes.map(class =>
                    <tr key={class.id}>
                      <td>{class.name}</td>
                      <td>{class.description}</td>
                      <td>
                        <button
                          className="btn btn-info btn-xs mt-1"
                          onClick={() => setSelectedClassID(class.id)}
                        >Edit</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-xs mt-1"
                          onClick={() => handleDeleteClass(class.id)}
                        >Delete</button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
          }
        </div>
      </div>
      <div className="rounded-2xl border-2 border-primary p-2">
        <h2>Select or Create a Class</h2>
        <ClassEdit
          classID={selectedClassID}
          onSave={() => setRefreshTrigger({})}
        />
      </div>
    </div >
  </>
}

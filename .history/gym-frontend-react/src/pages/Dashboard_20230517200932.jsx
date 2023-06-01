import { useState } from "react"
import Nav from "../components/Nav"
import { ClassAdd } from "../components/ClassAdd"
import Spinner from "../components/Spinner"
import UserEdit from "../components/UserEdit"
import UserClasses from "../components/UserClasses"
import { useAuthentication } from "../hooks/authentication"
import ClassEdit from "../components/ClassEdit";


function Dashboard() {
    const [user] = useAuthentication()
    const [refreshTrigger, setRefreshTrigger] = useState()
    const [selectedClassID, setSelectedClassID] = useState(null)

    


    return (
        <>
          <Nav />
          {user ? (
            <div
              className={`container p-2 mt-16 mx-auto grid grid-cols-1 ${
                user.role === "admin" || user.role === "trainer"
                  ? "md:grid-cols-2"
                  : "md:grid-cols-1"
              } gap-16`}
            >
              {user && (user.role === "admin" || user.role === "trainer") && (
                <div className="rounded-2xl border-2 border-primary md:col-start-1 min-h-16 p-2">
                  <h2 className="text-center">
                    {selectedClassID ? "Edit Class" : "Add Class"}
                  </h2>
                  {selectedClassID ? (
                    <ClassEdit
                      classID={selectedClassID}
                      onSaved={() => {
                        setRefreshTrigger({});
                        setSelectedClassID(null);
                      }}
                    />
                  ) : (
                    <ClassAdd currentUser={user} onAdded={() => setRefreshTrigger({})} />
                  )}
                </div>
              )}
              <div className="rounded-2xl border-2 border-primary md:col-start-2 md:row-start-1 row-end-3 p-2">
                <h2 className="text-center">My classes</h2>
                <div className="overflow-x-auto">
                  <UserClasses
                    user={user}
                    refreshDependency={refreshTrigger}
                    onClassSelected={setSelectedClassID}
                  />
                </div>
              </div>
              {/* ... */}
            </div>
          ) : (
            <Spinner />
          )}
        </>
      );

}

export default Dashboard
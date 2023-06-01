import { useState } from "react"
import Nav from "../components/Nav"
import { ClassAdd } from "../components/ClassAdd"
import Spinner from "../components/Spinner"
import UserEdit from "../components/UserEdit"
import UserClasses from "../components/UserClasses"
import { useAuthentication } from "../hooks/authentication"

function Dashboard() {
    const [user] = useAuthentication()

    const [refreshTrigger, setRefreshTrigger] = useState()

    return <>
    <Nav />
    {user ?
        <div className={`container p-2 mt-16 mx-auto grid grid-cols-1 ${user.role === "admin" || user.role === "trainer" ? "md:grid-cols-2" : "md:grid-cols-1"} gap-4`}>
            {user && (user.role === "admin" || user.role === "trainer") &&
                <div className="rounded-2xl border-2 border-primary md:col-start-1 min-h-16 p-2">
                    <h2 className="text-center">Add Class</h2>
                    <ClassAdd currentUser={user} onAdded={() => setRefreshTrigger({})} />
                </div>
            }
            {user && (user.role === "admin" || user.role === "trainer") &&
                <div className="rounded-2xl border-2 border-primary md:col-start-2 md:row-start-1 row-end-3 p-2">
                    <h2 className="text-center">My classes</h2>
                    <div className="overflow-x-auto">
                        <UserClasses userID={user.id} refreshDependency={refreshTrigger} />
                    </div>
                </div>
            }
            <div className={`rounded-2xl border-2 w-full border-primary ${user.role === "admin" || user.role === "trainer" ? "md:col-start-1" : "md:col-start-1 mx-auto"} min-h-16 p-2`}>
                <h2 className="text-center">My Account</h2>
                {/* User details form with update button here */}
                <UserEdit userID={user.id} allowEditRole={user.role === "admin"} />
            </div>
        </div>
        :
        <Spinner />
    }
</>

}

export default Dashboard
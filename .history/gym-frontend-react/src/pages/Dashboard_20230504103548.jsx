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
        {/* {user ? */}
        
            <div className="container p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
            {
                <div className="rounded border-2 border-primary md:col-start-1 min-h-16 p-2">
                    <h2 className="text-center">Add Class</h2>
                    <ClassAdd onAdded={() => setRefreshTrigger({})} />
                </div>
            }
                <div className="rounded border-2 border-primary md:col-start-1 min-h-16 p-2">
                    <h2 className="text-center">My Account</h2>
                    {/* User details form with update button here */}
                    <UserEdit userID={user.id} allowEditRole={user.role == "admin"} />
                </div>
                <div className="rounded border-2 border-primary md:col-start-2 md:row-start-1 row-end-3 p-2">
                    <h2 className="text-center">My classes</h2>
                    <div className="overflow-x-auto">
                        <UserClasses userID={user.id} refreshDependency={refreshTrigger} />
                    </div>
                </div>
            </div>
            {/* :
            <Spinner />
        } */}
    </>
}

export default Dashboard
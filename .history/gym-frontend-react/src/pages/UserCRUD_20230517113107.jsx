import { useEffect, useState } from "react"
import { getAllUsers } from "../api/user"
import Nav from "../components/Nav"
import Spinner from "../components/Spinner"
import UserEdit from "../components/UserEdit"

export default function UserCRUD() {
    const [refreshTrigger, setRefreshTrigger] = useState()
    const [selectedUserID, setSelectedUserID] = useState(null)
    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()
            .then(users => {
                setUsers(users)
            })
    }, [refreshTrigger])

    return <>
    <Nav />
    <div className="container mx-auto grid grid-cols-2 mt-16 gap-16">
        <div className="rounded-2xl border-2 border-primary p-2 ">
            <h2 className="text-center">Users</h2>

            <div className="overflow-auto w-full">
                {users == null
                    ? <Spinner />
                    : <table className="table table-compact w-full overflow-scroll">
                        <thead>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Select</th>
                            <th>Delete</th>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <tr key={user.id}>
                                    <td>{user.firstname} {user.lastname}</td>
                                    <td>{user.role}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-xs mt-1"
                                            onClick={() => setSelectedUserID(user.id)}
                                        >Edit</button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-xs mt-1"
                                            onClick={() => removeUser(user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                }
            </div>
        </div>
        <div className="rounded-2xl border-2 border-primary p-2">
            <h2>Select or Create a User</h2>
            <UserEdit
                userID={selectedUserID}
                onSave={() => setRefreshTrigger({})}
                allowEditRole={true} />
        </div>
    </div >
</>

} 
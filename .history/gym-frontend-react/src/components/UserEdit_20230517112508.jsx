import { useEffect, useState } from "react"
import { getUserByID, update, deleteUser } from "../api/user"
import { createUser } from "../api/user"

export default function UserEdit({ userID, onSave, allowEditRole }) {
    const [formData, setFormData] = useState({
        id: null,
        firstname: "",
        lastname: "",
        role: "",
        phone:"",
        email: "",
        password: "",
        address:"",
        authenticationKey: null,
    })
    const [statusMessage, setStatusMessage] = useState("")

    // in UserEdit component
    useEffect(() => {
        if (userID) {
            getUserByID(userID).then(user => {
                setFormData(user)
            })
        } else {
            setFormData({
                id: null,
                firstname: "",
                lastname: "",
                role: "",
                phone:"",
                email: "",
                password: "",
                address:"",
                authenticationKey: null,
            })
        }
    }, [userID])

    function deleteUser(e) {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            deleteUser(formData.id).then(result => {
                setStatusMessage(result.message);
                if (typeof onSave === "function") {
                    onSave();
                }
            });
        }
    }

    function saveUser(e) {
        e.preventDefault()
        setStatusMessage("Saving...")
        const action = userID ? update : createUser
        action(formData).then(result => {
            setStatusMessage(result.message)
            if (typeof onSave === "function") {
                onSave()
            }
        })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={saveUser} >
        <div className="my-2">
                <button className="btn btn-primary mr-2">Save</button>
                {allowEditRole && userID && (
                    <button className="btn btn-danger mr-2" onClick={removeUser}>Delete</button>
                )}
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Jane"
                    className="input input-bordered w-full"
                    value={formData.firstname}
                    onChange={(e) => setFormData(existing => { return { ...existing, firstname: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                    value={formData.lastname}
                    onChange={(e) => setFormData(existing => { return { ...existing, lastname: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Role</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.role}
                    onChange={(e) => setFormData(existing => { return { ...existing, role: e.target.value } })}
                    disabled={!allowEditRole}
                >
                    <option disabled selected>Pick one</option>
                    <option value="admin">Admin</option>
                    <option value="trainer">Trainer</option>
                    <option value="member">Member</option>
                </select>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Phone</span>
                </label>
                <input
                    type="number"
                    placeholder="04"
                    className="input input-bordered w-full"
                    value={formData.phone}
                    onChange={(e) => setFormData(existing => { return { ...existing, phone: e.target.value } })}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="user@server.tld"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={(e) => setFormData(existing => { return { ...existing, email: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    value={formData.password}
                    onChange={(e) => setFormData(existing => { return { ...existing, password: e.target.value } })}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full"
                    value={formData.address}
                    onChange={(e) => setFormData(existing => { return { ...existing, address: e.target.value } })}
                />
            </div>

            <div className="my-2">
                <button className="btn btn-primary mr-2" >Save</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
      
            
        </form>
    </div>
}
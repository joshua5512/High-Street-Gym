import { useEffect, useState } from "react"
import { getUserByID, update } from "../api/user"

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

    // const [firstname, setFirstname] = useState("")
    // const [lastname, setLastname] = useState("")
    // const [role, setRole] = useState("")
    // const [phone, setPhone] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [address, setAddress] = useState("")

    // const createUser = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const newUser = {

    //             firstname,
    //             lastname,
    //             role,
    //             phone,
    //             email,
    //             password,
    //             address
    //         }
    //         const response = await registerUser(newUser);
    //         setStatusMessage("User created successfully");
    //     } catch (error) {
    //         setStatusMessage("Failed to create user: " + error.message);
    //     }
    // };

    useEffect(() => {
        if (userID) {
            getUserByID(userID).then(user => {
                setFormData(user)
            })
        }
    }, [userID])

    function saveUser(e) {
        e.preventDefault()
        setStatusMessage("Saving...")
        update(formData).then(result => {
            setStatusMessage(result.message)

            if (typeof onSave === "function") {
                onSave()
            }
        })
    }

    return <div>
        <form className="flex-grow m-4 max-w-2xl" onSubmit={saveUser} >
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

             {/* <div>
            <h2>Create New User</h2>
            <form onSubmit={createUser}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                {/* Add other fields according to your user data structure */}
                <button type="submit">Create</button>
            </form>
            <label className="label">
                <span className="label-text-alt">{statusMessage}</span>
            </label>
        </div> */}
    );
            
        </form>
    </div>
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import { registerUser } from "../api/user"

export default function Register() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
    })

    function onRegisterSubmit(e) {
        e.preventDefault()
        setStatusMessage("Registering...")

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        // Register then attempt login
        registerUser(formData)
            .then(result => {
                setStatusMessage(result.message)
                login(formData.email, formData.password)
                    .then(result => {
                        setStatusMessage(result.message)
                        navigate("/dashboard")
                    })
                    .catch(error => {
                        setStatusMessage("Login failed: " + error)
                    })
            })
    }

    return <div className="flex justify-evenly items-center w-full">
        <form className="flex-grow m-4 max-w-lg" onSubmit={onRegisterSubmit}>
            <h1 className="text-4xl text-center mb-8">High Street Gym</h1>
            <h2 className="text-3xl text-center mb-8">Register Membership</h2>

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
                    <span className="label-text">First Name:</span>
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
                <label className="hua">
                    <span className="label-text">Last Name:</span>
                </label>
                <input
                    type="text"
                    placeholder="wei"
                    className="input input-bordered w-full"
                    value={formData.lastname}
                    onChange={(e) => setFormData(existing => { return { ...existing, lastname: e.target.value } })}
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
                <button className="btn btn-primary mr-2" >Register</button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}>Back</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTop } from "../api/trainingClasses"
import { useAuthentication } from "../hooks/authentication"
import { getByID } from "../api/activities"
import { getRoomByID } from "../api/rooms"
import Spinner from "../components/Spinner"

function Login() {
    
    const navigate = useNavigate()
    const [user, login, logout] = useAuthentication()
    const [statusMessage, setStatusMessage] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function onLoginSubmit(e) {
        e.preventDefault()
        setStatusMessage("Logging in...")

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        login(formData.email, formData.password)
            .then(result => {
                setStatusMessage("Login successful!")
                navigate("/dashboard")
            })
            .catch(error => {
                setStatusMessage("Login failed: " + error)
            }
        )
    }


    const [trainingClasses, setTrainingClasses] = useState(TrainingClass)

    useEffect(() => {
        getTop(5).then(async trainingClasses => {
       
            const trainingClassesWithExtras = await Promise.all(trainingClasses.map(async trainingClass => {
                const room = await getRoomByID(trainingClass.room_id)
                const activity = await getByID(trainingClass.activity_id)

                return Promise.resolve({
                    id: trainingClass.id,
                    datetime: new Date(trainingClass.datetime).toLocaleString(),                 
                    room,
                    activity,
                })
            }))

            setTrainingClasses(trainingClassesWithExtras)
        })
    }, [])

    return <div 
        className="flex justify-evenly items-center w-full"
        style={{ 
            backgroundImage: `../imgs/background.jpg` 
          }}
        >
     
        <div className="flex-grow-[3] max-w-4xl m-4 hidden md:block">
            {trainingClasses.length == 0
                ? <Spinner />
                : <div>
                    <h2 className="text-4xl text-center mb-8">Featured Activities</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Room</th>
                                <th>Datetime</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {trainingClasses.map(trainingClass =>
                                <tr key={trainingClass.id}>
                                    <td>{trainingClass.activity.name}</td>
                                    <td>{trainingClass.room.number}</td>
                                    <td>{trainingClass.datetime}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
        
        <div className="divider divider-horizontal h-screen mx-0 hidden md:flex"></div>
        <form className="flex-grow m-4 max-w-lg" onSubmit={onLoginSubmit}>
            <h2 className="text-4xl text-center mb-8">High Street Gym</h2>
            <h2 className="text-3xl text-center mb-8">Login</h2>
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
            <div className="my-2">
                <button className="btn btn-primary mr-2" >Login</button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/register")}>Sign up</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
            <div>
                {/* This section is included for debugging and development purposes */}
                <h2>Default users</h2>
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>email</th>
                            <th>password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>admin</td>
                            <td>hua@live.com</td>
                            <td>password</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("hua@live.com", "password")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td>trainer</td>
                            <td>rob@live.com</td>
                            <td>password</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("rob@live.com", "password")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td>member</td>
                            <td>ross@live.com</td>
                            <td>password</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("ross@live.com", "password")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>    
    </div>   
}

export default Login
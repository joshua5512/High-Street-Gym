import { useEffect, useState } from "react";
import { getClassByID, updateClass } from "../api/trainingClasses";
import { getAll } from "../api/activities";
import { getAllRooms } from "../api/rooms";
import { getAllUsers } from "../api/user";
import { useAuthentication } from "../hooks/authentication";

export default function ClassEdit({ currentUser, classID, onSaved }) {
  const [user]= useAuthentication()
  const authKey = user && user.authenticationKey;

  const [formData, setFormData] = useState({
    activity_id: "",
    room_id: "",
    datetime: "",
    trainer_user_id: ""
})
  

  const [classData, setClassData] = useState({});
  const [activities, setActivities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getClassByID(classID).then((classData)=>{
      if (classData.datetime) {
        const date = new Date(classData.datetime);
        classData.datetime = date.toISOString().substring(0, 16);
      }
      setClassData(classData);
    });

    getAll().then(activities => setActivities(activities));
    getAllRooms().then(rooms => setRooms(rooms));
    if (authKey) {
        getAllUsers(authKey).then(users => setUsers(users));
    }

}, [classID, authKey]);


  useEffect(() => {
    if (users && currentUser) {
      const filteredTrainers = users.filter(user => user.role === 'trainer' && user.id === currentUser.id);
      setTrainers(filteredTrainers);
    }
}, [users, currentUser]);


  function handleInputChange(event) {
    const { name, value } = event.target;
    setClassData(prevData => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // updateClass({
    //     id: classID,
    //     ...classData,
    //     activity_id: String(classData.activity_id),
    //     room_id: String(classData.room_id),
    //     trainer_user_id: String(classData.trainer_user_id),
    // }).then(() => {
    //   if (onSaved) onSaved();
    // });
    const trainingClassData = {
      ...formData,
      trainer_user_id: formData.trainer_user_id, // Set the trainer_user_id to the selected value from the form
      };
    updateClass(trainingClassData)
        .then((result) => {
            setStatusMessage(result.message);
            setFormData({
            activity_id: "",
            room_id: "",
            datetime: "",
            trainer_user_id: "",
            });
    
            if (typeof onAdded === "function") {
            onAdded();
            }
        })
        .catch((error) => {
            console.error("Failed to create class:", error);
            setStatusMessage("Failed to create class. Please try again.");
        });
}




  return (
    <form className="flex-grow m-4 max-w-2xl"  onSubmit={handleSubmit}>
      <div className="form-control">
                <label className="label">
                    <span className="label-text">Activity</span>
                </label>
        <select
          name="activity_id"
          className="select select-bordered"
          value={classData.activity_id || ''}
          onChange={handleInputChange}
        >
          <option>Pick one</option>
          {activities.map(activity => <option key={activity.id} value={activity.id}>{activity.name}</option>)}
        </select>
      </div>

      <div className="form-control">
                <label className="label">
                    <span className="label-text">Room</span>
                </label>
        <select
          name="room_id"
          className="select select-bordered"
          value={classData.room_id || '1'}
          onChange={handleInputChange}
        >
          <option>Pick one</option>
          {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
          
        </select>
      </div>
      

      <div className="form-control">
                <label className="label">
                    <span className="label-text">Datetime</span>
                </label>
        <input
          type="datetime-local"
          name="datetime"
          className="select select-bordered"
          value={classData.datetime && classData.datetime || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
                <label className="label">
                    <span className="label-text">Trainer</span>
                </label>
        <select
          name="trainer_user_id"
          className="select select-bordered"
          value={classData.trainer_user_id || ''}
          onChange={handleInputChange}
        >
          <option>Pick Trainer</option>
          {trainers.map(trainer => <option key={trainer.id} value={trainer.id}>{trainer.firstname} {trainer.lastname}</option>)}
        </select>
      </div>
      <button type="submit" className="btn btn-primary mr-2">Save</button>
    </form>
  );
}
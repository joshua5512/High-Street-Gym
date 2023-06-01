import { useEffect, useState } from "react";
import { getClassByID, updateClass } from "../api/trainingClasses";
import { getAll } from "../api/activities";
import { getAllRooms } from "../api/rooms";
import { getAllUsers } from "../api/user";

export default function ClassEdit({ classID, onSaved }) {
  const [classData, setClassData] = useState({});
  const [activities, setActivities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getClassByID(classID).then(setClassData);
    getAll().then(activities => setActivities(activities));
    getAllRooms().then(rooms => setRooms(rooms));
    getAllUsers().then(users => setUsers(users));
  }, [classID]);

  useEffect(() => {
    const filteredTrainers = users.filter(user => user.role === 'trainer');
    setTrainers(filteredTrainers);
  }, [users]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setClassData(prevData => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateClass(classID, classData).then(() => {
      alert('Class updated successfully!');
      if (onSaved) onSaved();
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
          value={classData.activity_id || ''}
          onChange={handleInputChange}
        >
          <option>Pick one</option>
          {activities.map(activity => <option key={activity.id} value={activity.id}>{activity.name} - {activity.description}-{activity.duration}</option>)}
        </select>
      </div>

      
      <label>
        Room:
        <select
          name="room_id"
          value={classData.room_id || ''}
          onChange={handleInputChange}
        >
          <option>Pick one</option>
          {rooms.map(room => <option key={room.id} value={room.id}>{room.number}</option>)}
        </select>
      </label>
      <label>
        DateTime:
        <input
          type="datetime-local"
          name="datetime"
          value={classData.datetime || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Trainer:
        <select
          name="trainer_user_id"
          value={classData.trainer_user_id || ''}
          onChange={handleInputChange}
        >
          <option>Pick Trainer</option>
          {trainers.map(trainer => <option key={trainer.id} value={trainer.id}>{trainer.firstname} {trainer.lastname}</option>)}
        </select>
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

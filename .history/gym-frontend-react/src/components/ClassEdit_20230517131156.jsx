import { useEffect, useState } from "react";
import { getClassByID, updateClass } from "../api/trainingClasses";

export default function ClassEdit({ classID, onSaved }) {
  const [classData, setClassData] = useState({});

  useEffect(() => {
    getClassByID(classID).then(setClassData);
  }, [classID]);

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
    <form onSubmit={handleSubmit}>
      <label>
        Activity:
        <input
          type="text"
          name="activity_id"
          value={classData.activity_id || ''}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Room:
        <input
          type="text"
          name="room_id"
          value={classData.room_id || ''}
          onChange={handleInputChange}
        />
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
        <input
          type="text"
          name="trainer_user_id"
          value={classData.trainer_user_id || ''}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

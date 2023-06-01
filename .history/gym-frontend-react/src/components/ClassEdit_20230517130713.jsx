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
        Class Name:
        <input
          type="text"
          name="name"
          value={classData.name || ''}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}

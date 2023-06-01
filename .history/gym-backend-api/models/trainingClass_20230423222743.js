import { db } from "../database/mysql.js";

export function TrainingClass(id, datetime, room_id, activity_id, trainer_user_id) {
  return {
      id,
      datetime,
      room_id, 
      activity_id, 
      trainer_user_id
  }
}



export async function getAll() {
    const [allTrainingClassesResults] = await db.query("SELECT * FROM training_classes")

    return await allTrainingClassesResults.map((trainingClassResult) =>
        TrainingClass(trainingClassResult.id, trainingClassResult.datetime,trainingClassResult.room_id, trainingClassResult.activity_id, trainingClassResult.trainer_user_id))
}

export async function getTop(amount) {
    const [allTrainingClassesResults] = await db.query(
        "SELECT * FROM training_classes ORDER BY datetime DESC LIMIT ?",
        [amount]
    )

    return await allTrainingClassesResults.map((trainingClassResult) =>
    TrainingClass(trainingClassResult.id, trainingClassResult.datetime,trainingClassResult.room_id, trainingClassResult.activity_id, trainingClassResult.trainer_user_id))
}

export async function getUserClasses(userID) {
  
    const [trainingClassesResults] = await db.query(
        "SELECT * FROM training_classes WHERE trainer_user_id = ?", userID
    )
 
    return await trainingClassesResults.map((trainingClassResult) =>
        TrainingClass(trainingClassResult.id, trainingClassResult.datetime,trainingClassResult.room_id, trainingClassResult.activity_id, trainingClassResult.trainer_user_id))
}

export async function getClassByID(trainingClassID) {

    const [trainingClassesResults] = await db.query(
        "SELECT * FROM training_classes WHERE id = ?", trainingClassID
    )

    if (trainingClassesResults.length > 0) {
        const trainingClassResult = trainingClassesResults[0];
        return Promise.resolve(
            TrainingClass(trainingClassResult.id, trainingClassResult.datetime,trainingClassResult.room_id, trainingClassResult.activity_id, trainingClassResult.trainer_user_id)
        )
    } else {
        return Promise.reject("no results found")
    }
}

export async function create(trainingClass) {
    delete trainingClass.id
    return db.query(
        "INSERT INTO training_classes (datetime, room_id, activity_id, trainer_user_id) VALUES (?,?,?,?)",
        [trainingClass.datetime,trainingClass.user_id, trainingClass.activity_id, trainingClass.trainer_user_id]
    ).then(([result]) => {
    
        return { ...trainingClass, id: result.insertId }
    })
}

export async function update(trainingClass) {
    return db.query(
        "UPDATE training_classes SET (datetime, room_id, activity_id, trainer_user_id) VALUES (?,?,?,?)",
        [trainingClass.datetime,trainingClass.user_id, trainingClass.activity_id, trainingClass.trainer_user_id]
    )
}

export async function deleteByID(trainingClassID) {
    return db.query("DELETE FROM training_classes WHERE id = ?", trainingClassID)
}
import { db } from "../database/mysql.js";

export function Activity(id, name,
  description,
  duration_minutes) {
  return {
      id,
      name,
      description,
      duration_minutes
  }
}

export async function getAll() {
    // Get the collection of all activitiess
    const [allActivitiesResults] = await db.query("SELECT * FROM activities")
    // Convert the collection of results into a list of Sighting objects
    return await allActivitiesResults.map((activityResult) =>
        Activity(
            activityResult.id,
            activityResult.name,
            activityResult.description,
            activityResult.duration_minutes,
        ))
}


export async function getByID(activityID) {
    // Get the collection of all activities with matching ID
    const [activitiesResults] = await db.query(
        "SELECT * FROM activities WHERE id = ?", activityID
    )
    // Convert the result into a Activity object
    if (activitiesResults.length > 0) {
        const activityResult = activitiesResults[0];
        return Promise.resolve(
            Activity(
                activityResult.id,
                activityResult.name,
                activityResult.description,
                activityResult.duration_minutes,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}


export async function getyUserID(userID) {
    // Get the collection of all activities with matching ID
    const [activitiesResults] = await db.query(
        "SELECT * FROM activities WHERE id = ?", userID
    )
    // Convert the result into a Activity object
    if (activitiesResults.length > 0) {
        const activityResult = activitiesResults[0];
        return Promise.resolve(
            Activity(
                activityResult.id,
                activityResult.name,
                activityResult.description,
                activityResult.duration_minutes,
            )
        )
    } else {
        return Promise.reject("no results found")
    }
}
export async function create(activity) {

    delete activity.id

    return db.query(
        "INSERT INTO activities (name, description, duration_minutes) VALUES (?, ?, ?)",
        [activity.name, activity.description, activity.duration_minutes]
    ).then(([result]) => {

        return { ...activity, id: result.insertId }
    })
}

export async function update(activity) {
    return db.query(
        "UPDATE activities SET name = ?, description=?, duration_minutes=? WHERE id = ?",
        [activity.name, activity.id]
    )
}

export async function deleteByID(activityID) {
    return db.query("DELETE FROM activities WHERE id = ?", activityID)
}
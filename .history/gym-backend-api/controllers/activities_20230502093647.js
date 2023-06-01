import { Router } from "express";
import auth from "../middleware/auth.js"
import { validate } from "../middleware/validator.js";
import xml2js from "xml2js"
import models from "../models/model.js"
import { Activity } from "../models/activity.js";

const activityController = Router()

//// Get sighting list endpoint
const getActivityListSchema = {
    type: "object",
    properties: {}
}

activityController.get("/activities", validate({ body: getActivityListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all activities'

    const activities = await models.activityModel.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all activities",
        activities: activities,
    })
})


const getActivityByUserIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

activityController.get(
    "/activities/user-id/:id",
    validate({ params: getActivityByUserIDSchema }),
    async (req, res) => {
        // #swagger.summary = 'Get all activities by a user ID'
        const userID = req.params.id

        const activities = await models.activityModel.getByUserID(userID)

        res.status(200).json({
            status: 200,
            message: "Get all activities by user ID",
            activities: activities,
        })
    })

const getActivityByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

activityController.get("/activities/:id", validate({ params: getActivityByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific activity by ID'
    const activityID = req.params.id

    models.activityModel.getByID(activityID).then(activity => {
        res.status(200).json({
            status: 200,
            message: "Get activity by ID",
            activity: activity
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get activity by ID",
        })
    })
})


const createActivitySchema = {
    type: "object",
    required: [ "name", "description", "duration_minutes"],
    properties: {
        name: {
            type: "string"
        },
        description: {
            type: "string"
        },
        duration_minutes: {
            type: "string"
        }
    }
}

activityController.post("/activities/", validate({ body: createActivitySchema }), (req, res) => {
    // #swagger.summary = 'Create a specific activity'
    // Get the activity data out of the request
    const activityData = req.body

    // Convert the activity data into an activity model object
    const activity = Activity(
        null,
        activityData.name,
        activityData.description,
        activityData.duration_minutes
    )

    // Use the create model function to insert this activity into the DB
    models.activityModel.create(activity).then(activity => {
        res.status(200).json({
            status: 200,
            message: "Created activity",
            activity: activity,
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: error,
        })
    })
})

const deleteActivitySchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
    }
}

activityController.delete("/activities/", validate({ body: deleteActivitySchema }), (req, res) => {
    // #swagger.summary = 'Delete a specific activity by id'
    const activityID = req.body.id

    res.status(200).json({
        status: 200,
        message: "Delete activity by ID - Not yet implemented",
    })
})

// XML upload
activityController.post("/activities/upload/xml", 
// auth(["admin", "trainer"]), 
(req, res) => {
    if (req.files && req.files["xml-file"]) {
        // Access the XML file as a string
        const XMLFile = req.files["xml-file"]
        const file_text = XMLFile.data.toString()

        // Set up XML parser
        const parser = new xml2js.Parser();
        parser.parseStringPromise(file_text)
            .then(data => {
                const activityUpload = data["activity-upload"]
                const activityUploadAttributes = activityUpload["$"]
                const operation = activityUploadAttributes["operation"]
                // Slightly painful indexing to reach nested children
                const activitiesData = activityUpload["activities"][0]["activity"]

                if (operation == "insert") {
                    Promise.all(activitiesData.map((activityData) => {
                        // Convert the xml object into a model object
                        const activityModel = Activity(null, activityData.name.toString(), activityData)
                        // Return the promise of each creation query
                        return models.activityModel.create(activityModel)
                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload insert successful",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML upload failed on database operation - " + error,
                        })
                    })
                } else if (operation == "update") {
                    Promise.all(activitiesData.map((activityData) => {
                        // Convert the xml object into a model object
                        const activityModel = Activity(
                            activityData.id.toString(),
                            activityData.name.toString()
                        )
                        // Return the promise of each creation query
                        return models.activityModel.update(activityModel)
                    })).then(results => {
                        res.status(200).json({
                            status: 200,
                            message: "XML Upload update successful",
                        })
                    }).catch(error => {
                        res.status(500).json({
                            status: 500,
                            message: "XML upload failed on database operation - " + error,
                        })
                    })

                } else {
                    res.status(400).json({
                        status: 400,
                        message: "XML Contains invalid operation attribute value",
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    status: 500,
                    message: "Error parsing XML - " + error,
                })
            })


    } else {
        res.status(400).json({
            status: 400,
            message: "No file selected",
        })
    }
})

export default activityController
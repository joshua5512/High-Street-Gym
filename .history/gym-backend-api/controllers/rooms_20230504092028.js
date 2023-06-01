import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { Room } from "../models/room.js";
import models from "../models/model.js"
import auth from "../middleware/auth.js";

const roomController = Router()

const getRoomListSchema = {
    type: "object",
    properties: {}
}

roomController.get("/rooms", validate({ body: getRoomListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all rooms'

    const rooms = await models.roomModel.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all rooms",
        rooms: rooms,
    })
})



// const createRoomSchema = {
//     type: "object",
//     required: ["location", "number"],
//     properties: {
//         location: {
//           type: "string"
//         },
//         number:{
//           type:"string"
//         }
//     }
// }

roomController.post("/rooms/", 
// validate({ body: createRoomSchema }), 
(req, res) => {
    // #swagger.summary = 'Create a specific room'
    /* #swagger.requestBody = {
            description: 'Add a new room',
            content: {
                'application/json': {
                    schema: {
                        location: 'string',
                        number:"string"
                    },
                    example: {
                        location: '1 Brisbane St',
                        number:"G2010"
                    }
                }
            }
            
        } 
    */
    // Get the room data out of the request
    const roomData = req.body


    const room = Room(null, roomData.location,roomData.number)

  
    models.roomModel.create(room).then(room => {
        res.status(200).json({
            status: 200,
            message: "Created a room",
            room: room,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to created a room",
        })
    })
})

const updateRoomSchema = {
    type: "object",
    required: ["id","location", "number"],
    properties: {
        id: {
            type: "number"
        },
        location: {
          type: "string"
        },
        number:{
          type:"number"
        }
    }
}

roomController.patch("/rooms/", validate({ body: updateRoomSchema }), (req, res) => {
    // #swagger.summary = 'Update a specific room by ID'
    const room = req.body

    res.status(200).json({
        status: 200,
        message: "Update a room by ID",
    })
})

const deleteRoomSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
    }
}

roomController.delete("/rooms/", validate({ body: deleteRoomSchema }), (req, res) => {
    // #swagger.summary = 'Delete a specificroom by id'
    const roomID = req.body.id

    res.status(200).json({
        status: 200,
        message: "Delete a room by ID ",
    })
})

// XML upload
roomController.post("/rooms/upload/xml", 
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
                const roomUpload = data["room-upload"]
                const roomUploadAttributes = roomUpload["$"]
                const operation = roomUploadAttributes["operation"]
                // Slightly painful indexing to reach nested children
                const roomsData = roomUpload["rooms"][0]["room"]

                if (operation == "insert") {
                    Promise.all(roomsData.map((roomData) => {
                        // Convert the xml object into a model object
                        const roomModel = Room(null, roomData.location.toString(), roomData.number.toString())
                        // Return the promise of each creation query
                        return models.roomModel.create(roomModel)
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
                    Promise.all(roomsData.map((roomData) => {
                        // Convert the xml object into a model object
                        const roomModel = Activity(
                            roomData.id.toString(),
                            roomData.location.toString(),
                            roomData.number.toString()
                        )
                        // Return the promise of each creation query
                        return models.roomModel.update(roomModel)
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

const getRoomByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

roomController.get("/rooms/:id", validate({ params: getRoomByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific room by ID'
    const roomID = req.params.id

    models.roomModel.getByID(roomID).then(room => {
        res.status(200).json({
            status: 200,
            message: "Get a room by ID",
            room: room
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get a room by ID",
        })
    })
})

export default roomController
import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { TrainingClass } from "../models/trainingClass.js";
import models from "../models/model.js"
import auth from "../middleware/auth.js";

const classController = Router()
const getClassListSchema = {
    type: "object",
    properties: {}
}

classController.get("/classes", 

validate({ body: getClassListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all classes'

    const trainingClasses = await models.classModel.getAll()
    res.status(200).json({
        status: 200,
        message: "Get all classes",
        trainingClasses: trainingClasses,
    })
})

const getTopClassesListSchema = {
    type: "object",
    required: ["amount"],
    properties: {
        amount: {
            type: "string",
            pattern: "^[0-9]+$"
        }
    }
}

classController.get(
    "/classes/top/:amount",
    [
        // auth(["admin", "trainer"]),
    validate({ params: getTopClassesListSchema })],
    async (req, res) => {
        // #swagger.summary = 'Get a collection of top classes'
        const amount = parseInt(req.params.amount)
        const trainingClasses = await models.classModel.getTop(amount)
        res.status(200).json({
            status: 200,
            message: "Get top classes",
            trainingClasses: trainingClasses,
        })
    }
)

const getClassByUserIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

classController.get("/classes/user-id/:id", 
    
    validate({ params: getClassByUserIDSchema }), 
async (req, res) => {
    // #swagger.summary = 'Get a specific class by user ID'
    const userID = req.params.id
    const trainingClasses = await models.classModel.getByUserID(userID)
        res.status(200).json({
            status: 200,
            message: "Get class by user ID",
            trainingClasses: trainingClasses
        })
    })

const getClassByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern:"^[0-9]+$"
        }
    }
}

classController.get("/classes/:id", 
validate({ params: getClassByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific class by ID'
    const trainingClassID = req.params.id
 
    models.classModel.getClassByID(trainingClassID).then(trainingClass => {
        res.status(200).json({
            status: 200,
            message: "Get class by ID",
            trainingClass: trainingClass
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get class by ID",
        })
    })
})

const createClassSchema = {
    type: "object",
    required: ["datetime", "room_id", "activity_id", "trainer_user_id"],
    properties: {
        datetime: {
          type: "string"
        },
        room_id:{
            type: "string",
            pattern:"^[0-9]+$"
        },
        activity_id:{
          type: "string",
            pattern:"^[0-9]+$"
        },
        trainer_user_id:{
            type: "string",
            pattern:"^[0-9]+$"
        }
    }
}

classController.post("/classes/", 
[
    // auth(["admin", "trainer"]),
validate({ body: createClassSchema })], (req, res) => {
    // #swagger.summary = 'Create a specific class'
    /* #swagger.requestBody = {
            description: 'Add a new class',
            content: {
                'application/json': {
                    schema: {
                        datetime: 'string',
                        room_id:'number',
                        activity_id:'number',
                        trainer_user_id:'number'
                    },
                    example: {
                        datetime: '2023-4-18',
                        room_id:"1",
                        activity_id:"1",
                        trainer_user_id:"1"
                    }
                }
            }    
        } 
    */
    // Get the class data out of the request
    const trainingClassData = req.body
    const trainingClass = TrainingClass(null, trainingClassData.datetime,trainingClassData.room_id,trainingClassData.activity_id, trainingClassData.trainer_user_id)

    models.classModel.create(trainingClass).then(trainingClass => {
        res.status(200).json({
            status: 200,
            message: "Created a class",
            trainingClass: trainingClass,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: error,
        })
    })
})

const updateClassSchema = {
    type: "object",
    required: ["id","datetime", "room_id", "activity_id", "trainer_user_id"],
    properties: {
                id: {
                    type: "number"
                },
                datetime: {
                type: "string"
                },
                room_id:{
                    type: "string",
                    pattern:"^[0-9]+$"
                },
                activity_id:{
                    type: "string",
                    pattern:"^[0-9]+$"
                },
                trainer_user_id:{
                    type: "string",
                    pattern:"^[0-9]+$"
                }
        
    }
}

classController.patch("/classes", 
[
    auth(["admin", "trainer"]),
validate({ body: updateClassSchema })], 
(req, res) => {
    // #swagger.summary = 'Update a specific class by ID'
    const trainingClass = req.body

   models.classModel.update(trainingClass).then(trainingClass => {
    res.status(200).json({
        status: 200,
        message: "Updated a class",
        trainingClass: trainingClass,
    })
}).catch(error => {
    console.error(error); // log the error to your server logs
    res.status(500).json({
        status: 500,
        message: "Failed to update class",
        error: error.message, // send the error message back to the client
    })
})

})

const deleteClassSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string"
        },
    }
}

// classController.delete("/classes/", 
// [auth(["admin", "trainer", "member"]),
// validate({ body: deleteClassSchema })], 
// (req, res) => {
//     // #swagger.summary = 'Delete a specific class by id'
//     const trainingClassID = req.body.id
//     models.classModel.deleteByID(trainingClassID).then(result=>{

//         res.status(200).json({
//             status: 200,
//             message: "Delete a class by ID ",
//         })
//     })
// })

classController.delete("/classes/:id", 
[
//   auth(["admin", "trainer"]),
], (req, res) => {
  const trainingClassID = req.params.id;  // access id from URL params
  models.classModel.deleteByID(trainingClassID).then(result=>{
    res.status(200).json({
      status: 200,
      message: "Delete a class by ID ",
    });
  });
});

  

export default classController
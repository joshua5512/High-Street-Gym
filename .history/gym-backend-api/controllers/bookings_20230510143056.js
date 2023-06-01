import { Router } from "express";

import { validate } from "../middleware/validator.js";

import models from "../models/model.js"
import { Booking } from "../models/booking.js";

const bookingController = Router()

//// Get sighting list endpoint
const getBookingListSchema = {
    type: "object",
    properties: {}
}

bookingController.get("/bookings", validate({ body: getBookingListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all bookings'

    const bookings = await models.bookingModel.getAllBookings()

    res.status(200).json({
        status: 200,
        message: "Get all bookings",
        bookings: bookings,
    })
})


const getBookingByUserIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern:"^[0-9]+$"
        }
    }
}

bookingController.get(
    "/bookings/user-id/:id",
    validate({ params: getBookingByUserIDSchema }),
    async (req, res) => {
        // #swagger.summary = 'Get all bookings by a user ID'
        const userID = req.params.id

        const bookings = await models.bookingModel.getBookingByUserID(userID)

        res.status(200).json({
            status: 200,
            message: "Get all bookings by user ID",
            bookings: bookings,
        })
    })

const getBookingByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            pattern:"^[0-9]+$"
        }
    }
}

bookingController.get("/bookings/:id", validate({ params: getBookingByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific booking by ID'
    const bookingID = req.params.id

    models.bookingModel.getBookingByID(bookingID).then(booking => {
        res.status(200).json({
            status: 200,
            message: "Get booking by ID",
            booking: booking
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get booking by ID",
        })
    })
})

// const createBookingSchema = {
//     type: "object",
//     required: ["user_id", "class_id", "created_datetime"],
//     properties: {
//         user_id: {
//             type: "string",
//             pattern:"^[0-9]+$"
//         },
//         class_id: {
//             type: "string",
//             pattern:"^[0-9]+$"
//         },
//         created_datetime: {
//             type: "string"
//         },
//     }
// }

bookingController.post("/bookings/", 
// validate({ body: createBookingSchema }), 
(req, res) => {
    // #swagger.summary = 'Create a specific booking'
    // Get the booking data out of the request
    const bookingData = req.body

    // Convert the booking data into an booking model object
    const booking = Booking(
        null,
        bookingData.user_id,
        bookingData.class_id,
        bookingData.created_datetime
    )


    models.bookingModel.createBooking(booking).then(booking => {
        res.status(200).json({
            status: 200,
            message: "Created booking",
            booking: booking,
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: 500,
            message: "Failed to created booking",
        })
    })
})

const updateBookingSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string",
            pattern:"^[0-9]+$"
        },
        user_id: {
            type: "string",
            pattern:"^[0-9]+$"
        },
        class_id: {
            type: "string",
            pattern:"^[0-9]+$"
        },
        created_datetime: {
            type: "string"
        }
    }
}

bookingController.patch("/bookings/", validate({ body: updateBookingSchema }), (req, res) => {
    // #swagger.summary = 'Update a specific class by ID'
    const booking = req.body

    models.bookingModel.update(booking).then(booking => {
        res.status(200).json({
            status: 200,
            message: "Uodated a booking",
            booking: booking,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to update booking",
        })
    })
})



const deleteBookingSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string",
            pattern:"^[0-9]+$"
        },
    }
}

bookingController.delete("/bookings/", validate({ body: deleteBookingSchema }), (req, res) => {
    // #swagger.summary = 'Delete a specific booking by id'
    const bookingID = req.body.id

    models.bookingController.deleteBooking(bookingID).then(result=>{

      res.status(200).json({
          status: 200,
          message: "Delete booking by ID",
      })
    })
})

export default bookingController
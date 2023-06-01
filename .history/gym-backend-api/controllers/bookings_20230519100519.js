import { Router } from "express";
import { validate } from "../middleware/validator.js";
import models from "../models/model.js"
import { Booking } from "../models/booking.js";
import auth from "../middleware/auth.js";

const bookingController = Router()
const getBookingListSchema = {
    type: "object",
    properties: {}
}

bookingController.get("/bookings", 
[auth(["admin", "trainer", "member"]),

validate({ body: getBookingListSchema })], async (req, res) => {
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
    }
)

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

const createBookingSchema = {
    type: "object",
    required: ["user_id", "class_id", "created_datetime", "activity_name"],
    properties: {
        user_id: {
            type: "number",
            pattern:"^[0-9]+$"
        },
        class_id: {
            type: "number",
            pattern:"^[0-9]+$"
        },
        created_datetime: {
            type: "string"
        },
        activity_name:{
            type:"string"
        }
    }
}

bookingController.post("/bookings/",
[auth(["admin", "trainer", "member"]),

validate({ body: createBookingSchema })], 
(req, res) => {
    // #swagger.summary = 'Create a specific booking'
    // Get the booking data out of the request
    const bookingData = req.body

    // Convert the booking data into an booking model object
    const booking = Booking(
        null,
        bookingData.user_id,
        bookingData.class_id,
        bookingData.created_datetime,
        bookingData.activity_name
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

bookingController.patch("/bookings/", 
[auth(["admin", "trainer", "member"]),

validate({ body: updateBookingSchema })], (req, res) => {
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
        }
    }
}

bookingController.delete("/bookings/:id", 
[auth(["admin","trainer","member"]),
validate({ params: deleteBookingSchema })], (req, res) => {
    // #swagger.summary = 'Delete a specific booking by id'
    const bookingID = req.params.id;
    console.log(bookingID)
    models.bookingModel.deleteBooking(bookingID)
      .then(result => {
        res.status(200).json({
          status: 200,
          message: "Delete booking by ID",
        });
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          message: error,
        });
    });   
});

export default bookingController
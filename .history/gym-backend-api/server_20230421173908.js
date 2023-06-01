import express from "express";
import cors from "cors";

const port = 8081;
const app = express();

app.use(cors({
  origin:true,

}))

app.use(express.json());

import docsRouter from "./middleware/swagger-doc.js";
app.use(docsRouter);

// import controller here
import userController from "./controllers/users.js";
app.use(userController);
import roomController from "./controllers/rooms.js";
app.use(roomController);
import activityController from "./controllers/activities.js";
app.use(activityController);
import bookingController from "./controllers/bookings.js";
app.use(bookingController);
import blogpostController from "./controllers/blog_posts.js";
app.use(blogpostController);
import classController from "./controllers/trainingClasses.js";
app.use(classController);

import { validateErrorMiddleware } from "./middleware/validator.js";
app.use(validateErrorMiddleware);

app.listen(port, ()=>{
  console.log(`Express server started on http://localhost:${port}`);
})
const models = {
  userModel: await import("./user.js"),
  activityModel: await import ("./activity.js"),
  roomModel:await import ("./room.js"),
  bookingModel:await import ("./booking.js"),
  classModel:await import ("./trainingClass.js"),
  blogpostModel:await import ("./blog_post.js")
}

export default models
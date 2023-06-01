import { Router } from "express";

import { validate } from "../middleware/validator.js";
import { Blogpost } from "../models/blog_post.js";

import models from "../models/model.js"

const blogpostController = Router()

//// Get trail list endpoint
const getBlogpostListSchema = {
    type: "object",
    properties: {}
}

blogpostController.get("/blogposts", validate({ body: getBlogpostListSchema }), async (req, res) => {
    // #swagger.summary = 'Get a collection of all blogposts'

    const blogposts = await models.blogpostModel.getAll()

    res.status(200).json({
        status: 200,
        message: "Get all blogposts",
        blogposts: blogposts,
    })
})

const getBlogpostByIDSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        }
    }
}

blogpostController.get("/blogposts/:id", validate({ params: getBlogpostByIDSchema }), (req, res) => {
    // #swagger.summary = 'Get a specific blogpost by ID'
    const blogpostID = req.params.id

    models.blogpostModel.getByID(blogpostID).then(blogpost => {
        res.status(200).json({
            status: 200,
            message: "Get blogpost by ID",
            blogpost: blogpost
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to get blogpost by ID",
        })
    })
})

const createBlogpostSchema = {
    type: "object",
    required: ["datetime", "title", "content"],
    properties: {
        datetime: {
          type: "string"
        },
        title:{
          type:"string"
        },
        content:{
          type:"string"
        }
    }
}

blogpostController.post("/blogposts/", validate({ body: createBlogpostSchema }), (req, res) => {
    // #swagger.summary = 'Create a specific blogpost'
    /* #swagger.requestBody = {
            description: 'Add a new blogpost',
            content: {
                'application/json': {
                    schema: {
                        datetime: 'string',
                        title:"string",
                        content:"string"
                    },
                    example: {
                        datetime: '2023-4-18',
                        title:"Gym blog",
                        content:"lorem ipsum"
                    }
                }
            }
            
        } 
    */
    // Get the blogpost data out of the request
    const blogpostData = req.body


    const blogpost = Blogpost(null, blogpostData.datetime,blogpostData.title,blogpostData.content)

  
    models.blogpostModel.create(blogpost).then(blogpost => {
        res.status(200).json({
            status: 200,
            message: "Created blogpost",
            blogpost: blogpost,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to created blogpost",
        })
    })
})

const updateBlogpostSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
        datetime: {
          type: "string"
        },
        title:{
          type:"string"
        },
        content:{
          type:"string"
        }
    }
}

blogpostController.patch("/blogposts/", validate({ body: updateBlogpostSchema }), (req, res) => {
    // #swagger.summary = 'Update a specific blogpost by ID'
    const blogpost = req.body

    res.status(200).json({
        status: 200,
        message: "Update blogpost by ID",
    })
})

const deleteBlogpostSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "number"
        },
    }
}

blogpostController.delete("/blogposts/", validate({ body: deleteBlogpostSchema }), (req, res) => {
    // #swagger.summary = 'Delete a specific blogpost by id'
    const blogpostID = req.body.id

    res.status(200).json({
        status: 200,
        message: "Delete blogpost by ID ",
    })
})


export default blogpostController
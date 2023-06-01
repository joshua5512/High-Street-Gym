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

blogpostController.get("/blogposts", 

validate({ body: getBlogpostListSchema }), async (req, res) => {
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
            pattern:"^[0-9]+$"
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

const getBlogpostByUserIDSchema = {
    type: "object",
    properties: {
        userID: {
            type: "string",
            pattern:"^[0-9]+$"
        }
    }
}

blogpostController.get(
    "/blogposts/user-id/:id",
    validate({ params: getBlogpostByUserIDSchema }),
    async (req, res) => {
        // #swagger.summary = 'Get all blogposts by a user ID'
        const userID = req.params.id
        const blogposts = await models.blogpostModel.getBlogpostByUserID(userID)

        res.status(200).json({
            status: 200,
            message: "Get all blogposts by user ID",
            blogposts: blogposts,
        })
    }
)

const createBlogpostSchema = {
    type: "object",
    required: ["datetime", "user_id","title", "content"],
    properties: {
        datetime: {
          type: "string"
        },
        user_id:{
            type: "number"
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

    const blogpost = Blogpost(null, blogpostData.datetime,blogpostData.user_id,blogpostData.title,blogpostData.content)
  
    models.blogpostModel.create(blogpost).then(blogpost => {
        res.status(200).json({
            status: 200,
            message: "Created blogpost",
            blogpost: blogpost,
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: error,
        })
    })
})

const updateBlogpostSchema = {
    type: "object",
    required: ["id"],
    properties: {
        id: {
            type: "string"
        },
        datetime: {
          type: "string"
        }, 
        user_id:{
            type: "number"
        },
        title:{
          type:"string"
        },
        content:{
          type:"string"
        }
    }
}

blogpostController.patch("/blogposts/:id", validate({ body: updateBlogpostSchema }), (req, res) => {
    // #swagger.summary = 'Update a specific blogpost by ID'
    const blogpostData = req.body
    const blogpost = Blogpost(blogpostData.id, blogpostData.datetime,blogpostData.user_id,blogpostData.title,blogpostData.content)

    models.blogpostModel.update(blogpost).then(blogpost=>{

        res.status(200).json({
            status: 200,
            message: "Update blogpost by ID",
            blogpost:blogpost
        })
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Failed to update blogpost"+error,
        })
    })
})

const deleteBlogpostSchema = {
    type: "object",
    properties: {
      id: {
        type: "string",
        pattern: "^[0-9]+$",
      },
    },
};
  
blogpostController.delete(
    "/blogposts/:id",
    validate({ params: deleteBlogpostSchema }),
    async (req, res) => {
      const blogpostID = req.params.id;
  
      // Delete the blogpost by ID
      try {
        await models.blogpostModel.deleteByID(blogpostID);
        res.status(200).json({
          status: 200,
          message: "Delete blogpost by ID",
        });
      } catch (error) {
        console.error("Failed to delete blogpost:", error);
        res.status(500).json({
          status: 500,
          message: "Failed to delete blogpost",
        });
      }
    }
);

export default blogpostController
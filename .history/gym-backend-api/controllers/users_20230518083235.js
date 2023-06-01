import { Router } from "express";
import { User } from "../models/user.js";
import { v4 as uuid4 } from "uuid";
import { validate } from "../middleware/validator.js";
import bcrypt from "bcryptjs"
import auth from "../middleware/auth.js"
import models from "../models/model.js"
import { deleteByID } from "../models/user.js";

const userController = Router();

const postUserLoginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
      email: {
          pattern: "^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$",
          type: "string"
      },
      password: {
          type: "string"
      }
  }
}

userController.post(
  "/users/login",
  validate({ body: postUserLoginSchema }),
  (req, res) => {
      const loginData = req.body
      models.userModel.getByEmail(loginData.email)
          .then(user => {
              if (bcrypt.compareSync(loginData.password, user.password)) {
                  user.authenticationKey = uuid4().toString()
                  models.userModel.update(user).then(result => {
                      res.status(200).json({
                          status: 200,
                          message: "user logged in",
                          authenticationKey: user.authenticationKey
                      })
                  })
              } else {
                  res.status(400).json({
                      status: 400,
                      message: "invalid credentials"
                  })
              }
          })
          .catch(error => {
              res.status(500).json({
                  status: 500,
                  message: error
              })
        })
  }
)

//// User logout endpoint
const postUserLogoutSchema = {
  type: "object",
  required: ["authenticationKey"],
  properties: {
      authenticationKey: {
          type: "string"
      }
  }
}

userController.post(
  "/users/logout",
  validate({ body: postUserLogoutSchema }),
  (req, res) => {
    const authenticationKey = req.body.authenticationKey
    models.userModel.getByAuthenticationKey(authenticationKey)
    .then(user => {
        user.authenticationKey = null
        models.userModel.update(user)
            .then(user => {
                res.status(200).json({
                    status: 200,
                    message: "user logged out"
                })
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: "failed to logout user"
            })
        })
    }
)

//// Get user list endpoint
userController.get(
  "/users", 
  [auth(["admin", "trainer", "member"])],
  async (req, res) => {
      const users = await models.userModel.getAll()
      res.status(200).json({
          status: 200,
          message: "user list",
          users: users,
      })
  }
)

//// Get user by ID endpoint
const getUserByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
      id: {
          type: "string"
      }
  }
}

userController.get(
  "/users/:id",
  validate({ params: getUserByIDSchema }),
  (req, res) => {
      const userID = req.params.id

      models.userModel.getByID(userID).then(user => {
          res.status(200).json({
              status: 200,
              message: "Get user by ID",
              user: user,
          })
      }).catch(error => {
          res.status(500).json({
              status: 500,
              message: "Failed to get user by ID"
          })
      })
  }
)

//// Get user by authentication key endpoint
const getUserByAuthenticationKeySchema = {
  type: "object",
  required: ["authenticationKey"],
  properties: {
      authenticationKey: {
          type: "string"
      }
  }
}

userController.get(
  "/users/by-key/:authenticationKey",
  validate({ params: getUserByAuthenticationKeySchema }),
  (req, res) => {
      const userAuthKey = req.params.authenticationKey
      models.userModel.getByAuthenticationKey(userAuthKey).then(user => {
          res.status(200).json({
              status: 200,
              message: "Get user by authentication key",
              user: user,
          })
      }).catch(error => {
          console.log(error)
          res.status(500).json({
              status: 500,
              message: "Failed to get user by authentication key"
          })
      })
    }
)

const createUserSchema = {
    type: "object",
    required: [
        "email",
        "password",
        "role",
        "phone",
        "firstname",
        "lastname",
        "address"
    ],
    properties: {
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        role: {
            type: "string"
        },
        phone:{
            type:"string"
        },
        firstname: {
            type: "string"
        },
        lastname: {
            type: "string"
        },
        address:{
            type:"string"
        }
    }
}

userController.post(
    "/users",
    validate({ body: createUserSchema }),
    (req, res) => {

        const userData = req.body
        if (!userData.password.startsWith("$2a")) {
            userData.password = bcrypt.hashSync(userData.password);
        }

        const user = User(
            null,
            userData.email,
            userData.password,
            userData.role,
            userData.phone,
            userData.firstname,
            userData.lastname,
            userData.address,
            null
        )

        models.userModel.create(user).then(user => {
            res.status(200).json({
                status: 200,
                message: "Created user",
                user: user
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: error,           
            })
        })
    }
)

// Regiester user
const registerUserSchema = {
    type: "object",
    required: [
        "email",
        "password",
        "phone",
        "firstname",
        "lastname",
        "address"
    ],
    properties: {
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        phone:{
            type:"string"
        },
        firstname: {
            type: "string"
        },
        lastname: {
            type: "string"
        },
        address:{
            type:"string"
        }
    }
}
userController.post(
    "/users/register",
    validate({ body: registerUserSchema }),
    (req, res) => {
        // Get the user data out of the request
        const userData = req.body

        // hash the password 
        userData.password = bcrypt.hashSync(userData.password);

        // Convert the user data into an User model object
        const user = User(
            null,
            userData.email,
            userData.password,
            "member",
            userData.phone,
            userData.firstname,
            userData.lastname,
            userData.address,
            null
        )

        // Use the create model function to insert this user into the DB
        models.userModel.create(user).then(user => {
            res.status(200).json({
                status: 200,
                message: "Registration successful",
                user: user              
            })
        }).catch(error => {
            res.status(500).json({
                status: 500,
                message: error
            })
        })
    }
)

//// Update user endpoint
const patchUpdateUserSchema = {
  type: "object",
  required: ["user"],
  properties: {
      id: {
          type: "number"
      },
      email: {
          type: "string"
      },
      password: {
          type: "string"
      },
      role: {
          type: "string"
      },
      phone:{
        type: "string"
      },
      firstname: {
          type: "string"
      },
      lastname: {
          type: "string"
      },
      address:{
        type: "string"
      },
      authenticationKey:{
        type:["string", "null"]
      }
    }
}

userController.patch(
  "/users",
  [auth(["admin","trainer","member"]),
  validate({ body: patchUpdateUserSchema })],
  (req, res) => {
      // Get user data out of the request
      const userData = req.body

      // Hash the password if it isn't already hashed
      if (!userData.password.startsWith("$2a")) {
          userData.password = bcrypt.hashSync(userData.password)
        }

      // Convert the user data into a User model object
      const user = User(
          userData.id,
          userData.email,
          userData.password,
          userData.role,
          userData.phone,
          userData.firstname,
          userData.lastname,
          userData.address,
          userData.authenticationKey
        )

      // Use the update model function to update this user in the DB
      models.userModel.update(user).then(user => {
          res.status(200).json({
              status: 200,
              message: "Updated user",
              user: user
            })
      }).catch(error => {
          res.status(500).json({
              status: 500,
              message: error
            })
        })
    }
)

//// Delete user endpoint
const deleteUserByIDSchema = {
  type: "object",
  required: ["id"],
  properties: {
      id: {
          type: "string"
        }
    }
}

userController.delete(
  "/users/:id",
  validate({ params: deleteUserByIDSchema }),
  (req, res) => {
      const userID = req.params.id

      deleteByID(userID).then(result => {
          res.status(200).json({
              status: 200,
              message: "User deleted"
            })
      }).catch(error => {
          res.status(500).json({
              status: 500,
              message: "Failed to delete user"
            })
        })
    }
)

export default userController
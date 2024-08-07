const express = require("express");
const { createTask} = require("./controller/taskController/createTask");
const {searchTask} = require("./controller/taskController/searchTask");
const {updateTaskById} = require("./controller/taskController/updateTask")
const {deleteTaskById} = require("./controller/taskController/deleteTask")
const {registerUser} = require("./controller/userController/userRegistration")
const {searchUser} = require("./controller/userController/searchUser")
const {allUsers} = require("./controller/userTaskController/index")
const {userLogin} = require("./controller/userController/userLogin")
const {userLogout} = require("./controller/userController/userLogout")
const {auth} = require("./auth/auth")

const router = express.Router();

router.route("/todos/").post(auth , createTask).get(auth , searchTask)

router.route("/todos/:todoId/")
    .get(auth , searchTask)
    .put(auth , updateTaskById)
    .delete(auth , deleteTaskById)

router.route("/register").post(registerUser)

router.route("/login").post(userLogin)

router.route("/logout").post(auth , userLogout)

router.route("/users/:ID/").get(searchUser , searchTask)

router.route("/allUsers").get(allUsers)

module.exports = router;
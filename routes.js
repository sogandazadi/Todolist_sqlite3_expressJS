const express = require("express");
const { createTask} = require("./controller/taskController/createTask");
const {search} = require("./controller/taskController/readTask");
const {updateTaskById} = require("./controller/taskController/updateTask")
const {deleteTaskById} = require("./controller/taskController/deleteTask")
const {registerUser} = require("./controller/userController/userRegistration")
const {search_user} = require("./controller/userController/readUser")
const {all_users} = require("./controller/userTaskController/index")
const {userLogin} = require("./controller/userController/userLogin")

const router = express.Router();

router.route("/todos/")
    .post(createTask)
    .get(search)

router.route("/todos/:todoId/")
    .get(search)
    .put(updateTaskById)
    .delete(deleteTaskById)

router.route("/register").post(registerUser)

router.route("/users/:ID/").get(search_user , search)

router.route("/allUsers").get(all_users)

router.route("/login").post(userLogin)

module.exports = router;
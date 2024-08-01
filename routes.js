const express = require("express");
const { createTask} = require("./controller/taskController/createTask");
const {search} = require("./controller/taskController/readTask");
const {updateTaskById} = require("./controller/taskController/updateTask")
const {deleteTaskById} = require("./controller/taskController/deleteTask")
const {create_user} = require("./controller/userController/createUser")
const {search_user} = require("./controller/userController/readUser")
const {all_users} = require("./controller/userTaskController/index")

const router = express.Router();

router.route("/todos/")
    .post(createTask)
    .get(search)

router.route("/todos/:todoId/")
    .get(search)
    .put(updateTaskById)
    .delete(deleteTaskById)

router.route("/users").post(create_user)

router.route("/users/:ID/").get(search_user , search)

router.route("/allUsers").get(all_users)

module.exports = router;
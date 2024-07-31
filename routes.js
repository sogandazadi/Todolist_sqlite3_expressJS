const express = require("express");
const { createTask} = require("./controller/createTask");
const {search} = require("./controller/readTask");
const {updateTaskById} = require("./controller/updateTask")
const {deleteTaskById} = require("./controller/deleteTask")
const {create_user} = require("./controller/createUser")
const {search_user} = require("./controller/readUser")

const router = express.Router();

router.route("/todos/")
.post(createTask)
.get(search)

router.route("/todos/:todoId/")
.get(search)
.put(updateTaskById)
.delete(deleteTaskById)

router.route("/users").post(create_user).get(search_user)

module.exports = router;
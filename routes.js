const express = require("express");
const { createTask} = require("./controller/create");
const {search} = require("./controller/read");
const {updateTaskById} = require("./controller/update")
const {deleteTaskById} = require("./controller/delete")

const router = express.Router();

router.route("/todos/")
.post(createTask)
.get(search)

router.route("/todos/:todoId/")
.get(search)
.put(updateTaskById)
.delete(deleteTaskById)

module.exports = router;
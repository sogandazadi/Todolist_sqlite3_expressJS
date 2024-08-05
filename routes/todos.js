const express = require("express");
const router = express.Router();
const Task = require("../model/todo")
const createError = require("http-errors")

const todos = [{ todo: "eat" , priority: "high" , status:"TO DO"}];

router.post("/" ,  (req, res, next) => {
    const { body } = req;

    if(typeof body.todo !== "string" || typeof body.priority !== "string" || typeof body.status !== "string"){
        return next((createError(422 , "Validation Error")))
    }

    const newTodo = {
        todo:body.todo,
        priority:body.priority,
        status:body.status
    };

   Task.create(newTodo)

    res.status(201).json(newTodo);
});

module.exports = router;
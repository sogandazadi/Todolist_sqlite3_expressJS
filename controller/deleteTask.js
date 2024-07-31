const Task = require("../model/todo");

exports.deleteTaskById = async (req, res) => {
    try {
      const task_id = req.params.todoId;
      const task = await Task.findByPk(task_id);
      if (!task) {
        res.status(404).send('Task not found');
      } else {
        await task.destroy();
        res.send('Task deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
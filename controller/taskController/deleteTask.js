const Task = require("../../model/todo");

exports.deleteTaskById = async (req, res) => {
    try {
      const task_id = req.params.todoId;
      const task = await Task.findByPk(task_id);
      if (!task || task.user_id!== req.user.id) {
        res.status(404).send('Task not found');
      } else {
        await task.destroy();
        res.send('Task deleted successfully');
      }
    } catch (error) {
      res.status(500).send("An error occurred" + "\n" + error.message);
    }
  };
const Task = require("../../model/todo");

exports.updateTaskById = async (req, res) => {
    try {
      const task_id = req.params.todoId;
      const update_elements = req.body;
      let updated_attribute = null;

      const task = await Task.findByPk(task_id);
      if (!task) {
        res.status(404).send('Task not found');
      } 
      else {
        switch (true) {
        case update_elements.status !== undefined:
        updated_attribute =  "Status"
        task.set({ status: update_elements.status });
        break
        case update_elements.priority !== undefined:
        updated_attribute = "Priority"
        task.set({ priority: update_elements.priority });
        break
        case update_elements.todo !== undefined:
        updated_attribute = "Todo"
        task.set({ todo: update_elements.todo });
        break
      }
        await task.save();
        res.json({ message: `${updated_attribute} updated successfully`, task });
      }
    } catch (error) {
      res.status(500).send("An error occurred" + "\n" + error.message);
    }
  };

    
  





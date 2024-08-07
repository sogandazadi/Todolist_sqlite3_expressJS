const Task = require('../../model/todo');

exports.createTask = async (req, res) => {
  try {
    const { todo , priority, status } = req.body;
    const user_id = req.user.id;
    const task = await Task.create({ todo, priority, status , user_id });
    res.json({ message: 'Todo Successfully Added', task });
  } catch (error) {
    res.status(500).send("An error occurred" + "\n" + error.message);
  }
};
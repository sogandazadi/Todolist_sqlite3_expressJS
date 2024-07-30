const Task = require('../model/todo');

exports.createTask = async (req, res) => {
  try {
    const { todo , priority, status } = req.body;
    const task = await Task.create({ todo, priority, status });
    res.json({ message: 'Todo Successfully Added', task });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
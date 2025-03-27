
const express = require('express');
const Task = require('../models/Task');

const router = express.Router();


router.post('/AddTask', async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      status: 'Pending',
      createdAt: Date.now()
    });


    await newTask.save();


    res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating task' });
  }
});



router.get('/GetTasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});


router.delete('/DeleteTask/:id', async (req, res) => {
  try {
    const taskId = req.params.id;


    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error deleting task' });
  }
});


router.put('/UpdateTask/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;


    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }


    task.status = status || task.status;


    await task.save();

    res.status(200).json({ message: "Tâche mise à jour avec succès", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche" });
  }
});

module.exports = router;

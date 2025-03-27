const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },   
  createdAt: { type: Date, default: Date.now }   
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


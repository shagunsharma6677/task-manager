import mongoose from 'mongoose';

// Define the schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

export default Task;

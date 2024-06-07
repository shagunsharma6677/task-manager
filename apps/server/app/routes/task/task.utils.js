import Task from '../../models/task.modal.js';
export const getTask = async () => {
  try {
    const tasks = await Task.find();

    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async ({ title, description, status }) => {
  try {
    const newTask = new Task({
      title,
      description,
      status,
    });
    return await newTask.save();
  } catch (err) {
    throw new Error('Error creating task: ' + err.message);
  }
};

export const editTask = async ({ taskId, taskData }) => {
  try {
    const task = await Task.findByIdAndUpdate(taskId, taskData);

    if (!task) {
      throw new Error('Task not found');
    }
    return await task.save();
  } catch (err) {
    throw new Error('Error creating task: ' + err.message);
  }
};

export const deleteTask = async ({ taskId }) => {
  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (err) {
    console.error(`Error deleting task with ID ${taskId}:`, err);
    throw new Error('Error deleting task: ' + err.message);
  }
};

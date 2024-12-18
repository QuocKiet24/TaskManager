import TaskModel from "../models/task.model.js";
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status, completed } = req.body;
  const userId = req.userId;
  try {
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required!" });
    }
    if (!description || description.trim() === "") {
      res.status(400).json({ message: "Description is required!" });
    }

    const checkSame = await TaskModel.findOne({ title, user: userId });
    if (checkSame) {
      return res.status(400).json({ message: "Task already exists!" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      completed,
      user: userId,
    });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
    console.log("Error in createTask ", error);
  }
};

export const getManyTasks = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ message: "User not found!" });
    }
    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getManyTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.userId;

    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.userId;

    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;
    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }
    const task = await TaskModel.findById(id);
    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }
    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    // update the task with the new data if provided or keep the old data
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.userId; // User ID from verified token
    const { id } = req.params; // Task ID from request parameters

    const task = await TaskModel.findById(id); // Fetch task by ID

    if (!task) {
      return res.status(404).json({ message: "Task not found!" }); // Return to stop execution
    }

    // Check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized!" }); // Return to stop execution
    }

    await TaskModel.findByIdAndDelete(id); // Delete the task

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" }); // Return to stop execution
  }
};

export const deleteAllTasks = async (req, res) => {
  try {
    const userId = req.userId;

    const tasks = await TaskModel.find({ user: userId });

    // Check if tasks were found
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    const invalidTask = tasks.find((task) => !task.user.equals(userId));
    if (invalidTask) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res
      .status(200)
      .json({ message: "All tasks deleted successfully!", tasks });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const completeAllTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await TaskModel.find({ user: userId });

    // Check if tasks were found
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found!" });
    }

    // Verify that all tasks belong to the user
    const invalidTask = tasks.find((task) => !task.user.equals(userId));
    if (invalidTask) {
      return res.status(401).json({ message: "Not authorized!" });
    }

    // Mark all tasks as completed
    await TaskModel.updateMany({ user: userId }, { completed: true });

    return res
      .status(200)
      .json({ message: "All tasks completed successfully!", tasks });
  } catch (error) {
    console.error("Error in completeAllTasks: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const userId = req.userId; // User ID from verified token
    const { id } = req.params; // Task ID from request parameters

    const task = await TaskModel.findById(id); // Fetch task by ID

    if (!task) {
      return res.status(404).json({ message: "Task not found!" }); // Return to stop execution
    }

    // Check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized!" }); // Return to stop execution
    }

    if (task.completed) {
      return res.status(400).json({ message: "Task already completed!" });
    }

    await TaskModel.findByIdAndUpdate(id, { completed: true }); // Update the task

    return res.status(200).json({ message: "Task completed successfully!" });
  } catch (error) {
    console.log("Error in completeTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

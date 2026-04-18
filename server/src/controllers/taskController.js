import Task from "../models/Task.js";

const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Task title is required");
    }

    const task = await Task.create({
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate || null,
      user: req.user._id,
    });

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const { title, description, status, priority, dueDate } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.priority = priority ?? task.priority;
    task.dueDate = dueDate === "" ? null : dueDate ?? task.dueDate;

    const updatedTask = await task.save();
    return res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    await task.deleteOne();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createTask, getTasks, updateTask, deleteTask };

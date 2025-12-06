const Task = require("../model/task.model");

// -------------------------------------------

// POST - task/create 
const createTask = async (req, res) => {
    try {

        const { title, desc, status } = req.body;

        if (!title || !desc) {
            return res.status(400).json({
                success: false,
                message: "Title and Description are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Task image is required",
            });
        }

        const taskImg = req.file.filename;

        const existingTask = await Task.findOne({
            user: req.user._id,
            taskTitle: title,
        });

        if (existingTask) {
            return res.status(400).json({
                success: false,
                message: "Task with this title already exists",
            });
        }

        const newTask = await Task.create({
            user: req.user._id,
            taskTitle: title,
            taskDesc: desc,
            taskStatus: status || "pending",
            taskImg,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: newTask,
        });

    } catch (error) {
        console.error("Create Task Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// GET - task/all 
const getAllTasks = async (req, res) => {
    try {

        const tasks = await Task.find({ user: req.user._id })
            .populate("user", "username email profileImg")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks,
        });

    } catch (error) {
        console.error("Get Tasks Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// PATCH - task/update/:id 
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const { title, desc, status } = req.body;

        const task = await Task.findOne({ _id: taskId, user: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        if (title !== undefined) {
            task.taskTitle = title;
        }

        if (desc !== undefined) {
            task.taskDesc = desc;
        }

        if (status !== undefined) {
            task.taskStatus = status;
        }

        if (req.file) {
            task.taskImg = req.file.filename;
        }


        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });

    } catch (error) {
        console.error("Update Task Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// PATCH - task/mark-complete/:id 
const markTaskComplete = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOne({ _id: taskId, user: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        if (task.taskStatus === "complete") {
            return res.status(400).json({
                success: false,
                message: "Task is already marked as complete",
            });
        }

        task.taskStatus = "complete";
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task marked as complete successfully",
            data: task,
        });

    } catch (error) {
        console.error("Mark Complete Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// DELETE - task/delete/:id
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOne({ _id: taskId, user: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (error) {
        console.error("Delete Task Error", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


module.exports = {
    createTask,
    updateTask,
    markTaskComplete,
    getAllTasks,
    deleteTask
};

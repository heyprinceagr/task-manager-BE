const mongoose = require("mongoose");

// ----------------------------------------

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        taskImg: {
            type: String,
            default: "",
        },

        taskTitle: {
            type: String,
        },

        taskDesc: {
            type: String,
        },

        taskStatus: {
            type: String,
            enum: ["pending", "in-process", "complete"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task

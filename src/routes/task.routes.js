const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/verifyToken")
const uploadTaskImg = require("../middleware/taskImgUpload")
const {
    createTask,
    updateTask,
    markTaskComplete,
    getAllTasks,
    deleteTask
} = require("../controller/task.controller")

// ----------------------------------------------------

router.post("/create", verifyToken, uploadTaskImg.single("taskImg"), createTask)
router.get("/all", verifyToken, getAllTasks)
router.patch("/update/:id", verifyToken, uploadTaskImg.single("taskImg"), updateTask)
router.patch("/mark-complete/:id", verifyToken, markTaskComplete)
router.delete("/delete/:id", verifyToken, deleteTask);


module.exports = router
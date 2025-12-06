const express = require("express")
const app = express()
require("dotenv").config()
const DBConnect = require("./db")
const morgan = require("morgan")
const cors = require("cors")
const userRoute = require("./routes/user.routes")
const taskRoute = require("./routes/task.routes")

// -------------------------------------------------------

// Parsing  & cors
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*"
}))


// Routing Logs 
app.use(morgan("dev"))


// DB Connection 
DBConnect()


// Static folder For Img
app.use("/uploads", express.static("uploads"));


// Routes 
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "This is Test route"
    });
});
app.use("/user", userRoute)
app.use("/task", taskRoute)


// PORT and Listen 
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`)
})
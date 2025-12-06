# Task Manager Backend

This repository contains the backend server for a Task Manager application. It provides a RESTful API for user authentication and task management, built with Node.js, Express, and MongoDB.

## Features

-   **User Authentication**: Secure user sign-up and login functionality using JSON Web Tokens (JWT).
-   **Password Hashing**: Passwords are securely hashed using `bcryptjs` before being stored.
-   **Task Management (CRUD)**: Full Create, Read, Update, and Delete operations for tasks.
-   **Task Status Tracking**: Tasks can be categorized as `pending`, `in-process`, or `complete`.
-   **Image Uploads**: Supports uploading profile pictures for users and images for tasks using `multer`.
-   **Authenticated Routes**: Middleware to protect task-related endpoints, ensuring only authenticated users can access their data.

## Technology Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Token (jsonwebtoken)
-   **Password Hashing**: bcryptjs
-   **File Uploads**: Multer
-   **Middleware**: CORS, Morgan (for logging)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm
-   MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/heyprinceagr/task-manager-be.git
    cd task-manager-be
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables.

    ```env
    PORT=8000
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Start the server:**
    ```sh
    node src/index.js
    ```
    The server will be running on `http://localhost:8000` (or the port you specified).

## API Endpoints

### User Routes

#### `POST /user/signup`

Creates a new user. This is a `multipart/form-data` request.

-   **Body:**
    -   `username` (String, required)
    -   `email` (String, required)
    -   `password` (String, required)
    -   `profileImg` (File, required)

#### `POST /user/login`

Logs in an existing user and returns a JWT.

-   **Body:**
    -   `email` (String, required)
    -   `password` (String, required)

### Task Routes

All task routes are protected and require an `Authorization` header with a Bearer Token.

`Authorization: Bearer <your_jwt_token>`

#### `POST /task/create`

Creates a new task for the authenticated user. This is a `multipart/form-data` request.

-   **Body:**
    -   `title` (String, required)
    -   `desc` (String, required)
    -   `status` (String, optional, defaults to `pending`)
    -   `taskImg` (File, required)

#### `GET /task/all`

Retrieves all tasks for the authenticated user, sorted by creation date.

#### `PATCH /task/update/:id`

Updates a specific task's details. This is a `multipart/form-data` request.

-   **Params:**
    -   `id`: The ID of the task to update.
-   **Body (provide only the fields to be updated):**
    -   `title` (String)
    -   `desc` (String)
    -   `status` (String - "pending", "in-process", "complete")
    -   `taskImg` (File)

#### `PATCH /task/mark-complete/:id`

Marks a specific task as complete.

-   **Params:**
    -   `id`: The ID of the task to mark as complete.

#### `DELETE /task/delete/:id`

Deletes a specific task.

-   **Params:**
    -   `id`: The ID of the task to delete.

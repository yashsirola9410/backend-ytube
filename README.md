## 📽️ VTube Backend – Project Overview

**VTube Backend** is a foundational backend project built to replicate the core functionalities of a video-sharing platform like YouTube. This is my **first backend project**, created with the purpose of learning and understanding how a backend system truly works—from user authentication to complex routing, controller logic, and database integration.

### 🎯 Project Goal

The primary goal of this project was **to understand the entire lifecycle of a backend service**, starting from request handling to response delivery. I aimed to explore how data flows through middleware, routes, controllers, and models, while also building a scalable architecture using **Node.js**, **Express.js**, and **MongoDB**.

---

## 🚀 Key Features

- **User Authentication**  
  Secure registration and login system using **bcrypt** for password hashing and **JWT** for token-based authentication.

- **RESTful API Endpoints**  
  Well-structured routes and controllers for:
  - ✅ `Healthcheck`
  - 👤 `Users`
  - 🎥 `Videos`
  - 💬 `Comments`
  - ❤️ `Likes`
  - 📝 `Tweets`
  - 📃 `Playlists`
  - 🔔 `Subscriptions`

- **File Uploading with Cloudinary**  
  Users can upload videos or media files, which are stored securely on **Cloudinary**, integrated via **Multer** for file handling.

- **MongoDB Models & Mongoose ODM**  
  Learned how to design schemas, create relationships, and interact with the database efficiently.

- **Routing & Controllers**  
  Gained practical knowledge of separating route definitions and controller logic, following clean architecture practices.

- **Custom Middleware**  
  Implemented middleware for:
  - Parsing JSON & URL-encoded data
  - Cookie handling
  - CORS configuration
  - Global error handling

- **Utility Functions**  
  Built helper functions to keep controllers clean and efficient.

- **Tested with Postman**  
  All API endpoints were rigorously tested using **Postman** to ensure correctness and reliability.

---

## 📁 Folder Structure

/backend
│
├── controllers/ # Logic for route handlers
├── models/ # Mongoose schemas
├── routes/ # Express routes
├── middleware/ # Auth and error handling
├── config/ # DB connection and app config
├── .env # Environment variables (not committed)
├── .gitignore # Ignored files list
├── server.js # Entry point
└── package.json # Project metadata and scripts


## 🛠️ Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**  
- **bcrypt** (Password hashing)  
- **jsonwebtoken (JWT)** (Authentication tokens)  
- **cookie-parser** (Cookie handling)  
- **multer** (File uploads)  
- **cloudinary** (Cloud media storage)  
- **cors** (Handling cross-origin requests)  
- **dotenv** (Environment variable config)  
- **mongoose-aggregate-paginate-v2** (Aggregation pagination)  
- **nodemon** (Dev tool for auto-restart)  
- **prettier** (Code formatting)


## API Endpoints

| Method | Endpoint                  | Description                              | Auth Required |
|--------|---------------------------|----------------------------------------|---------------|
| GET    | `/api/v1/healthcheck`     | Check server health status              | No            |
| POST   | `/api/v1/users`           | Register new user                       | No            |
| POST   | `/api/v1/users/login`     | User login                             | No            |
| GET    | `/api/v1/users/:id`       | Get user profile by ID                  | Yes           |
| PUT    | `/api/v1/users/:id`       | Update user profile                     | Yes           |
| POST   | `/api/v1/media`           | Upload new video/media                   | Yes           |
| GET    | `/api/v1/media/:id`       | Get media details by ID                 | No            |
| PUT    | `/api/v1/media/:id`       | Update media info                       | Yes           |
| DELETE | `/api/v1/media/:id`       | Delete media                           | Yes           |
| POST   | `/api/v1/comment`         | Add a comment                          | Yes           |
| GET    | `/api/v1/comment/:id`     | Get comment details                    | No            |
| POST   | `/api/v1/tweet`           | Create a tweet/post                    | Yes           |
| GET    | `/api/v1/tweet/:id`       | Get tweet details                      | No            |
| POST   | `/api/v1/like`            | Like a media/tweet                    | Yes           |
| POST   | `/api/v1/playlist`        | Create a playlist                      | Yes           |
| GET    | `/api/v1/playlist/:id`    | Get playlist details                   | No            |
| POST   | `/api/v1/subs`            | Subscribe to a user/channel            | Yes           |
| DELETE | `/api/v1/subs/:id`        | Unsubscribe from a user/channel        | Yes           |


## 🧠 What I Learned

This project helped me deeply understand:

- The structure and flow of backend applications
- Role of routing, controllers, and models
- Secure authentication using JWT
- How to integrate file uploads with external cloud storage (Cloudinary)
- Error handling and middleware usage
- Creating modular and maintainable code in a backend environment
  
## 🧪 Testing

All API endpoints were tested thoroughly using **Postman** to ensure reliability and correct functionality.

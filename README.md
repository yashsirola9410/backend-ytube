# 🚀 MERN Backend Project

This is the backend of a MERN (MongoDB, Express.js, React.js, Node.js) stack application. It handles API requests, database interactions, authentication, and more.

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

  
## 🧪 Testing

All API endpoints were tested thoroughly using **Postman** to ensure reliability and correct functionality.

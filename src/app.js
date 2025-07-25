import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"


const app =  express()

app.use(
    cors({
        origin : process.env.CORS_ORIGIN,
        credentials : true 
    })
)


//common middleware
app.use(express.json({limit : "16kb"})) 
app.use(express.urlencoded({extended :true , limit : "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())



//import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/videos.routes.js"
import commentRouter from "./routes/comment.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.route.js"
import subscriberRouter from "./routes/subscription.routes.js"

import {errorHandler} from "./middlewares/error.middlewares.js"



//routes

app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/media" , videoRouter);
app.use("/api/v1/comment" , commentRouter)
app.use("/api/v1/tweet" , tweetRouter)
app.use("/api/v1/like" , likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/subs" , subscriberRouter)

app.use(errorHandler)

export {app}
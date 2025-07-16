import {app} from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path : "./.env"
})

const PORT = process.env.PORT ||  8000


connectDB()
.then(() => {
    app.listen(PORT , () => {
        console.log(`Server is Listening on port : ${PORT} `)
    })
})
.catch((err) => {
    console.log("Mongodb connection error " , err)
})
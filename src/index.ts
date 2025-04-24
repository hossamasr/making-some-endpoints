import express from 'express'
import mongoose from "mongoose";
import userRoute from './routes/usersRoute'
const app = express();
const PORT=3000
app.use(express.json())
mongoose.connect(`mongodb://localhost:27017/ecommerce`).then(()=>{
    console.log("connection Success")
}).catch((err)=>{
    console.log("connection failed",err)
})

app.use('/user',userRoute)
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
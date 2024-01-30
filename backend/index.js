const express = require("express");
const mongoose = require('mongoose');
const app = express();

//connect to mongodb

// const connectDB =async()=>{
    mongoose.connect("mongodb://localhost:27017");
    const videoSchema = new mongoose.Schema({});
    const video = mongoose.model("video",videoSchema);
    const data = await video.find();
    console.warn(data);
// }

connectDB();


app.get("/",(req,resp)=>{
    resp.send("app is working...")
});

app.listen(5000);

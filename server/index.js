const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const VideoModel = require('./models/videos')

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/NutriTech")

app.post("/annotation/:videoId", async (req, res) => {
    const videoId = req.params.videoId;
  
    try {
      // Log the annotations data on the server
      console.log('Annotations data received on the server:', req.body.annotations);
  
      // Assuming VideoModel has a field called annotations, update it accordingly
      const updatedVideo = await VideoModel.findByIdAndUpdate(
        videoId,
        { $set: { annotations: req.body.annotations } ,
        status: 'annotated',
    },
        { new: true }
      );
  
      res.json(updatedVideo);
    } catch (error) {
      console.error('Error saving annotations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/annotationhistory/:videoId', async (req, res) => {
    try {
      const videoId = req.params.videoId;
  
      // Find annotations based on the videoId
      const video = await VideoModel.findOne({ _id: videoId });
  
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
  
      const annotations = video.annotations;
  
      res.json({ success: true, annotations });
    } catch (error) {
      console.error('Error fetching annotations:', error);
      res.status(500).json({ success: false, message: 'Error fetching annotations' });
    }
  });
  
  
app.post("/uploadvideo", (req, res) => {
    VideoModel.create(req.body)
        .then(videos => res.json(videos))
        .catch(err => res.json(err))
})

app.get("/all", async (req, res) => {
    try {
        const videos = await VideoModel.find();
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/unannotated-videos", async (req, res) => {
    try {
        const unannotatedVideos = await VideoModel.find({ status: 'unannotated' });
        res.json(unannotatedVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/annotated-videos", async (req, res) => {
    try {
        const annotatedVideos = await VideoModel.find({ status: 'annotated' });
        res.json(annotatedVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/history", async (req, res) => {
    try {
        const ITNVideos = await VideoModel.find({ uploader: 'ITN' });
        res.json(ITNVideos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(3001,()=>{
    console.log("server is running")
})

//connect to mongodb

// const connectDB =async()=>{
//     mongoose.connect("mongodb://localhost:27017");
//     const videoSchema = new mongoose.Schema({});
//     const video = mongoose.model("video",videoSchema);
//     const data = await video.find();
//     console.warn(data);
// // }

// connectDB();


// app.get("/",(req,resp)=>{
//     resp.send("app is working...")
// });

// app.listen(5000);

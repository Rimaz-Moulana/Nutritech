const express = require('express');
const config = require('./config/databaseMongo');
const cors = require('cors');
const mongoose = require('mongoose');
const videoRoutes = require('./src/routes/videoRoutes');
const annotationsRoutes = require('./src/routes/annotationRoutes')

const app = express();
const PORT = 3000;

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.use('/videos', videoRoutes);
  app.use('/annotations', annotationsRoutes);
  // app.use('/api',userRoutes);
  // app.use('/api/video', vidoeRoutes)
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });



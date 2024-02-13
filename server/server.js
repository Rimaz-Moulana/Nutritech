const express = require('express');
const config = require('./config/databaseMongo');
const cors = require('cors');
const mongoose = require('mongoose');
const vidoeRoutes = require('./src/routes/videoRoutes');
const annotationsRoutes = require('./src/routes/annotationRoutes')
const userRoutes = require('./src/routes/userRoutes')

const app = express();
const PORT = 3000;

// ...

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    .header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// ...

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


app.use(express.json());
// app.use('/api',userRoutes);
// app.use('/api/video', vidoeRoutes)

app.use('/api/videos', vidoeRoutes);
// app.use('/api/videos', videoRoutes);
// Routes
  // app.use('/videos', videoRoutes);
  app.use('/annotations', annotationsRoutes);
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });




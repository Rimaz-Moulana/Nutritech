const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const vidoeRoutes = require('./src/routes/videoRoutes')
const config = require('./config/databaseMongo');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*').header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS').header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); next(); });


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use(express.json());
app.use('/api',userRoutes);
// app.use('/api/video', vidoeRoutes)
app.use('/api/videos', vidoeRoutes);

 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


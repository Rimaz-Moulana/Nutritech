const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const vidoeRoutes = require('./src/routes/videoRoutes')
const config = require('./config/databaseMongo');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use(express.json());
app.use('/api',userRoutes);
app.use('/api/video', vidoeRoutes)

 app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


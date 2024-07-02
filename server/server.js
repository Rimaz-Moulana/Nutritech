const express = require('express');
const config = require('./config/databaseMongo');
const cors = require('cors');
const mongoose = require('mongoose');
const videoRoutes = require('./src/routes/videoRoutes');
const productRoutes = require('./src/routes/productRoutes');
const annotationsRoutes = require('./src/routes/annotationRoutes');
const userRoutes = require('./src/routes/routesUser');
const ruleRoutes = require('./src/routes/ruleRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Apply CORS middleware globally
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Preflight requests

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

app.use(express.json());

const path = require('path');
app.use('/videos', express.static(path.join(__dirname, 'Nutritech', 'server', 'uploads')));
app.use('/api/videos', videoRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/product', productRoutes);
app.use('/api', authRoutes);
app.use('/annotations', annotationsRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

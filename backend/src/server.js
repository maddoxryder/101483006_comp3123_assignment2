const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/employeeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

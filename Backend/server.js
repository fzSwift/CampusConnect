const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Error Handler
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("MongoDB URI:", process.env.MONGO_URI);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
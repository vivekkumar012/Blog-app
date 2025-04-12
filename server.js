import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import authRoute from './routes/authRoute.js';
import blogRoutes from './routes/blogRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static frontend
app.use(express.static(path.join(__dirname, './client/build')));

// API routes
app.use('/api/v1/user', authRoute);
app.use('/api/v1/blog', blogRoutes);

// Serve frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});

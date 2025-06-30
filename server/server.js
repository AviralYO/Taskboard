// server/server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('MongoDB connected'));

// Example Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

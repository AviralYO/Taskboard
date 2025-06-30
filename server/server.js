// server/server.js
import dotenv from 'dotenv';
dotenv.config({ debug: true });

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Example Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

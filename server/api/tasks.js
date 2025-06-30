import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Prevent multiple connections in dev
if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });
}

const taskSchema = new mongoose.Schema({
  title: String,
 completed: { type: Boolean, default: false },
});
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const task = new Task(req.body);
    await task.save();
    return res.status(201).json(task);
  } else {
    res.status(405).end(); // Method Not Allowed
    app.get('/', (req, res) => {
  res.send('API is running');
});

  }
}

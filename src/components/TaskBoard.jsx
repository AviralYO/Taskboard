import { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import TaskModal from './TaskModal';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';




function TaskBoard() {
  const sensors = useSensors(useSensor(PointerSensor));
  const { projects, selectedProjectId, updateTask } = useTaskStore();
  const project = projects.find((p) => p.id === selectedProjectId);
  
const [search, setSearch] = useState('');
const [priorityFilter, setPriorityFilter] = useState('');
const [sortBy, setSortBy] = useState('createdAt'); // or 'dueDate'

  const [openModal, setOpenModal] = useState(false);

  if (!project) return <div>Select a project to view tasks.</div>;

  // Apply filters
const filteredTasks = project.tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.assignee?.toLowerCase().includes(search.toLowerCase())
  )
  .filter((task) => (priorityFilter ? task.priority === priorityFilter : true))
  .sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    }
    return b.createdAt - a.createdAt; // default: most recent first
  });

// Group after filtering
const groupedTasks = {
  'To Do': [],
  'In Progress': [],
  Done: [],
};
filteredTasks.forEach((task) => {
  groupedTasks[task.status || 'To Do'].push(task);
});


  const handleDragEnd = (event) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const taskId = active.id;
  const newStatus = over.id;

  const task = project.tasks.find((t) => t.id === taskId);
  if (task && task.status !== newStatus) {
    updateTask(project.id, { ...task, status: newStatus });
  }
};


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-4 mb-6">
  
  {/* Filter Controls */}
  <div className="flex flex-wrap gap-4">
    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-3 py-2 border rounded w-full sm:w-1/3"
    />

    <select
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
      className="px-2 py-2 border rounded"
    >
      <option value="">All Priorities</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="px-2 py-2 border rounded"
    >
      <option value="createdAt">Sort by Created</option>
      <option value="dueDate">Sort by Due Date</option>
    </select>
  </div>
</div>

        <h2 className="text-2xl font-semibold">{project.name} – Tasks</h2>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          + Add Task
        </button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">


    {['To Do', 'In Progress', 'Done'].map((status) => (
      <StatusColumn
        key={status}
        id={status}
        title={status}
        tasks={groupedTasks[status]}
        projectId={project.id}
      />
    ))}
  </div>
</DndContext>
 {filteredTasks.length === 0 && (
  <p className="text-center text-gray-500 text-sm italic mt-6">
    No tasks match your filters. Try changing search or priority.
  </p>
)}

      {openModal && (
        <TaskModal onClose={() => setOpenModal(false)} projectId={project.id} />
      )}
    </div>
  );
}

function StatusColumn({ id, title, tasks, projectId }) {
  const { setNodeRef, isOver } = useDroppable({ id });


  return (
   <div
  ref={setNodeRef}
  className={`min-h-[200px] p-4 rounded-md border ${
    isOver ? "border-indigo-500 bg-indigo-50" : "border-transparent"
  }`}
>


  {tasks.length === 0 && (
    <div className="text-xs text-center text-gray-400 italic py-8 border border-dashed border-gray-300 rounded">
      Drop tasks here
    </div>
  )}
  {tasks.map((task) => (
    <DraggableTask key={task.id} task={task} projectId={projectId} />
  ))}

 
</div>

  );
}

function DraggableTask({ task, projectId }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id });
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
   <div
  ref={setNodeRef}
  {...listeners}
  {...attributes}
  className="border p-3 rounded bg-white dark:bg-gray-700 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
>
  <div className="flex justify-between items-center mb-2">
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        task.priority === 'High'
          ? 'bg-red-100 text-red-700'
          : task.priority === 'Medium'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-green-100 text-green-700'
      }`}
    >
      {task.priority}
    </span>
    <span className="font-semibold">{task.title}</span>
    <GripVertical className="w-4 h-4 text-gray-400" />
  </div>

  <div className="text-xs text-gray-500">{task.assignee || 'Unassigned'}</div>
  


</div>



 
        
      
    
  );
}

export default TaskBoard;

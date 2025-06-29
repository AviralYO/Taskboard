import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTaskStore = create(persist((set) => ({
  projects: [],
  selectedProjectId: null,

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: crypto.randomUUID(), tasks: [] }]
    })),

  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
      selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId
    })),

  selectProject: (id) => set({ selectedProjectId: id }),

  addTask: (projectId, task) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, tasks: [...p.tasks, { ...task, id: crypto.randomUUID(), createdAt: Date.now() }] }
          : p
      )
    })),

  updateTask: (projectId, updatedTask) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            }
          : p
      )
    })),

  deleteTask: (projectId, taskId) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
          : p
      )
    })),
}), {
  name: 'task-manager-store', // localStorage key
}));

export default useTaskStore;

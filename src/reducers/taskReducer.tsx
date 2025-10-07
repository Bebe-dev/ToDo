
import { createSlice } from "@reduxjs/toolkit";

type Task = {
  id: number;
  title: string;
  date: string;
  description: string;
};

type TasksState = {
  tasks: Task[];
  completedTasks: Task[];
};

const initialState:TasksState = {
  tasks: [
    { id: 1, title: "Task title", date: "2024-12-14", description: "Describe your task" },
    
  ],
  completedTasks: [],
};
const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
      
    },
    completeTask: (state, action) => {
      console.log(action.payload)
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [completedTask] = state.tasks.splice(taskIndex, 1); // Remove from tasks
        state.completedTasks.push(completedTask); // Add to completedTasks
      }
    },
    undoTask: (state, action) => {
      const taskIndex = state.completedTasks.findIndex((task:any) => task.id === action.payload);
      if (taskIndex !== -1) {
        const [task] = state.completedTasks.splice(taskIndex, 1);
        state.tasks.push(task);
      }
    },
    updateTask: (state, action) => {
      const {id, updates} = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
  },
});

export const { addTask, completeTask, undoTask, updateTask, deleteTask } = TaskSlice.actions;
export default TaskSlice.reducer;

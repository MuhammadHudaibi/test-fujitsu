import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [
    { id: uuidv4(), text: 'Belajar Redux-Saga', completed: true, category: 'Work' },
    { id: uuidv4(), text: 'Beli susu', completed: false, category: 'Personal' },
  ],
  filter: {
    status: 'all',
    category: 'all',
    keyword: '',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { text, category } = action.payload;
      state.items.push({ id: uuidv4(), text, category, completed: false });
    },
    toggleTask: (state, action) => {
      const task = state.items.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, newText, newCategory } = action.payload;
      const task = state.items.find(t => t.id === id);
      if (task) {
        task.text = newText;
        task.category = newCategory;
      }
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter } = tasksSlice.actions;

export const selectFilteredTasks = (state) => {
  const { items, filter } = state.tasks;
  return items.filter(task => {
    const statusMatch = filter.status === 'all' || 
                        (filter.status === 'completed' && task.completed) ||
                        (filter.status === 'active' && !task.completed);
    const categoryMatch = filter.category === 'all' || task.category === filter.category;
    const keywordMatch = task.text.toLowerCase().includes(filter.keyword.toLowerCase());
    return statusMatch && categoryMatch && keywordMatch;
  });
};

export default tasksSlice.reducer;
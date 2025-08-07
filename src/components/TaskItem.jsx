import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, editTask } from '../features/tasks/tasksSlice';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editCategory, setEditCategory] = useState(task.category);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: task.id, newText: editText, newCategory: editCategory }));
      setIsEditing(false);
    }
  };

  return (
    <div className={`flex items-center p-4 bg-white rounded-lg shadow-sm transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
      {isEditing ? (
        <div className="flex-grow flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow p-2 border-b-2 border-blue-500 focus:outline-none"
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="p-2 border-b-2 border-blue-500 focus:outline-none sm:w-32"
          />
          <div className="flex gap-2 justify-end mt-2 sm:mt-0">
            <button onClick={handleSave} className="text-green-500 hover:text-green-700 font-semibold">Simpan</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">Batal</button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTask(task.id))}
            className="h-6 w-6 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-grow mx-4">
            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.text}
            </p>
            <span className="text-xs text-white bg-gray-400 rounded-full px-2 py-0.5">{task.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
            </button>
            <button onClick={() => dispatch(deleteTask(task.id))} className="text-gray-400 hover:text-red-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
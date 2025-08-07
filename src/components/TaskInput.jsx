import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

function TaskInput() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ text, category }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Apa rencanamu hari ini?"
        className="flex-grow p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Kategori (e.g. Work)"
        className="p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition w-full sm:w-32"
      />
      <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition">
        Tambah
      </button>
    </form>
  );
}

export default TaskInput;
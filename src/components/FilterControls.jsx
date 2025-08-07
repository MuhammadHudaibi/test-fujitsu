import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../features/tasks/tasksSlice';

const FilterControls = () => {
  const dispatch = useDispatch();
  const { filter, items } = useSelector((state) => state.tasks);
  
  const categories = ['all', ...new Set(items.map(task => task.category))];

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ [key]: value }));
  };

  const statusButtons = [
    { label: 'Semua', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Selesai', value: 'completed' },
  ];

  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-600 w-20">Status:</span>
        <div className="flex flex-wrap gap-2">
          {statusButtons.map(btn => (
            <button
              key={btn.value}
              onClick={() => handleFilterChange('status', btn.value)}
              className={`px-3 py-1 text-sm rounded-full transition ${
                filter.status === btn.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-semibold text-gray-600 mb-1">Kategori</label>
          <select
            id="category-filter"
            value={filter.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'Semua Kategori' : cat}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="search-filter" className="block text-sm font-semibold text-gray-600 mb-1">Cari Tugas</label>
          <input
            id="search-filter"
            type="text"
            placeholder="Ketik untuk mencari..."
            value={filter.keyword}
            onChange={(e) => handleFilterChange('keyword', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
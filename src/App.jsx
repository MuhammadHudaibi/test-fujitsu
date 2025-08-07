import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskInput from "./components/TaskInput";
import FilterControls from "./components/FilterControls";
import TaskList from "./components/TaskList";
import TimeDisplay from "./components/TimeDisplay";
import { fetchDataStart } from "./features/externalApi/externalApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataStart());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <main className="container mx-auto max-w-2xl p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700">My To-Do List</h1>
          <TimeDisplay />
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <TaskInput />
          <FilterControls />
        </div>

        <TaskList />
      </main>
    </div>
  );
}

export default App;
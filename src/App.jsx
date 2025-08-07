import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskInput from "./components/TaskInput";
import FilterControls from "./components/FilterControls";
import TaskItem from "./components/TaskItem";
import Loader from "./components/Loader";
import { selectFilteredTasks } from "./features/tasks/tasksSlice";
import { fetchDataStart } from "./features/externalApi/externalApiSlice";

function App() {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useSelector((state) => state.api);

  useEffect(() => {
    // Panggil saga saat komponen pertama kali di-mount
    dispatch(fetchDataStart());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <main className="container mx-auto max-w-2xl p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700">My To-Do List</h1>

          {/* --- BAGIAN YANG DIUBAH UNTUK API-NINJAS --- */}
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm min-h-[50px] flex items-center justify-center">
            {apiLoading && <Loader small />}
            {apiError && `Error: ${apiError}`}
            {apiData && apiData.datetime ? (
              <div className="transition-opacity duration-500">
                Waktu di {apiData.timezone}: <strong>{apiData.datetime}</strong>
              </div>
            ) : (
              !apiLoading && <p>Gagal memuat data waktu.</p>
            )}
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <TaskInput />
          <FilterControls />
        </div>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada tugas. Saatnya bersantai!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

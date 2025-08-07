import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskInput from "./components/TaskInput";
import FilterControls from "./components/FilterControls";
import TaskItem from "./components/TaskItem";
import Loader from "./components/Loader";
import { selectFilteredTasks, reorderTasks  } from "./features/tasks/tasksSlice";
import { fetchDataStart } from "./features/externalApi/externalApiSlice";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTaskItem({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem task={task} />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.items);
  const filteredTasks = useSelector(selectFilteredTasks);
  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
  } = useSelector((state) => state.api);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      // Dapatkan posisi lama dan baru dari array SEMUA tugas
      const oldIndex = allTasks.findIndex((t) => t.id === active.id);
      const newIndex = allTasks.findIndex((t) => t.id === over.id);

      // Kirim action ke Redux untuk mengurutkan ulang
      dispatch(
        reorderTasks({ sourceIndex: oldIndex, destinationIndex: newIndex })
      );
    }
  }

  useEffect(() => {
    // Panggil saga saat komponen pertama kali di-mount
    dispatch(fetchDataStart());
  }, [dispatch]);

  const filteredTaskIds = filteredTasks.map((t) => t.id);

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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTaskIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <SortableTaskItem key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-10 px-6 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">
                    Tidak ada tugas yang cocok dengan filter Anda.
                  </p>
                  <p className="text-sm text-gray-400">
                    Coba ubah filter atau tambahkan tugas baru!
                  </p>
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
}

export default App;

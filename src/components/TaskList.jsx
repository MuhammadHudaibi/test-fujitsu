import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTasks, reorderTasks } from "../features/tasks/tasksSlice";

function TaskList() {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const filteredTaskIds = filteredTasks.map((t) => t.id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      dispatch(reorderTasks({ activeId: active.id, overId: over.id }));
    }
  }

  return (
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
  );
}

export default TaskList;

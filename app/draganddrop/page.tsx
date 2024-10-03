"use client";

import { DragEvent, useRef, useState } from "react";
import { dragAndDropData } from "./data";

const DragAndDropPage = () => {
  const [task, setTask] = useState(dragAndDropData);
  const dragRef = useRef({ item: "", container: "" });

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    item: string,
    container: string
  ) => {
    const target = e.target as HTMLDivElement;
    target.style.opacity = "0.5";
    dragRef.current.item = item;
    dragRef.current.container = container;
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.opacity = "1";
  };
  let index = 0;

  const handleDrop = (e: DragEvent<HTMLDivElement>, finalContainer: string) => {
    e.preventDefault();
    if (dragRef.current) {
      const startItem: string = dragRef.current.item;
      const startContainer: string = dragRef.current.container;
      if (startContainer !== finalContainer) {
        let newTask = { ...task };
        newTask[startContainer].task = [...newTask[startContainer].task].filter(
          (i) => i !== startItem
        );
        newTask[finalContainer].task.push(startItem);
        setTask({ ...newTask });
      }
    }
    dragRef.current = { item: "", container: "" };
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="page">
      <div
        className={`grid gap-10 mt-24`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            Object.keys(task).length,
            4
          )}, 1fr)`,
        }}
      >
        {Object.keys(task).map((container) => (
          <div
            key={container}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            className="bg-gray-100 min-h-96 p-6 rounded-lg shadow border border-gray-200 col-span-1"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {task[container].title}
            </h2>
            {task[container].task.map((item) => (
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, item, container)}
                onDragEnd={handleDragEnd}
                key={item}
                className="p-4 bg-white my-3 border border-gray-300 select-none cursor-move"
              >
                {item}
              </div>
            ))}

            {(!task[container].task || task[container].task.length === 0) && (
              <div
                // draggable
                // onDragStart={(e) => handleDragStart(e, item, container)}
                // onDragEnd={handleDragEnd}
                // key={item}
                className="p-4 bg-white my-3 border text-red-300 border-red-300 select-none"
              >
                No Task
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDropPage;

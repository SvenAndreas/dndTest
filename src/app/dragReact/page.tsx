"use client";
import { useState } from "react";
import TaskList from "../components/taskList/TaskList";

export default function DragPage() {
  const t = ["Limpiar", "Romper", "Correr", "Cocinar"];
  const t2 = [
    { task: "limpiar", type: "doing" },
    { task: "barrer", type: "ask" },
    { task: "cazar", type: "doing" },
    { task: "cocinar", type: "doing" },
    { task: "borddar", type: "ask" },
    { task: "comer", type: "wait" },
    { task: "cenar", type: "wait" },
    { task: "cs", type: "wait" },
    { task: "antes", type: "doing" },
  ];
  const [tasks, setTasks] = useState(t2);
  const [activeCard, setActiveCard] = useState<null | number>(null);
  const onDrop = (type: string, index: number) => {
    console.log(`${activeCard} is going on place ${type} on position ${index}`);
    if (activeCard === null || activeCard === undefined) return;
    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(index, 0,{...taskToMove,type:type});
    setTasks(updatedTasks)
  };
  return (
    <div className="flex w-full gap-2 px-4">
      <TaskList
        onDrop={onDrop}
        arrayOfTaks={tasks}
        type="doing"
        setActiveCard={setActiveCard}
      />
      <TaskList
        onDrop={onDrop}
        arrayOfTaks={tasks}
        type="wait"
        setActiveCard={setActiveCard}
      />
      <TaskList
        onDrop={onDrop}
        arrayOfTaks={tasks}
        type="ask"
        setActiveCard={setActiveCard}
      />
    </div>
  );
}

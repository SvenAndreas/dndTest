"use client";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import User from "./components/users/User";
import Button from "./components/buttons/Button";

export default function Home() {
  const [people, setPeople] = useState([
    "Osvalod",
    "Pedro",
    "Roberto",
    "Ramón",
    "Jorge",
    "Nicolas",
  ]);
  const [successOnMove, setSuccesOnMove] = useState<string | number | null>(
    null
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    if (over.id === "button") {
      const baseName = active.id.replace(/\d+$/, ''); // Eliminar números del final del nombre

    // Buscar el número más alto existente para el nombre base
    const existingNumbers = people
      .filter((name) => name.startsWith(baseName))
      .map((name) => {
        const match = name.match(/(\d+)$/);
        return match ? parseInt(match[0], 10) : 0;
      })
      .filter((num) => num > 0);

    const nextNumber = existingNumbers.length > 0
      ? Math.max(...existingNumbers) + 1
      : 1;

    // Crear el nuevo nombre
    const newName = `${baseName} ${nextNumber}`;

    // Obtener el índice del nombre original
    const currentIndex = people.findIndex((person) => person === active.id);

    // Insertar el nuevo nombre en el índice siguiente
    setPeople((prevPeople) => {
      const newPeople = [...prevPeople];
      newPeople.splice(currentIndex + 1, 0, newName);
      return newPeople;
    });
    } else {
      const oldIndex = people.findIndex((person) => person === active.id);
      const newIndex = people.findIndex((person) => person === over.id);
      const newOrder = arrayMove(people, oldIndex, newIndex);
      setSuccesOnMove(active.id)
      setPeople(newOrder);
    }
  };
  return (
    <div className="flex flex-col gap-10 bg-gray-50 min-h-screen justify-center items-center">
      <div className="w-3/12">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={people}
            strategy={verticalListSortingStrategy}
          >
            {/* <button ref={setNodeRef} {...listeners} {...attributes} className="rounded-full bg-white border-2 font-bold border-lime-400 w-3/6 p-2 duration-300 hover:bg-lime-400  text-black">
              COPY
              </button> */}
            <div className="flex flex-col gap-6">
              <Button buttonId="button" />

              <ul className="flex flex-col gap-2">
                {people.map((user) => (
                  <User
                    successOnMove={user === successOnMove}
                    user={user}
                    key={user}
                  />
                ))}
              </ul>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

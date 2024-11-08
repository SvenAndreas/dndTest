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
      const baseName = active.id as string;
      if(baseName === 'button' )return
      const nameWithOutNumber = baseName.replace(/\d+$/, "");
      const existingNumbers = people
        .filter((name) => name.startsWith(nameWithOutNumber))
        .map((name) => {
          const match = name.match(/(\d+)$/);
          return match ? parseInt(match[0], 10) : 0;
        })
        .filter((num) => num > 0);

      const nextNumber =
        existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

      const newName = `${nameWithOutNumber} ${nextNumber}`;

      const currentIndex = people.findIndex((person) => person === active.id);

      setPeople((prevPeople) => {
        const newPeople = [...prevPeople];
        newPeople.splice(currentIndex + 1, 0, newName);
        return newPeople;
      });
    } else {
      const oldIndex = people.findIndex((person) => person === active.id);
      const newIndex = people.findIndex((person) => person === over.id);
      const newOrder = arrayMove(people, oldIndex, newIndex);
      setSuccesOnMove(active.id);
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

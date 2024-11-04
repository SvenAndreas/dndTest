'use client'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

function User({ user,successOnMove }: { user: string, successOnMove:boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: user});
    //   console.log(successOnMove,'SUCCES ON MOVE')
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return <li style={style} ref={setNodeRef} {...attributes} {...listeners} className={`list-none  bg-gray-400 w-full p-2 active:bg-gray-500 rounded-md text-center ${successOnMove ? 'animate-flash' : '' }`}>{user}</li>;
}

export default User;

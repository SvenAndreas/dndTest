import { Dispatch, SetStateAction } from "react"


function Task({task,setActiveCard,index}:{task:string,setActiveCard:Dispatch<SetStateAction<null | number>>,index:number}) {
  return (
    <div className="bg-gray-100 w-full p-4 text-center font-semibold text-black" draggable onDragStart={()=>setActiveCard(index)} onDragEnd={()=>setActiveCard(null)} >{task}</div>
  )
}

export default Task
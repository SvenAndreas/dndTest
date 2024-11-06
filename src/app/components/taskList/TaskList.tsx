import { SetStateAction,Fragment } from "react";
import Task from "../tasks/Task";
import DropArea from "../dropArea/DropArea";
interface Task {
    task: string;
    type: string;
  }
function TaskList({
  arrayOfTaks,
  type,
  setActiveCard,
  onDrop
}: {
  arrayOfTaks: Task[];
  type: string;
  setActiveCard: React.Dispatch<SetStateAction<number | null>>;
  onDrop:(type:string,index:number)=>void
}) {
  return (
    <div className="w-6/12  flex flex-col items-center">
      <h2>{type}</h2>
      <DropArea onDrop={()=>onDrop(type,0)} />
      {arrayOfTaks.map((e, index) => (
        e.type === type &&(
        <Fragment key={e.task}>
          <Task setActiveCard={setActiveCard} task={e.task} index={index}/>
          <DropArea onDrop={()=>onDrop(type,index+1)}/>
        </Fragment>)
      ))}
    </div>
  );
}

export default TaskList;

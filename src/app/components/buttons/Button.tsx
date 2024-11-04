import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Button({buttonId}:{buttonId:string}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: buttonId});
      const style = {
        transform: CSS.Transform.toString(transform),
        transition
      }
  return (
    <button ref={setNodeRef} style={style} className="rounded-full bg-white border-2 font-bold border-lime-400 w-full p-2 duration-300 hover:bg-lime-400  text-black" {...attributes} {...listeners}>COPY</button>
  )
}

export default Button
import { Todos } from "@/hooks/useTodos";
import { useState } from "react";
import EditField from "./EditField";
interface ListItemProps {
  todo: Todos;
  handleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, value: string) => void;
}

const ListItem = ({
  todo,
  handleComplete,
  handleDelete,
  handleEdit,
}: ListItemProps) => {
  const [isEditable, setIsEditable] = useState(false);
  return (
    <div key={todo.id} className="todo-item">
      {isEditable ? (
        <EditField
          id={todo.id}
          title={todo.title}
          setIsEditable={setIsEditable}
          handleSubmit={handleEdit}
        />
      ) : (
        <span
          onClick={() => setIsEditable(true)}
          style={todo.isCompleted ? { textDecoration: "line-through" } : {}}
        >
          {todo.title}
        </span>
      )}
      <div>
        <span onClick={() => handleComplete(todo.id)}>
          {todo.isCompleted ? "✅" : "⌛"}
        </span>{" "}
        <span
          onClick={() => handleDelete(todo.id)}
          style={{ cursor: "pointer" }}
        >
          🗑️
        </span>
      </div>
    </div>
  );
};

export default ListItem;

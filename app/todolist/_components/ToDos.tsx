import { Todos } from "@/hooks/useTodos";
import ListItem from "./ListItem";

interface TodosListProps {
  todos: Todos[];
  handleComplete: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string, value: string) => void;
}

const TodosList = ({
  todos,
  handleComplete,
  handleDelete,
  handleEdit,
}: TodosListProps) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            todo={todo}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
};

export default TodosList;

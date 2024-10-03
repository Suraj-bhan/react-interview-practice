"use client";
import { useTodos } from "@/hooks/useTodos";
import TodosList from "./_components/ToDos";
import InputField from "./_components/InputField";
import "./style.css";

const ToDoListPage = () => {
  const { todos, addTodo, handleComplete, handleDelete, handleEdit } =
    useTodos();
  return (
    <div className="page pt-24">
      <InputField onAdd={addTodo} />
      <TodosList
        todos={todos}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default ToDoListPage;

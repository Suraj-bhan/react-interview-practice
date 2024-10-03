"use client";
import { useEffect, useState } from "react";
export interface Todos {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todos[]>([]);

  // useEffect(() => {
  //   setTodos(JSON.parse(localStorage.getItem("todos")!) || []);
  // }, []);

  const addTodo = (title: string) => {
    const newTodo = { id: new Date().toString(), title, isCompleted: false };
    setTodos((prev) => {
      return [...prev, newTodo];
    });
  };

  const handleComplete = (id: string) => {
    const todoCopy = todos.map((todo) => {
      if (todo.id === id) todo.isCompleted = !todo.isCompleted;
      return { ...todo };
    });

    setTodos([...todoCopy]);
  };

  const handleDelete = (id: string) => {
    const todoCopy = todos.filter((todo) => todo.id !== id);

    setTodos([...todoCopy]);
  };

  const handleEdit = (id: string, value: string) => {
    const todoCopy = todos.map((todo) => {
      if (todo.id === id) todo.title = value;
      return { ...todo };
    });

    setTodos([...todoCopy]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return { todos, addTodo, handleComplete, handleDelete, handleEdit };
};

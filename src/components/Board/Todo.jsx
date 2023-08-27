import React from "react";
import SingleTodo from "./SingleTodo";
import { useContext } from 'react';
import noteContext from "./";

const TodoList = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
    const context = useContext(noteContext);
    const notes = context.notes;
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>
        {notes.map((todo, index) => (
          <SingleTodo
            index={index}
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className="todos">
        <span className="todos__heading">Completed Tasks</span>
        {CompletedTodos.map((todo, index) => (
          <SingleTodo
            index={index}
            todos={CompletedTodos}
            todo={todo}
            key={todo.id}
            setTodos={setCompletedTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

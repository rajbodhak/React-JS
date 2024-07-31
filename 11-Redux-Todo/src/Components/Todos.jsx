import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, toggleComplete } from '../features/todo/todoSlice';

function Todos() {
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleEditClick = (todo) => {
    setEditableTodoId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveClick = (todo) => {
    dispatch(updateTodo({
      id: todo.id,
      text: editText,
    }));
    setEditableTodoId(null);
  };

  return (
    <div className="w-full max-w-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Todos</h2>
      <ul className="list-none space-y-4">
        {todos.map((todo) => (
          <li
            className={`flex gap-3 items-center px-4 py-2 rounded ${todo.completed ? 'bg-green-800' : 'bg-gray-800'}`}
            key={todo.id}
          >
            <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete({ id: todo.id }))}
            />
            {editableTodoId === todo.id ? (
              <input
                className="flex-grow text-black px-2 py-1 rounded"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>{todo.text}</span>
            )}
            {editableTodoId === todo.id ? (
              <button
                onClick={() => handleSaveClick(todo)}
                className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded"
                disabled={todo.completed}
              >
                ✏️
              </button>
            )}
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;

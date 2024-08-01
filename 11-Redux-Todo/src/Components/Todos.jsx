import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, toggleComplete } from '../features/todo/todoSlice';

function Todos() {
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const inputRef = useRef(null)

  useEffect(() => {
    if(editableTodoId !== null) {
      inputRef.current.focus();
    }
  }, [editableTodoId])

  const handleEditClick = (todo) => {
    console.log('Edit Clicked:', todo);
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
            className={`flex gap-3 items-center px-4 py-2 rounded ${todo.completed ? 'bg-green-600 ' : 'bg-gray-800'}`}
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
                ref={inputRef}
                className="flex-grow bg-transparent text-white px-2 py-1 rounded outline-none"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span className={`flex-grow ${todo.completed ? 'line-through text-gray-800' : 'text-white'}`}>{todo.text}</span>
            )}
            {editableTodoId === todo.id ? (
              <button
                onClick={() => handleSaveClick(todo)}
                className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 448 512"
                fill='#f4f4f4'
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                >
                
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(todo)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded"
                disabled={todo.completed}
              >
               <svg xmlns="http://www.w3.org/2000/svg"
               fill='#f4f4f4'
               viewBox="0 0 512 512"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
               >
               <path
               d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
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

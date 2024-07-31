import React from 'react';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-4xl font-bold mt-10">Learn about Redux Toolkit</h1>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;

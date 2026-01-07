import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:8003/todos');
    setTodos(await res.json());
  };

  const addTodo = async () => {
    await fetch('http://localhost:8003/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    });
    setTitle('');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🚀 Todo App FastAPI + React</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouveau todo..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={addTodo} style={{ padding: '10px 20px' }}>
          Ajouter
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.title}
            <span style={{ color: '#666', fontSize: '12px' }}>
              ID: {todo.id}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

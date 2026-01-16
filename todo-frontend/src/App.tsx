import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8003';

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching from:', `${API_URL}/todos`);
      const res = await fetch(`${API_URL}/todos`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTodos(data);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    try {
      setError('');
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTitle('');
      fetchTodos();
    } catch (err: any) {
      console.error('Add error:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <div style={{padding: '20px'}}>Chargement...</div>;
  if (error) return <div style={{padding: '20px', color: 'red'}}>Erreur: {error}</div>;

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

      {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

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
      
      <div style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
        Backend: {API_URL} | Status: ✅ Live
      </div>
    </div>
  );
}

export default App;

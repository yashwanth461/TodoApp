import React, { useState, useEffect } from 'react';
import '../TodoApp/Todo.css';

const TodoApp = () => {
  // State variables
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from the API endpoint
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  // Add a new task to the list
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        title: newTask,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  // Toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Edit the title of a task
  const editTask = (id, newTitle) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  // Delete a task from the list
  const deleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Filter the tasks based on the selected filter
  const filteredTodos = todos.filter(todo =>
    filter === 'completed' ? todo.completed : true
  );

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-field">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTaskCompletion(todo.id)}
            />
            <input
              type="text"
              value={todo.title}
              onChange={e => editTask(todo.id, e.target.value)}
              disabled={todo.completed}
              className={todo.completed ? 'completed' : ''}
            />
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
        }  
export default TodoApp;

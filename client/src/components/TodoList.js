import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => (
  <tr>
    <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
    <td className={props.todo.completed ? 'completed' : ''}>{props.todo.user}</td>
    <td>
      <Link to={"/edit/"+props.todo._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteTodo(props.todo._id) }}>delete</a>
    </td>
  </tr>
);

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const deleteTodo = (id) => {
    axios.delete('http://localhost:5000/todos/'+id)
      .then(response => { console.log(response.data)});

    setTodos(todos.filter(el => el._id !== id));
  };

  const todoList = () => {
    return todos.map(currenttodo => {
      return <Todo todo={currenttodo} deleteTodo={deleteTodo} key={currenttodo._id}/>;
    })
  };

  return (
    <div>
      <h3>Todos List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Description</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { todoList() }
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

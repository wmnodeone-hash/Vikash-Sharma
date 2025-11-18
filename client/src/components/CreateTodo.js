import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTodo = () => {
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUser(response.data[0].username);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const todo = {
      description,
      user,
    };

    console.log(todo);

    axios.post('/todos/add', todo)
      .then(res => console.log(res.data));

    window.location = '/';
  };

  return (
    <div>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>User: </label>
          <select
            required
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}>
            {
              users.map(function(user) {
                return <option
                  key={user}
                  value={user}>{user}
                  </option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <input type="submit" value="Create Todo" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;

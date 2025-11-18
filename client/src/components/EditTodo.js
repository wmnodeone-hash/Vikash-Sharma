import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditTodo = () => {
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get('/todos/'+id)
      .then(response => {
        setDescription(response.data.description);
        setCompleted(response.data.completed);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const todo = {
      description,
      completed,
    };
    console.log(todo);
    axios.post('/todos/update/' + id, todo)
      .then(res => console.log(res.data));
    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Todo</h3>
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
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <label className="form-check-label">Completed</label>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Todo" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditTodo;

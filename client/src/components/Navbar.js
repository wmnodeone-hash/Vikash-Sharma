import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Todo List</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {token && (
            <>
              <li className="navbar-item">
                <Link to="/" className="nav-link">Todos</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Todo</Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {token ? (
            <li className="navbar-item">
              <button onClick={onLogout} className="btn btn-link nav-link">Logout</button>
            </li>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/user" className="nav-link">Register</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

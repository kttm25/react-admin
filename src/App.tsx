import React from 'react';
import './App.css';
import Users from './pages/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={Dashboard} />
          <Route path={'/users'} Component={Users} />
          <Route path={'/register'} Component={Register} />
          <Route path={'/login'} Component={Login} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

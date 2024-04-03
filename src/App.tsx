import React from 'react';
import './App.css';
import Users from './pages/Users/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import UserCreate from './pages/Users/UserCreate';
import UserEdit from './pages/Users/UserEdit';
import Roles from './pages/Roles/Roles';
import RolesCreate from './pages/Roles/RolesCreate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={Dashboard} />
          <Route path={'/register'} Component={Register} />
          <Route path={'/login'} Component={Login} />
          <Route path={'/users'} Component={Users} />
          <Route path={'/users/create'} Component={UserCreate} />
          <Route path={'/users/edit'} Component={UserEdit} />
          <Route path={'/roles'} Component={Roles} />
          <Route path={'/roles/create'} Component={RolesCreate} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

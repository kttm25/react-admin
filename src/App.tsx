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
import RolesEdit from './pages/Roles/RolesEdit';
import Products from './pages/Products/Products';
import ProductsCreate from './pages/Products/ProductsCreate';
import ProductsEdit from './pages/Products/ProductsEdit';
import Orders from './pages/Orders/Orders';
import Profil from './pages/Profil';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={Dashboard} />
          <Route path={'/profil'} Component={Profil} />
          <Route path={'/register'} Component={Register} />
          <Route path={'/login'} Component={Login} />
          <Route path={'/users'} Component={Users} />
          <Route path={'/users/create'} Component={UserCreate} />
          <Route path={'/users/edit'} Component={UserEdit} />
          <Route path={'/roles'} Component={Roles} />
          <Route path={'/roles/create'} Component={RolesCreate} />
          <Route path={'/roles/edit'} Component={RolesEdit} />
          <Route path={'/products'} Component={Products} />
          <Route path={'/products/create'} Component={ProductsCreate} />
          <Route path={'/products/edit'} Component={ProductsEdit} />
          <Route path={'/orders'} Component={Orders} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Users from './components/pages/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} Component={Dashboard} />
          <Route path={'/users'} Component={Users} />
          <Route path={'/register'} Component={Register} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

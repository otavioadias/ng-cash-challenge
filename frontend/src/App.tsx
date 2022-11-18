import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthProvider/AuthContext';
import Login from './Pages/Login';
import SingUp from './Pages/SingUp';
import Home from './Pages/Home';
import PrivateRoute from './Components/Auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SingUp />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;

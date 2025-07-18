import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';


function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('token'));

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
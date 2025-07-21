import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AuthRedirect from './components/AuthRedirect';

function App() {
  return (
    <div className='font-sans'>
      <Navbar />
      <Routes>
        <Route path='/' element={<AuthRedirect />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
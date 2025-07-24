import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UnblockToken from './pages/UnblockToken';
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
        <Route path='/unblock-token' element={<UnblockToken />}/>
        
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
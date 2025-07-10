import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Navbar from './components/Navbar';


function App() {
  const loggedIn = false;

  return (
    <>
      <Navbar loggedIn={loggedIn}/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
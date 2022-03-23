import { Route, Routes } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import  Navbar from './component/Navbar';
import  Home  from './component/Home';
import  Signup  from './component/signup/Signup';
import  Login  from './component/login/Login';
import Admin from './component/admin/Admin';
import Coordinators from './component/coordinator/Coordinator';

function App() {
  return (
   <>
   <Navbar/>
     <Routes>
  <Route path="/" element={<Home />} /> 
  <Route path="/Admin/*" element={<Admin />} /> 
  <Route path="/Signup" element={<Signup />} /> 
  <Route path="/Login" element={<Login />} /> 
  <Route path="/coordinators/*" element={<Coordinators />} /> 
   
</Routes>
      </>
  );
}

export default App;

import Container from 'react-bootstrap/Container';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppLayout from './Components/AppLayout';
import Registerform from './Components/RegisterForm';
import Login2 from './pages/Login2';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import DashNav from './Components/DashNav';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  //Value of UserDetails represent whether user is logged in or not
  const [userDetails, setUserDetails] = useState(null);

  const isUserLoggedIn=async() =>{
    try{
      const response=await axios.post('http://localhost:5001/auth/is-user-logged-in',
        {},{withCredentials:true});
        setUserDetails(response.data.user);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    isUserLoggedIn();
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={
          userDetails? (
            <Navigate to="/dashboard" />) :(
            <AppLayout>
              <Home />
            </AppLayout>)
          } />
        <Route path="/login" element={
          userDetails? (
            <Navigate to="/dashboard" />) :(
          <AppLayout>
            <Login setUser={setUserDetails} />
          </AppLayout>)
        } />
        <Route path="/registerf" element={
          userDetails? (
            <Navigate to="/dashboard" />):(
          <AppLayout>
            <Registerform setUser={setUserDetails}/>
          </AppLayout>)
        } />
        <Route path="/login2" element={
          userDetails? (
            <Navigate to="/dashboard" />) :(
          <AppLayout>
            <Login2 setUser={setUserDetails}/>
          </AppLayout>)
        } />
        <Route path="/dashboard" element={
          userDetails? (
            <DashNav>
            <Dashboard user={userDetails}/>
            </DashNav>
            ) :(
              <Navigate to="/login2" />
            )
          
        } />

        <Route path="/logout" element={
          userDetails?(
            <Logout setUser={setUserDetails}/>
          ):(
            <Navigate to="/login2"/>
          )
        }/>
      </Routes>
    </>
  )
}

export default App

import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import About from './Components/About';
import ForgotPassword from './Components/ForgotPassword';
import Contact from './Components/Contact';
import Resume from './Components/Resume';
import ResumeCreatePost from './Components/ResumeCreatePost';

import Profile from './Components/Profile';
import Userprofile from './Components/Userprofile';
import Showuserpost from './Components/Showuserpost';
import Showpost from './Components/Showpost';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || '');
  return (
    <>



    <BrowserRouter>
    
    
        <Routes>
       
             <Route path='/'  element={<Login setAccessToken={setAccessToken} /> }/>
        
             <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          

<Route
          path="/about"
          element={
            <ProtectedRoute>
              {() => <About />}
            </ProtectedRoute>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoute>
              {() => <Contact />}
            </ProtectedRoute>
          }
        />
        <Route
          path="createpost"
          element={
            <ProtectedRoute>
              {() => <ResumeCreatePost />}
            </ProtectedRoute>
          }
        />
        <Route
          path="resume"
          element={
            <ProtectedRoute>
              {() => <Resume />}
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              {() => <Profile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="userprofile"
          element={
            <ProtectedRoute>
              {() => <Userprofile />}
            </ProtectedRoute>
          }
        />
      
        <Route
          path="showpost"
          element={
            <ProtectedRoute>
              {() => <Showpost />}
            </ProtectedRoute>
          }
        />
        <Route
          path="showuserpost"
          element={
            <ProtectedRoute>
              {() => <Showuserpost />}
            </ProtectedRoute>
          }
        />
          </Routes>
          
    
          </BrowserRouter>
    
    
      
    
         
    
    
        
    </>
  );
}

export default App;

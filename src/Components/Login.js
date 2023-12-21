import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Css/Login.css'
import logo from '../Photos/Navbar/dei-logo.png'
import { useEffect } from 'react';

const Login = ({ setAccessToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      window.location.href="/about"; // Redirect to the home page if logged in
    }
  }, [navigate]);

  

  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
  
        if (response.status === 200) {
          let access_token =response.data.access_token
          localStorage.setItem('access_token', access_token);
          setAccessToken(access_token);
          console.log('Access Token:', access_token);
          alert('login successful')
          navigate('/about');
          
        } else {
          
        }
      } catch (error) {
        console.log('Invalid login')
        setErrorMessage('Invalid login. Please try again.');
        setTimeout (() =>{
          setErrorMessage(null);
        }, 2000)
      }
    };
    return (

        <>
        <div className="login">
         <div className="container">
        
                 <div className="row login-box g-0">
                 
                 <div  className="col-sm-12 col-md-6 login-img">
                         <div  className="loginimg-box">
                             <img  draggable="false" src={logo} alt=""/>
                           </div>
                   
                     </div>
                     <div className="col-sm-12 col-md-5 single-login g-0">
                         <h5 className="heading">LOGIN INTO DEI ALUMNI</h5>
                         <form className="login-form" onSubmit={handleLogin}>
                             <div className="mb-4 field">
                            
                               <input type="email" className="form-control"  value={email}
                                       onChange={(e) => setEmail(e.target.value)} placeholder='EMAIL' required/>
                               <i className="fas fa-envelope"></i>
                       
                             </div>
                             <div className="mb-4 field">
                             
                               <input type="password" className="form-control" value={password}
                                      onChange={(e) => setPassword(e.target.value)} placeholder='PASSWORD' required />
                               <i className="fas fa-unlock-alt" ></i>
                             </div>
                             <div className="mt-5 login-btn">
                               
                                 <button type="submit"  className="button ">Sign In</button>
                                 <p className=' errorMessage mt-1'>{errorMessage}</p>
         
                             </div>
                          
     
                           </form>
                    
                         <div className="box">
                             <Link to="/forgotPassword" className="forget-btn">Forget Password</Link>
                             <h5 className="mt-4 signUp-btn">
                                 Don't have an account ? <Link to="/register">sign up</Link>
                             </h5>
                         </div>
                     </div>
                 </div>
       
         
           
         </div>
      </div>
         
        </>
        );
    };
    
    export default Login;
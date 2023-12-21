import React, { useState } from 'react';
import { Link } from "react-router-dom";

import VerifyEmail from './VerifyEmail';
import axios from 'axios';
import logo from '../Photos/Navbar/dei-logo.png';
import '../Css/Register.css'





export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');
  const [university, setUniversity] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  

    const handleRegistration = async (e) => {
      e.preventDefault();
     
      try {
       await axios.post('http://localhost:5000/register', { username: username, email: email,
        password: password, confirmPassword: confirmPassword, university: university,});
        setVerificationSent(true);
      
      } catch (error) {
        if (error.response && error.response.data.error) {
          setErrorMessage(error.response.data.error);
          setTimeout (() =>{
            setErrorMessage(null);
          }, 1000)
        }
      }
    };
   
        
      

  
    return (
     <>
     <div>
     {!verificationSent ? (
     <div class="register">
          <div class="container ">
              <div class="row  register-box g-0">
                  <div class="col-sm-12 col-md-6">
                      <div class="img-box">
                          <img draggable="false" src={logo}  alt=""/>
                        </div>
                  </div>
                  <div class="col-sm-12 col-md-5 g-0">
                          <h1 class="heading">Create a new account</h1>
                          <p class="para">Come join our community! <br/> Already have one? <br/> <Link to="/" class="signIn-btn">Sign In</Link></p>
                          <div class="single-form g-0">
                              <form onSubmit={handleRegistration}>
                              <div className="form-group">
                                  <div class="mb-2 field-register">
                                      <label class="form-label">USERNAME:</label>
                                      <input type="text" class="form-control"  value={username}
                                            onChange={(e) => setUsername(e.target.value)}  required/>
                                            <i class="fas fa-user"></i>
                                    </div>
                                  <div class="mb-2 field-register">
                                      <label  class="form-label">EMAIL:</label>
                                      <input type="email" class="form-control"  value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                                      <i className="fas fa-envelope"></i>
                                    </div>
                                    <div class="mb-2 field-register">
                                      <label class="form-label">PASSWORD:</label>
                                      <input type="password" class="form-control"  value={password}
                                        onChange={(e) => setPassword(e.target.value)}  required/>
                                     <i class="fas fa-lock"></i>
                                    </div>
                                    <div className="mb-2 field-register">
                                      <label className="form-label">CONFIRM_PASSWORD:</label>
                                      <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                      <i class="fas fa-lock"></i>
                                    </div>
                                    <div className="mb-4 field-register">
                                      <label className="form-label">UNIVERSITY:</label>
                                      <input type="text" className="form-control" value={university} onChange={(e) => setUniversity(e.target.value)} required/>
                                      <i class="fas fa-university"></i>
                                    </div>
                                    <div class=" register-btn">
                                        
                                        <button type="submit" className="button">  Sign Up </button>
                                        {errorMessage && <p className='mt-2 errorMessage'>{errorMessage}</p>}
                                    
                                     </div>
                                     </div>
                              </form>
  
                          </div>
                          <p class="paragraph">You can also sign in with these:</p>
                      
                          <div class="google-btn">
                          <Link to=""  class="button ">Google</Link>
                            
    
                   
                          </div>
                        <div class="facebook-btn">
                          <Link to=""  class="button ">Facebook</Link>
                        </div>
                     <div class="twitter-btn">
                      <Link to=""  class=" button">Twitter</Link>
                     </div>
                         
  
                    
                  </div>
              </div>
          </div>
      </div>
  ) : (
    <VerifyEmail email={email} />
  )}
      </div>
      </>
    )
  }
import React, { useState } from 'react';
import axios from 'axios';
import VerificationCode from './VerificationCode';
import { useNavigate } from 'react-router-dom';
import '../Css/ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSendVerification = async () => {
    if(!email){
      setErrorMessage('Please enter your email.');
      setTimeout (() =>{
        setErrorMessage(null);
      }, 2000)
      return;
    }
    try {
       await axios.post('http://localhost:5000/send_verification_email', { email });
      
      setVerificationSent(true);
    
    } catch (error) {
      
      setErrorMessage('Email does not exist. Please try again.');
      setTimeout (() =>{
        setErrorMessage(null);
      }, 2000)
    }
  };
  const handleCancel = async () => {
    navigate('/login');
  }

  return (
    <div>
     
      {!verificationSent ? (
        <div class="forgotPage">
        <div class="container  pt-5">
        <div class="row">
            <div class="col-12 col-sm-9 col-md-6 m-auto">
                <div class="forgot-box ">
                    <h3 class="forgot-heading mb-3">Find Your Account</h3>
                    <div class="line"></div>
                    <div class="forgot-field">
                        <span>Please enter your email address to search for your account.</span>
                        <p>Enter your email address: </p>
                        <div class="email-box">
                            <input
                    class="form-control  mt-2"
                    type="email"
                    placeholder="Email address"
                    value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                  />
                
                        </div>
                    </div>
                    <p className=' errorMessage mt-1'>{errorMessage}</p>
                    <div class="line"></div>
                    <div class="forgot-button mt-3">
                        <button class="cancel-btn me-2" onClick={handleCancel}>Cancel</button>
                        <button class="search-btn" onClick={handleSendVerification}>Search</button>
                       
                    </div>
                </div>
            </div>
        </div>
        </div>
            </div>
      ) : (
        <VerificationCode email={email} />
      )}
    </div>
  );
}

export default ForgotPassword;

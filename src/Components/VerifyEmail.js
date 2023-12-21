import React, { useState } from 'react';
import axios from 'axios';
import '../Css/VerifyEmail.css'
import { useNavigate } from 'react-router-dom';


function VerifyEmail({ email }) {
    const [code, setCode] = useState('');
   
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleVerifyEmail = async () => {
        if(!code){
          setErrorMessage('Please enter a code.');
          setTimeout (() =>{
            setErrorMessage(null);
          }, 2000)
          return;
        }
        try {
         const response = await axios.post(' http://localhost:5000/verify_email', { email, code });
      
         if (response.status === 200){
        
          setErrorMessage('Verification code sent.');
          setTimeout (() =>{
            setErrorMessage(null);
          }, 2000)

         
          navigate('/login');
         }

     
        } catch (error) {
        
          setErrorMessage('Email does not exist')
          setTimeout (() =>{
            setErrorMessage(null);
          }, 2000)
        
        }
      };
      const handleCancelbtn = async () => {
          navigate('/login');
      }
    

    return (
        <div className="verificationPage">
            <div className="container pt-5">
          <div className="row">
          <div className="col-12 col-sm-9 col-md-6 m-auto">
                  <div className="verification-box">
                      <h4 className="verification-heading mb-3">
                          Enter Email Verification Code
                      </h4>
                      <h3 className="verification-heading  ">Enter the 6-digit code:</h3>
                      <div className="verify-line"></div>
                      <div className="verification-field">
                          <span>Please check your emails for a message with your code. Your code is 6 numbers long.</span>
                          <p>Enter Verify Email code </p>
                          <div
                           className="verification-container mt-2">
                            <div class="row">
                                    <div class="col-12 verification-search"> 
                                        <input
                                        class="form-control  "
                                        type="text"
                                        placeholder="Enter code"
                                        value={code}
                            onChange={(e) => setCode(e.target.value)}
                                       
                                      /></div>
                                        </div>
                          </div>

                             
                       
                      </div>
                      <p className=' errorMessage'>{errorMessage}</p>
                      <div className="verification-line"></div>
                      <div className="verification-button mt-3">
                          <button className="resend-button me-2" onClick={handleCancelbtn}>Cancel</button>
                          <button className="verification-btn" onClick={handleVerifyEmail}>Verify</button>
                         
                      </div>
            </div>
          </div>
        </div>
</div>
</div>
        );
}

export default VerifyEmail;

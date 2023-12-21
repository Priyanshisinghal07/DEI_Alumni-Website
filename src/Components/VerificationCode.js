
import React, { useState } from 'react';
import axios from 'axios';
import '../Css/VerificationCode.css'
import PasswordReset from './PasswordReset';

function VerificationCode({ email }) {
  const [code, setCode] = useState('');
  const [verifyCode, setVerifyCode] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');



  const handleVerifyCode = async () => {
    if(!code){
      setErrorMessage('Please enter a code.');
      setTimeout (() =>{
        setErrorMessage(null);
      }, 2000)
      return;
    }
    try {
     const response = await axios.post(' http://localhost:5000/verify_code', { email, code });
     if (response.status === 200){
      setVerifyCode(true);
      setErrorMessage('Verification code sent.');
      setTimeout (() =>{
        setErrorMessage(null);
      }, 2000)
     }
 
    } catch (error) {
    
      setErrorMessage('Invalid Code. Please try again.')
      setTimeout (() =>{
        setErrorMessage(null);
      }, 2000)
      
    }
  };
const handleResendCode = async () => {
  try{
    await axios.post('http://localhost:5000/send_verification_email', { email });
    setErrorMessage('Verification code sent.');
    setTimeout (() =>{
      setErrorMessage(null);
    }, 2000)
  }catch(error){
    setErrorMessage('An error occurred. Please try again.')
    setTimeout (() =>{
      setErrorMessage(null);
    }, 2000)
  }

}

  return (
    <div>
    
    {!verifyCode ? (
  
       
      <div className="verifyPage">
      <div className="container pt-5">
          <div className="row">
              <div className="col-12 col-sm-9 col-md-6 m-auto">
                  <div className="verify-box">
                      <h4 className="verify-heading mb-3">
                          Enter Security Code
                      </h4>
                      <h3 className="verify-heading  ">Enter the 6-digit code sent to:</h3>
                      <h6 className="verify-heading mb-3">{email}</h6>
                      <div className="verify-line"></div>
                      <div className="verify-field">
                          <span>Please check your emails for a message with your code. Your code is 6 numbers long.</span>
                          <p>Enter Dei Alumni code </p>
                          <div
                           className="verify-container mt-2">
                            <div class="row">
                                    <div class="col-lg-5 col-md-4 col-sm-12 verify-search"> 
                                        <input
                                        class="form-control  "
                                        type="text"
                                        placeholder="Enter code"
                                        value={code}
                            onChange={(e) => setCode(e.target.value)}
                                       
                                      /></div>
                                    <div class="col-lg-7 col-md-8  col-sm-12 verify-profile mt-1  ">
                                        <div >
                                            <h5>
                                              We sent your code to:</h5>
                                            <span >{email}</span>
                                          </div>
                                    </div>
                                   </div>
                          </div>

                             
                       
                      </div>
                      <p className=' errorMessage'>{errorMessage}</p>
                      <div className="verify-line"></div>
                      <div className="verify-button mt-3">
                          <button className="resend-btn me-2" onClick={handleResendCode}>Resend Code</button>
                          <button className="verify-btn" onClick={handleVerifyCode}>Verify</button>
                         
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
       ) : (
        <PasswordReset email= {email} />
      )}
    
    </div>
  );
}

export default VerificationCode;

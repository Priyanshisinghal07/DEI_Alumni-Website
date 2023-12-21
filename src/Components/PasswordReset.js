import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Css/PasswordReset.css'

function PasswordReset({ email }) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleResetPassword = async () => {
    if(!password){
      setErrorMessage('Please enter a new password.');
      setTimeout (() =>{
        setErrorMessage(null);
      }, 2000)
      return;
    }
    try {
      // Send a POST request to your Flask API to reset the password
      const response = await axios.post('http://localhost:5000/reset-password', { email, password });
      
    
      if (response.status === 200) {

        
        
        setErrorMessage('Password has changed.');
        setTimeout (() =>{
          setErrorMessage(null);
        }, 2000)
        navigate('/login');
        
      }
    } catch (error) {
    
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
        setTimeout (() =>{
          setErrorMessage(null);
        }, 2000)
      }
    }
  };

  return (
    <div>

       
       <div className='passwordReset'>
       <div class="container  pt-5">
        <div className='row'>
        <div class="col-12 col-sm-9 col-md-6 m-auto">
          <div className='password-box'>
            <h4 className='password-heading mb-3'> Choose a new password  </h4>

              <div className='password-line'> </div>
              <div class="password-field">
                <span>A strong password is a combination of special characters. It must be at least 8 characters long.</span>
                <p className='mt-2'>Enter a new password</p>
                <div className='newPassword-box'>
                    <input className="form-control  mt-3"
          type="password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                </div>

              </div>
              <p className=' errorMessage mt-1'>{errorMessage}</p>
              <div className='password-line'> </div>
              <div className='password-button mt-3'>
            <button className='change-btn' onClick={handleResetPassword}>Change</button> 
              </div>
          </div>
        </div>
        </div>
       </div>
       </div>
       
      
    </div>
  );
}

export default PasswordReset;

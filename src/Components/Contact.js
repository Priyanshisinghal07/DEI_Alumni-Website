import React from 'react'
import image from '../Photos/Contact/contact-img.png'
import '../Css/Contact.css'
import  { useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
  

    const handleSubmit = async () => {
      
        if(phone.length < 10){
          setErrorMessage('Enter the 10 digit number.')
          setTimeout (() =>{
            setErrorMessage(null);
          }, 1000)
          return;
        }
        try {
           await axios.post('http://localhost:5000/send-email', { name, email, phone, message });
          
      
            // Clear input fields after submission
           setName('');
           setEmail('');
           setPhone('');
           setMessage('');
           Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            
            customclassName: {
                popup: 'custom-popup',
                 // Add custom CSS className
                  icon: 'custom-icon',
                  title: 'custom-title',
              },
              iconHtml: '<span className="custom-checkmark">✓</span>',
        }).then(() => {
            navigate('/about');
           
          
          });
     
        } catch (error) {
           // Show error message
         Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send email. Please try again.',
        customclassName: {
            popup: 'custom-popup',
             // Add custom CSS className
              icon: 'custom-icon',
              title: 'custom-title',
          },
          iconHtml: '<span className="custom-checkmark">✓</span>',
      });
        }
      };
     
  return (
  <>
 <div className="contact">
        <div className="form-area">
        <h1 className="contact-heading"><i className="fas fa-headset" ></i>Get In <span> Touch</span></h1>
    <div className="container">
        <div className="row contact-form g-0">
            <div className="col-sm-12 col-lg-6 p-4 ps-5">
                <div className="contact-img">
                    <img draggable="false" src={image} alt=""/>
                </div>
            </div>
        <div className="col-sm-12 col-lg-6 p-4 pr-5">
        <div className="content">
        <form onSubmit={handleSubmit} >
<div className="form-group">
    <div className="contact-field mb-3 mt-3">
        <input type="text"  className="form-control" placeholder="Name"
          value={name}  onChange={(e) => setName(e.target.value)} required/>
        <i className="fas fa-user"></i>
    </div>
     <div className="contact-field mb-3">
        <input type="email"  className="form-control" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required/>
        <i className="fas fa-envelope"></i>
     </div>
    
    <div className="contact-field mb-3">
        <input type="integer"  className="form-control" placeholder="Phone" value={phone}
          onChange={(e) => setPhone(e.target.value)} required/>
         
        <i className="fas fa-phone-alt"></i>
      
    </div>
   
    <p className='  mt-4'>{errorMessage}</p>
  
     <div className="message mb-3">
        <textarea name="message"  className="form-control" placeholder=" Message" value={message}
          onChange={(e) => setMessage(e.target.value)} required ></textarea>
        <i className="fas fa-comment-dots"></i>
     </div>
    <div className="contact-btn">

        <button type="submit" className="button">  Submit </button>
         
       
    </div>
</div>
    </form>
</div>
</div>  
</div>
</div>     
    </div>

   </div>
   

   </>
  );
}
export default Contact;
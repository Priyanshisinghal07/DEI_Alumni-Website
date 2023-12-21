import React from 'react'
import { Link } from "react-router-dom";
import exit from '../Photos/Navbar/exit.png'
import '../Css/Navbox.css'
export default function Navbox({isOpen,onClose}) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/'; // Redirect to the login page after logout
  };
    if(!isOpen){
        return null;
    }
  return (
    <div className="navBox">
    <img src={exit} onClick={onClose} alt=""  style={{height:"25px",width:"40px",marginLeft:"70px",marginTop:"-20px"}}/>

  <div className="navBox-link "><Link to='/about' onClick={onClose} class='button About' >About</Link> </div>
  <div className="navBox-link "><Link to='/profile' onClick={onClose} class='button Profile' >Profile</Link> </div>
  
  <div className="navBox-link"><Link to="/contact" onClick={onClose} class='button' >Contact us</Link></div>
  <div className="navBox-link"><Link to="" onClick={handleLogout} class='button' >Logout</Link></div>
</div>
  )
}

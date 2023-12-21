import React from 'react'
import '../App.css';
import '../Css/ResumeSidebar.css'
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    


<div className="container sticky marginside shadow side-cont sidebar " >

 
 <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto align-items-center ">
  <li className="Important nav-item sidebar-text mt-4" ><b>Important Links</b></li>
  <li className="nav-item sidebar-text">
    <Link className="nav-link active" aria-current="page" to="#">Home</Link>
  </li>
  <li className="nav-item sidebar-text">
    <Link className="nav-link active" to="/about">About</Link>
  </li>
  <li className="nav-item sidebar-text">
    <Link className="nav-link active" to="/createPost">Post</Link>
  </li>
  <li className="nav-item sidebar-text">
    <Link className="nav-link active" to="/contact">Contact Us</Link>
  </li>
 
  
  
</ul>

</div>


  )
}

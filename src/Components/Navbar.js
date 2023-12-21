
import React from 'react'
import Logo from '../Photos/Navbar/dei-logo.png'
import Home from '../Photos/Navbar/home.png'
import About from '../Photos/Navbar/about.png'
import Job from '../Photos/Navbar/jobs.png'
import Resume from '../Photos/Navbar/resume.png'
import Chat from '../Photos/Navbar/message.png'
import User from '../Photos/Navbar/user.png'
import News from '../Photos/Navbar/news.png'
import Navbox from './Navbox'
import '../Css/Navbar.css'
import { useState } from 'react'
import { Link } from "react-router-dom";




export default function Navbar() {
  const[isContainerOpen,setIsContainerOpen]=useState(false);
 
 const handlecontaineropen=()=>{
  setIsContainerOpen(true);
 }
 const handlecontainerclose=()=>{
  setIsContainerOpen(false);
 }
  return (
    <div>
        <div className="nav-bar fixed-top">
      <div className="nav-top ">
        <nav className="navbar  navbar-light bg-light shadow-lg  rounded ">
        
            <Link className="navbar-brand " to="/">
              <img src={Logo} alt=""  className="d-inline-block "/>
              DEI ALUMNI
            </Link>
          
               
              <div className="Search">
                <input className="form-control me-2" type="search" placeholder="Search here ..." aria-label="Search"/>
             
              </div>
               <div className="menu-option">
                <i className="fas fa-bars" onClick={handlecontaineropen} ></i>
               </div>
               <Navbox isOpen={isContainerOpen} onClose={handlecontainerclose}  />
        </nav>

      </div>
      <div className="nav-bottom mt-1">
        <nav className="navbar  navbar-light bg-light shadow-lg  rounded">
          
            <div className="home"> <Link to="#" className="navbar-item "><img src={Home} alt="Home" /></Link></div>
            <div className="about">  <Link to="/about" className="navbar-item "><img src={About} alt="About" /></Link></div>
           <div className="job"> <Link to="#" className="navbar-item "><img src={Job} alt="Job" /></Link></div>
            <div className="resume">  <Link to="/resume" className="navbar-item "><img src={Resume} alt="Resume" /></Link></div>
           <div className="message">    <Link to="#" className="navbar-item "><img src={Chat} alt="Message" /></Link></div>
         <div className="user">
           <Link to="/profile" className="navbar-item "><img src={User} alt="Profile" /></Link></div>
           <div className="news me-3">       <Link to="#" className="navbar-item "><img src={News} alt="News" /></Link></div>
        
        
     
        </nav>
    </div>
    </div>
    </div>
  )
}

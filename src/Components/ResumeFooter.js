import React from 'react'
import '../Css/Resume-Footer.css'
import Home from "../Photos/ResumeFooter/home.png"
import post from "../Photos/ResumeFooter/post.png"
import contact from '../Photos/ResumeFooter/contact.png'
import about from '../Photos/ResumeFooter/about.png'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='container-fluid footer ' style={{backgroundColor:"white",textAlign:"center",position:"fixed",bottom:"0px"}}  >
      <ul style={{listStyle:"none",display:"flex",paddingTop:"18px",flexDirection:"row",justifyContent:'space-evenly'}}>
        
        <li><Link to="#"><img style={{height:"36px",width:"36px"}} src={Home} alt="Home" /> </Link></li>
        <li><Link to="/create"><img style={{height:"36px",width:"36px"}} src={post} alt="post" /></Link></li>
        <li><Link to="/contact"><img style={{height:"36px",width:"36px"}} src={contact} alt="contact" /></Link></li>
        <li><Link to="/about"><img style={{height:"36px",width:"36px"}} src={about} alt="about" /></Link></li>
      </ul>
    </div>
  )
}

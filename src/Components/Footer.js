import React from 'react'
import '../Css/Footer.css'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
 <>
 <div className="about-footer" >
            <div className="footer-cont  ">
              <legend className="mt-3 ">Important link</legend>
              <div className="footer-item">
                <li className='footer-text'>
                  <Link to='/' className='footer-text'>Home</Link></li>
                <li  className='footer-text'>
                <Link to='/'>About</Link></li>
                <li  className='footer-text'>
                <Link to='/'>Post</Link></li>
                <li className='footer-text'>
                <Link to='/'>Contact Us</Link></li>
              </div>
            </div>
      </div>
 </>
  )
}

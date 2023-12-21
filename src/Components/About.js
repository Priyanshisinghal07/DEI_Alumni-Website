import React from 'react'
import image1 from '../Photos/About/carousel-img1.avif'
import image2 from '../Photos/About/carousel-img2.avif'
import image3 from '../Photos/About/carousel-img3.avif'
import cardimg1 from '../Photos/About/web-developer.jpg'
import cardimg2 from '../Photos/About/Backend-developer.jpeg'
import cardimg3 from '../Photos/About/Data-Analytics.jpeg'
import cardimg4 from '../Photos/About/Data-science.png'
import profileimg1 from '../Photos/About/Guru_Charan_Bulusu.jpg'
import '../Css/About.css'
import Footer from './Footer'
import Navbar from './Navbar'


export default function About() {
  return (
   <div>
     <Navbar/>
    <div className='about'>
    <div className="about-img  " >
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} height="550px" className="d-block w-100" alt="loading_image"/>
            </div> 
            <div className="carousel-item">
              <img src={image2} height="550px" className="d-block w-100" alt="loading_image"/>
            </div>
            <div className="carousel-item">
              <img src={image3} height="550px" className="d-block w-100" alt="loading_image"/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="about-intro">
        <div className="container">
        
          <h5 className="card-title intro-heading mb-5"><i className="fab fa-readme" ></i>Company <span>Overview</span>
          </h5>
          <div className="card intro-box" >
            <div className="card-body">
         
              <p className="card-text mt-3">Welcome to our internship program! We are a leading company in our industry and offer exciting opportunities for interns to gain real-world experience. Join us and kickstart your career!</p>
           
            </div>
            <div className="card-body">
              <h5 className="card-title">Internship Details</h5>
              
              <p className="card-text">Our internship program provides hands-on experience in various departments. You'll work closely with experienced professionals, participate in projects, and learn valuable skills that will enhance your future career prospects</p>
          
            </div>

            <div className="row row-cols-sm-1 row-cols-lg-4 row-cols-md-2 g-4 m-2 mb-5">
              <div className="col">
                <div className="card h-100 intro-box">
                  <img src={cardimg1} className="card-img-top" alt="loading_image" style={{height:"9.5rem"}}/>
                  <div className="card-body">
                    <h5 className="card-title">Web Developer</h5>
                    <p className="card-text">To learn build the website and how to deal with the web application. Learn the different types of library and framework.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 intro-box img2">
                  <img src={cardimg2} className="card-img-top" alt="loading_image" style={{height:"10rem"}}/>
                  <div className="card-body">
                    <h5 className="card-title">Backened Developer</h5>
                    <p className="card-text">In the backend developer. We learn the java and oops concept and also learn the some framework of java like springboot and also learn some techniques.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 intro-box">
                  <img src={cardimg3} className="card-img-top" alt="loading_image" style={{height:"9.5rem"}} />
                  <div className="card-body">
                    <h5 className="card-title">Data Analytics</h5>
                    <p className="card-text">In the data analytics. We learns those language which is  used SQL (Structured Query Language) to communicate with databases, but when it comes to cleaning, manipulating, analyzing, and visualizing data, you look at either Python or R. </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 intro-box">
                  <img src={cardimg4} className="card-img-top" alt="loading_image" style={{height:"9.5rem"}}/>
                  <div className="card-body">
                    <h5 className="card-title">Data Science</h5>
                    <p className="card-text">In the data science we learns those languages which is important to be able to manipulate and analyze the data like python and R.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="card-group h-100 " style={{marginTop:"6rem"}}>
            <div className="col-md-3 ">
              <img src={profileimg1} className="img-fluid card-img-top" alt="loading_image"/>
            </div>
            <div className="col-md-8 intro-box ">
              <div className="card-body  ">
                <h5 className="card-title">Jwalant Mishra
                </h5>
                <p className="card-text">
                  Jwalant Mishra is an experienced professional in our company. With his extensive knowledge in the field, he provides guidance to interns and helps them develop their skills.</p>
        
              </div>
            </div>
    </div>

          <div className="card-group h-100"  style={{marginTop:"6rem"}}>
                    <div className="col-md-3  order-md-last ">
                      <img src={profileimg1} className="img-fluid" alt="loading_image"/>
                    </div>
                    <div className="col-md-8 order-md-first intro-box1">
                      <div className="card-body  ">
                        <h5 className="card-title">Guru Charan Bulusu</h5>
                        <p className="card-text">Guru Charan Bulusu is a passionate mentor who believes in the power of mentorship. He supports interns in their learning journey and encourages them to explore in new areas.

                        </p>
                       
                      </div>
                    </div>
            </div>








.        </div>
      </div>

    </div>
 
    </div>
    <Footer/>

   </div>
  )
}

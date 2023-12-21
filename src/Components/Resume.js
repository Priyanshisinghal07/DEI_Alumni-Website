import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Sidebar from './Sidebar'
import '../App.css';
// import '../Post.css';
import '../Css/Resume.css'
import ResumeSidebar from './ResumeSidebar';
// import Footer from './Footer'

import ResumeFooter from './ResumeFooter';
import Navbar from './Navbar';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function PostList(){
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');


  const navigate = useNavigate();

  const handleShowModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };
  
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    async function fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:5000/account', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        
               
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  
  const handleUsernameClick = async (e, email) => {
    e.preventDefault(); 
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.post('http://localhost:5000/userprofile', { email }, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
     
      console.log(response.data);
      if (response.status === 200) {
       navigate('/userprofile')
        
        
      } else {
        alert('failed to load profile')
      }


    } catch (error) {
      console.error('Error sending username to backend:', error);
    }
  };



  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    async function fetchPosts() {
      try {
        ;
        const response = await axios.get('http://localhost:5000/create_post',{

        headers: { Authorization: `Bearer ${ access_token }` },
        });
        
        console.log(response.data);
        setPosts(response.data.posts);
        // setImage(response.data.posts.userimage)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container" style={{margin:"150px 20px", color:"black"}}>
        <div className="row">
          <div className="col-md-3">
              <ResumeSidebar />
          </div>
          <div className="col-md-7"> 

          <div>
    
    
    </div>
        <ul>
        {posts.map((post) => (
          <li key={post.id} style={{listStyle:"none"}}>
             <div className="container marginside">
        <div className="container post-cont  adjust-post-cont" >
        <div className="container  " style={{borderRadius:"15px"}} >
          
          <p ><img src={`http://localhost:5000/static/images/${post.userimage}`} style={{height:"25px",width:"25px",borderRadius:"50%",marginRight:"9px",border:"1px solid black"}} alt="" /><Link style={{color:'black'}}  onClick={(e) => handleUsernameClick(e,post.email)}>{post.username}</Link></p>
        </div>
      <hr />
        <div className="container">
         <p >{post.content}</p>
        </div>
        
        <div className="container " style={{paddingBottom:"5px"}}>
          {post.image && <img  className="rounded mx-auto d-block post-image img-fluid"  src={`http://localhost:5000/static/images/${post.image}`} onClick={() => handleShowModal(`http://localhost:5000/static/images/${post.image}`)} style={{height:"277px",width:"200px"}} alt="Post" />}

        </div>
      

       </div>
     
</div>
            </li>
        ))}
      </ul>
     
          </div>
        </div>
      </div>
         {/* Modal for displaying the image */}
         <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Post Image" className="img-fluid"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

     <ResumeFooter />
    </div>
  );
};




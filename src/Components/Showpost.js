import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import backarrow from '../Photos/backarrow.png';
import '../Css/Navbar.css';

export default function Showpost() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
   
        fetchPosts();
      }, []);
    
      const accesstoken = localStorage.getItem('access_token');
      async function fetchPosts() {
        try {
          ;
          const response = await axios.get('http://localhost:5000/user_post',{
    
          headers: { Authorization: `Bearer ${ accesstoken }` },
          });
          
          console.log(response.data);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }


      const handleDelete = async (postId) => {
        try {
          const access_token = localStorage.getItem('access_token');
          
          const response = await fetch(`http://localhost:5000/delete_post/${postId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          });
          
          if (response.ok) {
          fetchPosts()
            console.log('Post deleted successfully');
    
          } else {
            console.error('Failed to delete post');
          }
        } catch (error) {
          console.error('Error while deleting post', error);
        }
      };
    
  return (
    <div style={{color:'black'}}>
      <div className='fixed-top  nav-color' >



 <nav class="navbar" style={{backgroundColor:"white"}}>
   <Link to="/profile" class="navbar-item"><img src={backarrow} style={{height:"36px",width:"36px"}} alt="Image 1" /></Link>
   <p style={{display:"flex",margin:"auto",fontSize:"40px"}}>Activity</p>
</nav>


 </div>
      <div className="container my-3 " style={{maxWidth:"600px",backgroundColor:"white",borderRadius:"12px"}}>
  <div className="row" style={{marginTop:"96px"}}>
    <div className="col-md-12">
      
     
      <ul>
      {posts.map((post=>(
          <li key={post.id} style={{listStyle:"none"}}>
            
            <div className="container fakecont" >
    <div div className="row">
        <div className="col-md-12">
          {post.image && <img  className="activity-img"  src={`http://localhost:5000/static/images/${post.image}`}  alt="Post" /> } {post.content}
        <div style={{display:"flex",justifyContent:"flex-end"}}>  <button onClick={() => handleDelete(post.id)}>Delete</button> </div> <hr />
         
        </div>
      </div>
      </div>
          </li>
         ) ))}
      </ul>
    </div>
  </div>
  
    </div>
    </div>
  )
}

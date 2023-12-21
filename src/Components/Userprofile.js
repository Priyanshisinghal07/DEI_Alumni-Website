import React from 'react'
import {useState,useEffect} from 'react'
import '../App.css';
import '../Css/Profile.css';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Userprofile() {
    const [posts, setPosts] = useState([]);
    const[description,setDescription]=useState('')
    const[occupation,setOccupation]=useState('')
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
  
    const[imagep,setImagep]=useState(null)
    const [showAll, setShowAll] = useState(false);
    const [postCount, setPostCount] = useState(4);
  
    const navigate = useNavigate();
  
    const visiblePosts = showAll ? posts : posts.slice(0, postCount);
  
    const handleUsernameClick = async (e, email) => {
      e.preventDefault(); // Prevent the default navigation behavior
    
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios.post('http://localhost:5000/userprofile', { email }, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
    
        // Handle the response from the backend, e.g., display user profile data.
        console.log(response.data);
        if (response.status === 200) {
         navigate('/showuserpost')
          
          
        } else {
          alert('failed to load profile')
        }
  
  
      } catch (error) {
        console.error('Error sending username to backend:', error);
      }
    };
  
  
   
  
  
    useEffect(() => {
    
  
      fetchUserProfile();
    }, []);
  
    const access_token = localStorage.getItem('access_token');
  
    async function fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:5000/userprofile', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        
        setUsername(response.data.username);
        setImagep(response.data.image)
        setOccupation(response.data.occupation)
        setPosts(response.data.posts)
        setEmail(response.data.email)
        setDescription(response.data.description)
        console.log(response.data.user)
        // set(response.data.user.image)
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  return (
    <>
    <Navbar />
    <div className="container  adjust-pic-cont " style={{color:'black'}} >
     <div className="row">
       <div className="col-md-12">
             
             <div className="container profile-pic-cont">
               <div className="container">
                 <img src={`http://localhost:5000/static/images/${imagep}`} className="img-fluid profile-pic"  alt=""  style={{borderRadius:"50%",height:"150px",width:'150px',marginTop:"24px",marginLeft:"1px"}}/>
               </div>
              
             </div>
              
       </div>
     </div>
    
   </div>
 
   
   <section style={{backgroundColor:"#908b8b2e", color:'black'}}>
   <h2 className="mx-15 activity" >{username}</h2>
   <h2 className="mx-15 activity" style={{fontSize:"larger",}} >{occupation}</h2>
   <h2 className="mx-15 activity" style={{fontSize:"larger"}} >{description}</h2>
   
 
 
   <div className="container my-3" style={{maxWidth:"600px",backgroundColor:"white",borderRadius:"12px"}}>
   <div className="row">
     <div className="col-md-12">
       
       <h2 className="my-5 activity">Activity</h2> 
 
       <ul>
       {visiblePosts.map((post=>(
           <li key={post.id} style={{listStyle:"none"}}>
             
             <div className="container fakecont" >
     <div div className="row">
         <div className="col-md-12">
           {post.image && <img  className="activity-img"  src={`http://localhost:5000/static/images/${post.image}`}  alt="Post" /> } {post.content}
         <div style={{display:"flex",justifyContent:"flex-end"}}>   </div> <hr />
          
         </div>
       </div>
       </div>
           </li>
          ) ))}
       </ul>
     </div>
   </div>
   <div className='update-profile'> <Link onClick={(e) => handleUsernameClick(e,email)} ><button type="button" class="btn btn-primary mb-3">  Show all</button></Link></div>
 
     </div>
   </section>
 
    
    </>
  )
}

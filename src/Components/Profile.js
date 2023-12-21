import React from 'react'
import {useState,useEffect} from 'react'
import '../App.css';
import '../Css/Profile.css';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const[name,setName]=useState({})
    const [posts, setPosts] = useState([]);
    const[description,setDescription]=useState('')
    const[occupation,setOccupation]=useState('')
    const[username,setUsername]=useState('')
    const[image,setImage]=useState(null)
    const[imagep,setImagep]=useState(null)
    const [showAll, setShowAll] = useState(false);
    const [postCount, setPostCount] = useState(4);
    const navigate = useNavigate();
  
    const visiblePosts = showAll ? posts : posts.slice(0, postCount);
  
    const handleShowAllClick = () => {
      setShowAll(true);
    };
  
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
  
  
    useEffect(() => {
    
  
      fetchUserProfile();
    }, []);
  
    const access_token = localStorage.getItem('access_token');
  
    async function fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:5000/account', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        
        setName(response.data.user);
        console.log(response.data.user)
        setImagep(response.data.user.image)
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
 
  
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      const formData=new FormData();
      formData.append('description',description);
      formData.append('image',image)
      formData.append('occupation',occupation)
      formData.append('username',username)
  
      let access_token = localStorage.getItem('access_token');
      console.log(access_token)
      try {
        const response = await axios.post('http://localhost:5000/update_profile', formData,{
  
        headers: { Authorization: `Bearer ${ access_token }` },
        });
        
        console.log("profile updated successfully",response.data)
        alert('profile updated successfully!');
        if (response.status === 200) {
        
          fetchUserProfile()
          navigate('/profile');
        } else {
          alert('failed to create new profile')
        }
      } catch (error) {
        console.error('post creation failed',error)
      }
    };
  
  return (
    <>
    <Navbar />
    <div>
    <div className="container  adjust-pic-cont " >
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
 
   
   <section style={{backgroundColor:"#908b8b2e"}}>
   <h2 className="mx-15 activity" style={{color:"black"}} >Welcome {name.username}</h2>
   <h2 className="mx-15 activity prof-color" style={{fontSize:"larger"}} >{name.occupation}</h2>
   <h2 className="mx-15 activity prof-color" style={{fontSize:"larger"}} >{name.description}</h2>
   <p className="mx-15 activity prof-color">want to update your profile the update here</p>
   <div className='update-profile'><a class="btn btn-primary  "  data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Update profile
   </a></div>
   <div class="collapse" id="collapseExample">
   <div class="card card-body">
   <div className="container " style={{maxWidth:"600px",backgroundColor:"white",borderRadius:"12px", color:'black'}}>
   
     
   <form onSubmit={handleUpdate}>
             <div className="mb-3">
               <label for="exampleInputEmail1" className="form-label">Name</label>
               <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"   value={username}
           onChange={(e) => setUsername(e.target.value)}/>
               
             </div>
         
             <div className="mb-3">
               <label for="exampleInputEmail1" className="form-label">Occupation</label>
               <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"    value={occupation}
           onChange={(e) => setOccupation(e.target.value)}/>
             
             </div>
     
             <div className="mb-3">
               <label for="exampleFormControlTextarea1" className="form-label">Describe yourself</label>
               <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"   value={description}
           onChange={(e) => setDescription(e.target.value)} />
             </div>
 
             <div className="mb-3">
               <label for="exampleInputEmail1" className="form-label">Upload Profile Picture</label>
               <input type="file" className="form-control"   
           onChange={(e) => setImage(e.target.files[0])} />
             
             </div>
   
             <button type="submit"  className="btn btn-primary mb-3">Update</button>
           </form>
   </div>
   </div>
 </div>
 
   
 
 <div className="container my-3" style={{maxWidth:"600px",backgroundColor:"white",borderRadius:"12px", color:"black"}}>
   <div className="row">
     <div className="col-md-12">
       
       <h2 className="my-5 activity">Activity</h2> 
 
       <ul className='prof-color'>
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
   <div className='update-profile'> <Link to="/showpost"><button type="button" class="btn btn-primary mb-3">  Show all</button></Link></div>
  
     </div>
   
 
   </section>
   </div>
    
    </>
  )
}

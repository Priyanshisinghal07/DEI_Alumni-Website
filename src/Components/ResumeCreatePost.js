import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css/ResumeCreatePost.css'
import Navbar from './Navbar';

const PostForm = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const handleCreatePost = async (e) => {
      e.preventDefault();
      const formData=new FormData();
      formData.append('content',content);
      formData.append('image',image)
      let access_token = localStorage.getItem('access_token');
      console.log(access_token)
      try {
        const response = await axios.post('http://localhost:5000/create_post', formData,{
  
        headers: { Authorization: `Bearer ${ access_token }` },
        });
        
        console.log("post created successfully",response.data)
        alert('Post created successfully!');
        if (response.status === 200) {
          setContent('');
          setImage(null);
          navigate('/resume');
          
        } else {
          alert('failed to create post')
        }
      } catch (error) {
        console.error('post creation failed',error)
      }
    };
  return (

 <>
 <Navbar/>
    
    <div class="container">
    <div class="comment-section">
     
       
        <form onSubmit={handleCreatePost}>
            <div class="form-group">
                <textarea rows="6" value={content}  onChange={(e) => setContent(e.target.value)}  placeholder="write to post...." ></textarea>
        
                
               
                <hr /><input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                 
                  />
                  <div  class="create-post"><button type="submit" class="create-button">Create Post</button></div>
            </div> 
                   

        </form>

    </div>
    </div>
   
    </>
   )
}
export default PostForm;
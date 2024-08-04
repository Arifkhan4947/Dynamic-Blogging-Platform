import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext';  // Corrected import 
import Spinner from './Spinner';
import BlogDetails from './BlogDetails';

const Blogs = () => {
    // step3 consume the data
    const {posts, loading} = useContext(AppContext);



  return (
    <div className='w-11/12 max-w-[622px] py-8 flex flex-col gap-y-7 mt-[55px] mb-[60px] ml-auto mr-auto'>   
    {
        loading ?                           // if loading is true then show the Spinner.
        (<Spinner/>) :   

        (                                   // if false and posts length is 0 then show the paragraph "No Posts Found"
            posts.length === 0 ?            
            (<div>
                <p>No Post Found</p>
            </div>) : 
            (posts.map( (post) => (
                // there is Blogs data format 
                <BlogDetails key={post.id} post={post}/>
            ) ))    // is the posts length is non-zero mean no. positive number then show the  
        )
    }

    </div>
  )
}

export default Blogs
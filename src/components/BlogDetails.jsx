import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({post}) => {
  return (
    // Here we can apply Tailwind css
    <div>    
        <NavLink to={`/blog/${post.id}`}> 
            <span className='font-bold'>{post.title}</span>               
        </NavLink>

        <p className='text-[16px]'>
            By-
            <span>{post.author}</span>
            on {" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
                <span className='font-bold underline'>{post.category}</span>
            </NavLink>
        </p>
        <p> Posted on {post.date}</p>
        <p>{post.content}</p>
        <div>
            {post.tags.map( (tag, index) => (
                <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>  
                    <span className='font-bold text-blue-600 underline'>{` #${tag}`}</span>
                </NavLink>
            ) )}
        </div>
    </div>
  )
}

export default BlogDetails
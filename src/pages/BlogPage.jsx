import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {

    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";   // this is a "newBaseUrl" for fetching the api data.
    const [blog, setBlog] = useState(null);
    const [relatedblogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const {setLoading, loading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1); 

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;   // here we put the "newBaseUrl" API data.
        console.log("URL is: ");
        console.log(url);   // see the url data is correct or not.
        try{
            const res = await fetch(url);
            const data = await res.json();

            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);  // yhan per galti lag rha mujhe maybe 
        }
        catch(error) {
            console.log("Error aa gya in blog id wali call")
            setBlog(null);
            setRelatedBlogs([]);
        }

        setLoading(false);
    }


    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname] )


  return (
    <div>
        <Header/>
        <div>
            <button
            onClick={() => navigation(-1)}
            >
                Back
            </button>
        </div>

        {
            loading ? 
            (<div>
                <p>Loading</p>
            </div>) :
            blog? 
            (<div className='w-11/12 max-w-[622px] py-8 flex flex-col gap-y-7 mt-[55px] mb-[60px] ml-auto mr-auto'>
                <BlogDetails post={blog} />
                <h2 className=''>Related Blogs</h2>
                {
                    relatedblogs.map( (post) => (
                        <div key = {post.id}>
                            <BlogDetails post={post} />
                        </div>
                    ))
                }
            </div>) :
            (<div>
                <p>No Blog Found</p>
            </div>)

        }

    </div>
  )
}

export default BlogPage
import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

// step1: create the context 
const AppContext = createContext();

export {AppContext};  // export the "AppContext" is the important for using as hook in "Blogs.jsx" 

export default function AppContextProvider({children}) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    
    // Fetch Blog Data
    async function fetchBlogPosts (page = 1, tag=null, category) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if (tag) {
            url += `&tag=${tag}`
        }
        if (category) {
            url += `&category=${category}`;
        }


        try{
            const res = await fetch(url);
            const data = await res.json();
            if(!data.posts || data.posts.length === 0)
                throw new Error("Somthing went wrong");
            console.log("Api Response", data);
            setPage(data.page);
            setPosts(data.posts);  // yhana mujhe galti lag rha hai
            setTotalPages(data.totalPages);
        }
        catch (error){
            console.log("Error in fetching data")
            setPage(1);
            setPosts([]);
            setTotalPages(null); 
        }

        setLoading(false);
    }


    // Handle when Next and Previous button are clicked 
    function handlePageChange(page) {
        navigate ( { search: `?page=${page}`} );
        setPage(page);  
        // fetchBlogPosts(page);
    }




    const value = {
        posts,
        setPosts,
        loading,        //this is loader where we show the loader on UI.
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange

        
    };

    // step2              // Here the {children} is "App.js"
    return <AppContext.Provider value={value}>  
        {children}            
    </AppContext.Provider>


}

// step3 is having the "Blog.jsx" file where we consume the date from here.

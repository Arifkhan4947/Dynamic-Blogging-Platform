import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Pagination = () => {

  const {page, handlePageChange, totalPages} = useContext(AppContext);

  return (
    <div className='w-full flex justify-center items-center border-2 fixed bottom-0 bg-white'>

        <div className='flex justify-between w-11/12 max-w-[625px] py-2'>

          <div className='flex gap-x-2'>
            {
              page > 1 &&    // if page number is greater than 1 then show this button
              (<button 
                className='rounded-md border-2 px-4 py-1'
                onClick={() => handlePageChange(page-1)}>  
                Previous
              </button>)             
            }

            {
              page < totalPages &&    // if page number is less than totalPages then show this button
                                      // this handlePageChange function is coming to "AppContext.js" useContext and AppContext hook which we define in our AppContext.js file.     
              (<button 
                className='rounded-md border-2 px-4 py-1'
                onClick={() => handlePageChange(page +1)}>  
                Next
              </button>)
            }
          </div>          

         <p className='font-bold text-sm'>
            Page {page} of {totalPages}
         </p> 

        </div>
    </div>
  )
}

export default Pagination
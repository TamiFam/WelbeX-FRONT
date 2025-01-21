import React from 'react'
import Welcoming from "../photosite/urban-welcome.svg"

import { Link, Outlet } from 'react-router-dom'



const BlogCp = () => {

  return (
    <div className='h-screen flex justify-center items-center relative'>
      <div className=' absolute top-4 right-2'></div>
      
    <div>
      <div>
      <div>
        <img  onContextMenu={e => e.preventDefault()} src={Welcoming} alt="" className='h-[200px]' placeholder='blur' />
      </div>
      <h1 className='text-4xl capitalize font bold'> Привет,<span className='text-3xl text-secondary items-stretch'>
      <span className='text-black '>   </span></span> здесь ты можешь перейти в мой блог</h1>
      <p className='text-center text-base py-2'>Снизу ссылка для перехода, кликай</p>
      <div className='text-center'>
        
          <div className='flex items-center justify-center my-r gap-3'> 

            <div className=' border border-secondary  rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1'>
              <Link to='/dashboard'>Блог</Link>             
            </div>
            
          </div>
        
      </div>
      </div>
    </div>
    <div >
    
        <Outlet/>
    </div>
  </div>
  )
}

export default BlogCp

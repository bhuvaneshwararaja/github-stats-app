import React from 'react'

function Footer() {
  return (
    <div className='flex justify-center fixed bottom-0 w-full h-14 items-center' style={{backgroundColor:"#262D47"}}>
     <h2 className='text-xl font-medium text-white'>Developed by Bhuvanesh</h2>
     <span style={{color:"red"}} className='ml-3 text-xl'>&hearts;</span>
    </div>
  )
}

export default Footer
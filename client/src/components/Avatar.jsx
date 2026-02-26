import React from 'react'

const Avatar = ({username,size=40}) => {
    const letters=username?username.slice(0,2).toUpperCase():"??";

  return (
    <div className='flex justify-center items-center rounded-full bg-amber-400 text-white font-bold' style={{width:size,height:size}}>{letters}</div>
  )
}

export default Avatar
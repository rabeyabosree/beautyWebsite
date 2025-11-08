import React from 'react'
import img from '../../assets/Add a heading.png'

function Banner() {
  return (
    <div className="w-full h-[300px] md:h-[450px] lg:h-[600px] bg-contain bg-center "
    style={{backgroundImage : `url(${img})`}}></div>
  )
}

export default Banner
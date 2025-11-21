import React from 'react'
import img from '../../assets/Add a heading.png'

function Banner() {
  return (
    <div className="w-full">
      <img 
        src={img} 
        alt="Banner"
        className="
          w-full
          h-auto              /* Mobile – full clean image */
          
          md:h-[450px]        /* Tablet */
          lg:h-[600px]        /* Laptop */
          xl:h-[700px]        /* Desktop */

          object-contain      /* Mobile – no crop */
          md:object-cover     /* Tablet+ cover look */
        "
      />
    </div>
  );
}

export default Banner;


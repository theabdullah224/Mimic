import React from 'react'
import Image from 'next/image'
import thundericon from './assets/Vector.png'

interface EnergyProps {
    value: number;
  }
  const Energy: React.FC<EnergyProps> = ({ value }) =>{
  return (
    <div>
        <div  className="relative   px-4 py-4 drop-shadow-[11px_11px_#352969] container hover:shadow-none">
        <div className= "flex  items-center relative z-10 text-white content">
            
        <Image className='mr-7' src={thundericon} alt="Thunder Icon" width={18} height={22} /> 
            <p>{value}</p>
            
            
        </div>
        
      </div>
    </div>
  )
}

export default Energy

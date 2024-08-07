import React from 'react'
import Image from 'next/image'
import Wallet from './Wallet'

interface NavProps {
  openPopup: () => void;
  mimiclogo: string;
  isWalletConnected: boolean;
  onLogout: () => void;
}

const Nav: React.FC<NavProps> = ({ openPopup, mimiclogo, isWalletConnected, onLogout }) => {
  return (
    <div className='relative z-50'>
      <div className="relative p-2   m-auto mb-10 drop-shadow-[11px_11px_#352969] container">
        <div className="flex justify-between px-8 items-center relative  text-white content">
          <Image className='mr-7 my-7 w-24' src={mimiclogo} alt="Thunder Icon" /> 
          {/* <Energy value={0} /> */}
          <Wallet 
            openPopup={openPopup} 
            isWalletConnected={isWalletConnected} 
            onLogout={onLogout}
          />
        </div>
      </div>
    </div>
  )
}

export default Nav
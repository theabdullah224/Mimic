'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import wallet from "../assets/Wallet.svg";
import metamask from "../assets/Metamask.svg";
import "./wallet.css";
import detectEthereumProvider from '@metamask/detect-provider';
import { useRouter } from "next/navigation";

interface Wallet {
  openPopup: () => void;
  isWalletConnected: boolean;
  onLogout?: () => void;
}

function Wallet({ openPopup, isWalletConnected, onLogout }: Wallet) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkConnection = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null)
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        // Call API to store wallet address in database
        await fetch('/api/user/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress: accounts[0] }),
        });
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsDropdownOpen(false);
    if (typeof onLogout === 'function') {
      onLogout();
    }
    localStorage.removeItem('walletAddress');
    router.push('/');
  };

  const toggleDropdown = () => {
    if (address) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      connectWallet();
    }
  };

  return (
    <div className="absolute top-0 z-50 right-10 ">
      <div
        onClick={toggleDropdown}
        className={`wallet relative mb-5 px-7 py-4 drop-shadow-[11px_11px_#352969]  container ${address ? 'connected ' : ''} ${isDropdownOpen ? 'expanded z-50 drop-shadow-[0px_0px_#352969]' : ''}`}
      >
        <div className="insidewallet flex items-center relative z-50 text-white content">
          <Image
            className="mr-4 walletsvg"
            src={address ? metamask : wallet}
            alt="Wallet Icon"
            width={24}
            height={24}
          />
          <h3 className="text-2xl h3wallet font-cutefont">
            {address ? `${address.slice(0, 9)}...${address.slice(-4)}` : "CONNECT WALLET"}
          </h3>
        </div>
        
        {address && isDropdownOpen && (
          <div className="dropdown mt-4">
            <a href="/stats" className="block py-2 text-2xl font-cutefont text-white hover:text-customLightBlue">Your Stats</a>
            <a href="/leaderboard" className="block py-2 text-2xl font-cutefont text-white hover:text-customLightBlue">Leaderboard</a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                disconnectWallet();
              }}  
              className="block py-2 text-2xl font-cutefont text-white hover:text-customLightBlue"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wallet;
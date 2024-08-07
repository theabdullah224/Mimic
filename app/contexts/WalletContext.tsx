'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

interface WalletContextType {
  address: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
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
    // Call API to handle disconnection if needed
  };

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
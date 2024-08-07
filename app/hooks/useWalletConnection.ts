import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

export function useWalletConnection() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const provider = await detectEthereumProvider();
        if (provider) {
          // Prompt user to connect if not connected
          const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts.length > 0) {
            console.log("Wallet connected:", accounts[0]);
            setAddress(accounts[0]);
          } else {
            console.log("No wallet connected");
          }
        } else {
          console.log("Please install MetaMask!");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    };

    checkConnection();

    // Listen for account changes
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
        }
      });
    }

    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return { address };
}
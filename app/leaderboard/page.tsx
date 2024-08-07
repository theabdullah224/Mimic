"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "../components/Nav";
import MainContentBox from "../components/MainContentBox";
import BoxComp from "../components/BoxComp";
import Footer from "../components/Footer";
import Wallet from "../components/Wallet";
import metamask from "../assets/Metamask.svg";
import rabby from "../assets/rabby.svg";
import cross from "../assets/cross.svg";
import mimiclogos from '../assets/mimiclogo.svg'
import LeaderB from "./LeaderB";
export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpen]);

  return (
    <main
      className={`w-screen overflow-hidden lg:px-50 h-fit bg-customBlue px-5 m-auto py-6 relative ${
        isPopupOpen ? "pointer-events-none" : ""
      }`}
    >
      <div className={isPopupOpen ? "filter blur-sm" : ""}>
        <Nav openPopup={openPopup} mimiclogo={mimiclogos} isWalletConnected={false} onLogout={()=>{} } />
        <LeaderB/>
        <BoxComp gameplayed={2704} userwin={23} robotwin={21} />
        <Footer />
      </div>

      {isPopupOpen && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 pointer-events-auto px-28">
          <div className="absolute inset-0 bg-customBlue opacity-85" onClick={closePopup}></div>

          <div className="relative w-fit mx-20 ">
            <div
              onClick={closePopup}
              className="crossbtn absolute z-50"
              style={{ right: "-40px", top: "-40px" }}
            >
              <div className="wallet w-fit p-3 z-50 drop-shadow-[11px_11px_#352969] container">
                <div className="insidewallet w-fit z-10 text-white content">
                  <Image
                    className="walletsvg"
                    src={cross}
                    alt="Thunder Icon"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>

            <div className="drop-shadow-[11px_11px_#352969] relative container ">
              <div className="relative px-10 py-14 flex items-center flex-col  justify-center  content">
                <h1 className="font-pressStart text-center text-customLightBlue text-xl mb-10">
                  CONNECT WALLET
                </h1>
                <p className="font-cutefont text-3xl text-center">
                  CONNECT YOUR WALLET TO START THE GAME.
                </p>
                <p className="font-cutefont text-3xl text-center">
                  ALL YOUR ACHIEVEMENTS WILL BE SAVED IN YOUR WALLET.
                </p>
                <div className="btns flex gap-10 flex-col sm:flex-row mt-10">
                  <div className="startbtn relative w-52  flex items-center justify-center py-3 drop-shadow-[11px_11px_#00D0FF] container-1 hover:shadow-none">
                    <div className="insidebtn flex  items-center relative z-10 text-white content">
                      <Image
                        className="mr-4 walletsvg"
                        src={metamask}
                        alt="Thunder Icon"
                        width={32}
                        height={32}
                      />
                      <h1 className="text-3xl font-cutefont">METAMASK</h1>
                    </div>
                  </div>
                  <div className="startbtn relative w-52  flex items-center justify-center    py-3 drop-shadow-[11px_11px_#00D0FF] container-1 hover:shadow-none">
                    <div className="insidebtn flex  items-center relative z-10 text-white content">
                      <Image
                        className="mr-4 walletsvg"
                        src={rabby}
                        alt="Thunder Icon"
                        width={32}
                        height={32}
                      />
                      <h1 className="text-3xl font-cutefont">RABBY</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .container-1::before,
        .container-1::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          clip-path: polygon(
            11px 0px,
            11px 2.2px,
            8.8px 2.2px,
            8.8px 4.4px,
            6.6px 4.4px,
            6.6px 6.6px,
            4.4px 6.6px,
            4.4px 8.8px,
            2.2px 8.8px,
            2.2px 11px,
            0px 11px,
            0px calc(100% - 11px),
            2.2px calc(100% - 11px),
            2.2px calc(100% - 8.8px),
            4.4px calc(100% - 8.8px),
            4.4px calc(100% - 6.6px),
            6.6px calc(100% - 6.6px),
            6.6px calc(100% - 4.4px),
            8.8px calc(100% - 4.4px),
            8.8px calc(100% - 2.2px),
            11px calc(100% - 2.2px),
            11px 100%,
            calc(100% - 11px) 100%,
            calc(100% - 11px) calc(100% - 2.2px),
            calc(100% - 8.8px) calc(100% - 2.2px),
            calc(100% - 8.8px) calc(100% - 4.4px),
            calc(100% - 6.6px) calc(100% - 4.4px),
            calc(100% - 6.6px) calc(100% - 6.6px),
            calc(100% - 4.4px) calc(100% - 6.6px),
            calc(100% - 4.4px) calc(100% - 8.8px),
            calc(100% - 2.2px) calc(100% - 8.8px),
            calc(100% - 2.2px) calc(100% - 11px),
            100% calc(100% - 11px),
            100% 11px,
            calc(100% - 2.2px) 11px,
            calc(100% - 2.2px) 8.8px,
            calc(100% - 4.4px) 8.8px,
            calc(100% - 4.4px) 6.6px,
            calc(100% - 6.6px) 6.6px,
            calc(100% - 6.6px) 4.4px,
            calc(100% - 8.8px) 4.4px,
            calc(100% - 8.8px) 2.2px,
            calc(100% - 11px) 2.2px,
            calc(100% - 11px) 0px
          );
        }

        .container-1::before {
          background-color: #00d0ff;
          z-index: -2;
        }

        .container-1::after {
          background-color: #040923;
          inset: 1px;
          z-index: -1;
        }
        .startbtn:hover {
          filter: drop-shadow(0px 0px transparent);
          -webkit-filter: drop-shadow(0px 0px transparent);
          position: relative;
          top: 11px;
          left: 11px;

          /* background-color: #00D0FF; */
          color: #00d0ff !important;
          .insidebtn {
            color: #00d0ff !important;
          }
        }
      `}</style>
    </main>
  );
}

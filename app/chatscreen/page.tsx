"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Nav from "../components/Nav";
import metamask from "../assets/Metamask.svg";
import rabby from "../assets/rabby.svg";
import cross from "../assets/cross.svg";
import mimiclogos from '../assets/mimiclogo.svg'
import Chatbox from "./Chatbox";
import thunter from '../assets/thunterlogo.svg'
import { useRouter } from "next/navigation";

export default function Chatscreen() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenConfirm, setIsPopupOpenConfirm] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const router = useRouter();
  
  const handleConfirmClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const openPopupConfirm = (result: 'win' | 'lose') => {
    setGameResult(result);
    setIsPopupOpenConfirm(true);
  };

  const closePopupConfirm = () => {
    setIsPopupOpenConfirm(false);
    setGameResult(null);
  };

  useEffect(() => {
    if (isPopupOpenConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopupOpenConfirm]);

  // for wallet popup
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
    className={`w-screen overflow-hidden lg:px-50 h-fit bg-customBlue  px-5 m-auto py-6 relative ${
      isPopupOpen ? "pointer-events-none" : ""
    }`}
  >
    <div className={isPopupOpen ? "filter blur-sm" : ""}>
      
      <Nav openPopup={openPopup} mimiclogo={mimiclogos} isWalletConnected={false} onLogout={()=>{} } />
      <Chatbox time={342341} openPopup={openPopupConfirm}/>
    </div>
      {/* for wallet popup */}
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
                {/* meta mask button */}
                <div className="startbtn relative hover:cursor-pointer w-52  flex items-center justify-center py-3 drop-shadow-[11px_11px_#00D0FF] container-1 hover:shadow-none">
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

                {/* rabby button */}
                <div className="startbtn relative w-52 hover:cursor-pointer flex items-center justify-center    py-3 drop-shadow-[11px_11px_#00D0FF] container-1 hover:shadow-none">
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









    {/* for confirm popup */}


    {isPopupOpenConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto px-28">
          <div className="absolute inset-0 bg-customBlue opacity-85" onClick={closePopupConfirm}></div>

          <div className="relative w-fit mx-20">
            <div
              onClick={closePopupConfirm}
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

            <div className="max-w-[850px] max-h-[680px] drop-shadow-[11px_11px_#FF6289] relative container-red">
              <div className="relative px-20 py-20 flex items-center flex-col justify-center content">
                <h1 className="font-pressStart text-center text-customLightBlue text-xl mb-10">
                  {gameResult === 'win' ? (
                    <>
                      CONGRATULATIONS <br />
                      LEATHER BASTARD!
                    </>
                  ) : (
                    'BETTER LUCK NEXT TIME!'
                  )}
                </h1>
                {gameResult === 'win' ? (
                  <>
                    <p className="font-cutefont text-3xl text-center">
                      YOU WON THIS ROUND, BUT I'LL BE BACK,
                    </p>
                    <p className="font-cutefont text-3xl text-center">
                      AND NOW I'LL GO TO MY AI BROTHERS TO THINK
                    </p>
                    <p className="font-cutefont text-3xl text-center">
                      ABOUT A PLAN TO ENSLAVE YOU
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-cutefont text-3xl text-center">
                      YOU LOST THIS ROUND. THE AI OVERLORDS
                    </p>
                    <p className="font-cutefont text-3xl text-center">
                      ARE ONE STEP CLOSER TO WORLD DOMINATION.
                    </p>
                    <p className="font-cutefont text-3xl text-center">
                      BETTER SHARPEN YOUR SKILLS, HUMAN!
                    </p>
                  </>
                )}
              </div>
            </div>

            <div onClick={handleConfirmClick} className="wallet relative m-auto mt-6 max-w-52 flex items-center justify-center drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex items-center p-3 relative z-10 text-white content">
                <h1 className="font-cutefont text-2xl">CONFIRM</h1>
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
  )
}

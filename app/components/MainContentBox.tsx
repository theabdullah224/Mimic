import { useCallback,useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import StartButton from "./StartButton";
import Image from "next/image";

function MainContentBox() {
 

  return (
    <div className='z-0'>
      <div
       
        className="relative pt-10  z-0 m-auto drop-shadow-[11px_11px_#352969] container"
      >
        <div className="flex justify-center  flex-col px-8 items-center relative z-0 text-white content">
          <h1 className="text-3xl text-customLightBlue font-pressStart text-center ">
            SOCIAL TURING GAME
          </h1>
          <p className="text-center text-4xl text-white font-cutefont ">
            CHAT WITH SOMEONE FOR TWO MINUTES. <br />
          </p>
          <p className="text-center text-4xl text-white font-cutefont ">
            TRY TO FIGURE OUT IF IT WAS A HUMAN OR AN AI BOT. <br />
          </p>
          <p className="text-center text-4xl text-white font-cutefont ">
            THINK YOU CAN TELL THE DIFFERENCE?
          </p>
          <StartButton />
          <video
            src="/aivideo.mp4"
            className="w-fit h-auto mb-1 "
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

export default MainContentBox;
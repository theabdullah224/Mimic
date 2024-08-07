import React from "react";
import mimiclogo from "../assets/mimiclogo.svg";
import Image from "next/image";
import discord from "../assets/discord.svg";
import x from "../assets/x.svg";
import telegram from "../assets/Telegram.svg";
import medium from "../assets/Medium.svg";
import { useRouter } from 'next/router';

interface FooterProps {
  openPopupConfirm: () => void;
}

const Footer: React.FC<FooterProps> = ({ openPopupConfirm }) => {
  const discordclick = ()=>{
    window.open('https://discord.com/invite/your-discord-invite', '_blank');
  }
  const xclick = ()=>{
    window.open('https://twitter.com/your-twitter-handle', '_blank');
  }
  const telegramclick = ()=>{
    window.open('https://t.me/your-telegram-group', '_blank');
  }
  const mediumclick = ()=>{
    window.open('https://medium.com/@your-medium-profile', '_blank');
  }

  return (
    <div className="relative h-96  flex justify-center lg:h-32 md:h-64">
      <div className="absolute    py-14 block  m-auto drop-shadow-[11px_11px_#352969] container lg:h-fit lg:py-10 lg:pb-8">
        <div className="flex flex-col   items-center justify-center px-8 py-0 my-0 lg:flex-row  relative z-10 text-white content lg:justify-between lg:items-start">
          <div className="">
          <Image className="sm:mb-10" src={mimiclogo} alt="" />
          <span className="text-2xl  font-cutefont text-customLightPurple">2024&nbsp;MIMIC©</span>
          </div>
          <ul className="flex   items-center justify-center flex-col text-3xl font-cutefont  md:flex-row  ">
            <li className="text-customLightPurple md:px-5 2xl:px-10 hover:text-customLightBlue">
              <a href="/blog">BLOG</a>
            </li>
            <li className="text-customLightPurple md:px-5 2xl:px-10 hover:text-customLightBlue">
              <a href="/blog">FAQ</a>
            </li>
            <li className="text-customLightPurple md:px-5 2xl:px-10 hover:text-customLightBlue">
              <a href="/blog">PRIVACY</a>
            </li>
            <li className="text-customLightPurple md:px-5 2xl:px-10 hover:text-customLightBlue">
              <a href="/blog">TERMS</a>
            </li>
            <li onClick={openPopupConfirm} className="text-customLightPurple hover:cursor-pointer md:px-5 2xl:px-10 hover:text-customLightBlue">
                FEEDBACK
            </li>
          </ul>
          <div className="flex gap-5 md:pb-4 md:mt-4 mt-4 lg:mt-0 ">
            <div onClick={discordclick} className="wallet relative    flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                <Image src={discord} alt="" className="w-6 walletsvg" />
              </div>
            </div>
            <div onClick={xclick} className="wallet relative    flex items-center justify-center drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                <Image src={x} alt="" className="w-6 walletsvg" />
              </div>
            </div>
            <div onClick={telegramclick} className="wallet relative    flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                <Image src={telegram} alt="" className="w-6 walletsvg" />
              </div>
            </div>
            <div onClick={mediumclick} className="wallet relative    flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                <Image src={medium} alt="" className="w-6 walletsvg" />
              </div>
            </div>
          </div>
        
        </div>

      </div>
      
    </div>
  );
}

export default Footer;

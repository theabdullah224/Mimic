import React, { useEffect, useState } from "react";
import Image from "next/image";
import robot from '../assets/Robot.svg';
import user from '../assets/User.svg';

interface BoxCompProps {
    gameplayed: number;
    robotwin: number;
    userwin: number;
}

const BoxComp: React.FC<BoxCompProps> = ({ gameplayed, robotwin, userwin }) => {
  const [gamePlayed, setGamePlayed] = useState<number>(0);

  const [userWin, setUserWin] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/get-game-stats');
        if (!response.ok) {
          throw new Error('Failed to fetch game stats');
        }
        const data = await response.json();
        setGamePlayed(data.totalGames);
       
        setUserWin(data.userWins);
      } catch (error) {
        console.error('Error fetching game stats:', error);
      }
    };

    fetchStats();
  }, []);

  const userWinPercentage = gamePlayed > 0 ? (userWin / gamePlayed) * 100 : 0;
  const robotWinPercentage = 100-userWinPercentage;
  return (
    <div className="flex flex-col lg:flex-row lg:gap-10 m-auto mt-10 gap-4 h-fit relative p-2 container">
      <div className="relative p-2  h-fit lg:h-80  mb-10 drop-shadow-[11px_11px_#352969] container">
        <div className="px-8 py-3 relative z-10 text-white content">
          <h1 className="text-xl text-customLightBlue mb-6 mt-4 font-pressStart">THE MISSION</h1>
          <p className="text-4xl mb-1 font-cutefont">AI ROBOTS: TO PASS <span className="text-customLightBlue">TURING TEST</span>, <br /> </p>
          <p className="text-4xl mb-1 font-cutefont">HUMANS ARE WRONG ON US 70% <br /> </p>
          <p className="text-4xl mb-1 font-cutefont">HUMANS: NOT TO ALLOW AI ROBOTS <br /> </p>
          <p className="text-4xl mb-1 font-cutefont">TO PASS <span className="text-customLightBlue">TURING TEST </span></p>
        </div>
      </div>
      <div className="relative p-2  h-fit lg:h-80  mb-10 drop-shadow-[11px_11px_#352969] container">
        <div className="py-3 px-8 flex flex-col relative z-10 text-white content">
          <h1 className="text-xl text-customLightBlue mb-6 mt-4 font-pressStart">GAME STATISTICS LAST 24H:</h1>
          <div className="flex justify-between">
            <div className="left">
              <h3 className="text-4xl mb-4 text-customLightPurple font-cutefont">GAMES PLAYED:</h3>
              <span className="text-6xl font-cutefont">{gamePlayed}</span>
            </div>
            <div className="right flex flex-col">
              <h3 className="text-4xl mb-4 text-customLightPurple font-cutefont">GAMES WON:</h3>
              <div className="flex items-center gap-3 mb-3">
                <Image className="w-12 mr-4" src={robot} alt="" />
                <span className="text-6xl font-cutefont text-lightpink">{robotWinPercentage.toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Image className="w-12 mr-4" src={user} alt="" />
                <span className="text-6xl font-cutefont text-customLightBlue">{userWinPercentage.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxComp;

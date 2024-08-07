import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import redicon from "../assets/redicon.svg";
import blueicon from "../assets/blueicon.svg";
import linkup from "../assets/linkup.svg";

interface Message {
  id: number;
  text: string;
  isSent: boolean;
}

interface ChatLog {
  id: string;
  date: string;
  messages: Message[];
  isWin: boolean;
  endTime: number;
}

interface ChatLogsProps {
  
  openPopup: (chat: ChatLog) => void;
  WinLossMessage: string;
  ongoingChat: Message[];
  completedChats: ChatLog[];
}

function ChatLogs({
  openPopup,
  ongoingChat,
  completedChats,
  WinLossMessage,
}: ChatLogsProps) {
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatLogs(completedChats);
  }, [completedChats]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLogs]);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div>
      <h1 className="font-pressStart m-auto w-fit text-2xl my-5 text-customLightBlue">
        CHAT LOGS
      </h1>

      <div className="relative p-2 m-auto overflow-hidden h-[639px] mb-10 drop-shadow-[11px_11px_#352969] container">
        <div
          ref={scrollRef}
          className="flex flex-col p-4 overflow-y-auto h-full items-center relative z-10 text-white content"
        >
          <div className="chatlogs w-full">
            {chatLogs.map((chat, index) => (
              <div
                key={chat.id}
                className="chat-log-item flex items-center justify-between mb-4 p-3 border-b-[1px] border-customLightPurple "
              >
                <div className="flex items-center  w-[28vw] p-2 overflow-hidden">
                  <Image
                    src={index % 2 === 0 ? redicon : blueicon}
                    alt="Chat icon"
                    width={60}
                    height={60}
                    className="mr-4"
                  />
                  <h1
                    className="font-cutefont text-white text-3xl ml-2 overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{ lineHeight: "1.2" }}
                  >
                    {WinLossMessage}
                  </h1>
                </div>

                <div className="win ">
                  <span
                    className={`mr-4 font-cutefont text-3xl uppercase ${
                      chat.isWin ? "text-customLightBlue" : "text-lightpink"
                    }`}
                  >
                    {chat.isWin ? "YOU Win" : "YOU Loss"}
                  </span>
                </div>
                <div className="flex  w-64 ">
                  <p className="font-cutefont text-3xl text-customLightPurple uppercase">
                    {getTimeAgo(chat.endTime)}
                  </p>
                </div>

                <div className="buttonlog ">
                  <div className="wallet relative flex items-center justify-center drop-shadow-[11px_11px_#352969] container hover:shadow-none">
                    <div
                      onClick={() => openPopup(chat)}
                      className="insidewallet flex items-center p-1 sm:p-3  relative z-10 text-white content"
                    >
                      <Image src={linkup} alt="" className="w-28 sm:w-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {ongoingChat.length > 0 && (
              <div className="chat-log-item flex items-center justify-between mb-4 p-3 border border-customLightBlue rounded">
                <div className="flex items-center">
                  <Image
                    src="/path-to-your-image.png"
                    alt="Chat icon"
                    width={40}
                    height={40}
                    className="mr-4 rounded-full"
                  />
                  <div>
                    <h3 className="font-cutefont text-xl">Ongoing Chat</h3>
                    <p className="font-cutefont text-sm">
                      {ongoingChat.length} messages
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 font-cutefont text-yellow-500">
                    In Progress
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLogs;

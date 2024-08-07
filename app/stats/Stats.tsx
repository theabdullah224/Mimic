import React, { useState, useEffect } from "react";
import Image from "next/image";
import energyicon from "../assets/Bolt.svg";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import clock from "../assets/Clock.svg";
import lines from "../assets/statslines.svg";
import Footer from "../components/Footer";
import cross from "../assets/cross.svg";
import ChatLogs from "./ChatLogs";
import discord from "../assets/discord.svg";
import x from "../assets/x.svg";
import telegram from "../assets/Telegram.svg";
import medium from "../assets/Medium.svg";
import unknownicon from "../assets/unknownicon.svg";
import chaticon from "../assets/chaticon.svg";
interface StatsProps {
  accenergy: number;
  energytopupin: number;
  gameplayed: number;
  totalwins: number;
  points: number;
}

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
const Stats: React.FC<StatsProps> = ({
  accenergy,
  energytopupin,
  gameplayed,
  totalwins,
  points,
}) => {
  const router = useRouter();
  const storedMessages = localStorage.getItem("chatMessages");
  const messages = storedMessages ? JSON.parse(storedMessages) : [];
  const [completedChats, setCompletedChats] = useState<ChatLog[]>([]);
  const [ongoingChat, setOngoingChat] = useState<Message[]>([]);
  const [isPopupOpenConfirm, setIsPopupOpenConfirm] = useState(false);

  const [selectedChat, setSelectedChat] = useState<ChatLog | null>(null);

  const openPopupConfirm = (chat: ChatLog) => {
    setSelectedChat(chat);
    setIsPopupOpenConfirm(true);
  };

  const closePopupConfirm = () => {
    setIsPopupOpenConfirm(false);
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      const messages: Message[] = JSON.parse(storedMessages);

      // Group messages into chats (this is a simple example, you might need a more sophisticated grouping logic)
      const chats: ChatLog[] = [];
      let currentChat: Message[] = [];
      let chatStartTime = Date.now();

      messages.forEach((message, index) => {
        currentChat.push(message);
        if (
          index === messages.length - 1 ||
          messages[index + 1].id - message.id > 3600000
        ) {
          // If more than 1 hour gap, consider it a new chat
          chats.push({
            id: `chat-${chatStartTime}`,
            date: new Date(chatStartTime).toLocaleDateString(),
            messages: currentChat,
            isWin: Math.random() < 0.5, // You should replace this with actual win/loss logic
            endTime: message.id,
          });
          currentChat = [];
          chatStartTime =
            index < messages.length - 1 ? messages[index + 1].id : Date.now();
        }
      });

      setCompletedChats(chats);

      // If there's an ongoing chat, set it
      if (currentChat.length > 0) {
        setOngoingChat(currentChat);
      }
    }
  }, []);

  const handleOnStartClick = useCallback(() => {
    router.push("/chatscreen");
  }, [router]);

  const discordclick = () => {
    window.open("https://discord.com/invite/your-discord-invite", "_blank");
  };
  const xclick = () => {
    window.open("https://twitter.com/your-twitter-handle", "_blank");
  };
  const telegramclick = () => {
    window.open("https://t.me/your-telegram-group", "_blank");
  };
  const mediumclick = () => {
    window.open("https://medium.com/@your-medium-profile", "_blank");
  };

  return (
    <div className=" ">
      <h1 className="font-pressStart m-auto w-fit  text-2xl my-5 text-customLightBlue">
        YOUR STATS
      </h1>

      {/* YOUR STATS */}
      <div className="relative p-2 m-auto mb-10 drop-shadow-[11px_11px_#352969] container">
        <div className= "flex justify-between   items-center relative z-10 text-white content">

            <div className="contentbox items-center pb-16 lg:pb-0 flex flex-col lg:flex-row justify-between  h-fit  w-[100%]">




            {/* video */}
            <div className="video w-64 ">
            <video
            src="/statsvideo.mp4"
            className="w-fit h-auto mb-1 "
            autoPlay
            muted
            loop
            playsInline
          />
            </div>
            {/* stats values */}
            <div className="statsvalue   flex  w-96 flex-col  justify-center pl-5  relative">
               
                
                <div className='flex flex-col items-center lg:items-start'>
                  <div className='flex'>

                <h2 className='font-cutefont text-customLightPurple text-4xl'>TOTAL GAMES PLAYED:</h2> <span className='font-cutefont text-4xl '>{gameplayed}</span>
                  </div>
               
                <div className='flex'>
                <h2 className='font-cutefont text-customLightPurple text-4xl'>TOTAL WINS:</h2> <span className='font-cutefont text-4xl '>{totalwins}</span>
               
                </div>
                </div>

                <Image className='absolute left-72 hidden xl:block  xl:w-[70%] 2xl:w-[100%]' src={lines} alt="" />
               
            </div>
            {/* buttons */}
            <div className="button   flex items-center justify-center  lg:mr-28  ">
            <div className="startbtn relative hover:cursor-pointer  w-64 px-10 py-3 drop-shadow-[11px_11px_#00D0FF] container hover:shadow-none">
        <div
          onClick={handleOnStartClick}
          className="insidebtn flex  items-center relative z-10 text-white content"
        >
          <h1 className="text-3xl font-cutefont text-white">START NEW GAME</h1>
        </div>
        <style jsx>{`
          .container::before,
          .container::after {
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

          .container::before {
            background-color: #00d0ff;
            z-index: -2;
          }

          .container::after {
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
      </div>

            </div>



            </div>




        </div>
       
      </div>

      {/* chatlogs */}
      <ChatLogs
        ongoingChat={ongoingChat}
        openPopup={openPopupConfirm}
        completedChats={completedChats}
        WinLossMessage="NICE TRY ROBOT BUT YOU CANT FOOL MENICE TRY ROBOT BUT YOU"
      />

      {isPopupOpenConfirm && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 pointer-events-auto px-28">
          <div
            className="absolute inset-0 bg-customBlue opacity-85"
            onClick={closePopupConfirm}
          ></div>

          <div className="relative w-fit mx-20 ">
            <div
              onClick={closePopupConfirm}
              className="crossbtn absolute z-50"
              style={{ right: "-40px", top: "40px" }}
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

            {/* top box (chat logs heading) */}
            <div className=" w-fit relative top-[27px] z-40 m-auto  mt-6  flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex  items-center p-3 px-14 relative z-10 text-white content">
                <h1 className="font-cutefont text-2xl text-customLightBlue">
                  CHAT LOGS
                </h1>
              </div>
            </div>

            {/* inside chat log */}
            <div className="max-w-[1281px]  max-h-[50vh] drop-shadow-[11px_11px_#352969] relative container ">
            <div className="relative px-6 py-2 flex items-center flex-col justify-center content">
              {/* chat box */}
              <div className="chat-box  my-8 w-full  max-h-[45vh] overflow-y-auto scrollbar" id="style-1">
                {selectedChat.messages.map((message, index) => (
                 <div
                 key={message.id}
                 className={`mb-10 w-full   flex items-start gap-5 ${
                   message.isSent
                     ? "self-end flex-row-reverse "
                     : "self-start flex-row"
                 }`}
               >
                 {message.isSent ? (
                   <Image
                     src={chaticon}
                     alt=""
                     className="chaticonimage w-10 sm:w-20 mr-2 flex-shrink-0"
                   />
                 ) : (
                   <Image
                     src={unknownicon}
                     alt=""
                     className="unknowimage w-10 sm:w-20 flex-shrink-0"
                   />
                 )}
                 {message.isSent ? (
                   // Sent message box
                   <div className="relative w-1/2 px-5 py-5 drop-shadow-[11px_11px_#00D0FF] container">
                     <p className="font-cutefont text-xl float-right uppercase">
                       {message.text}
                     </p>
                   </div>
                 ) : (
                   // Received message box
                   <div className="relative w-1/2 px-5 py-5 drop-shadow-[11px_11px_#352969] container">
                     <p className="font-cutefont text-xl uppercase">
                       {message.text}
                     </p>
                   </div>
                 )}
               </div>
                ))}
              </div>
            </div>
          </div>
            {/* bottom box share the content */}
            <div className=" lg:max-w-[762px]  lg:max-h-[85px] w-fit relative top-[-80px] lg:top-[-55px] m-auto  mt-6  flex items-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none">
              <div className="insidewallet flex flex-col lg:flex-row w-full  items-center justify-between p-3 px-7 relative z-10 text-white content">
               
                {/* copylink */}
                <div className="flex float-left mr-4 ">

                <h1 className="font-cutefont mr-4 text-sm sm:text-2xl">SHARE THIS CHAT OR</h1>{" "}
                <a
                  className="font-cutefont text-sm sm:text-2xl text-customLightBlue underline"
                  href=""
                  >
                  COPY LINK
                </a>
                  </div>


                  {/* buttons icons */}
                <div className="flex gap-5 md:pb-4 md:mt-4 mt-4 lg:mt-0 ">
                  <div
                    onClick={discordclick}
                    className="wallet relative    flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none"
                  >
                    <div className="insidewallet flex  items-center p-1 sm:p-3 relative z-10 text-white content">
                      <Image src={discord} alt="" className=" w-26 walletsvg" />
                    </div>
                  </div>
                  <div
                    onClick={xclick}
                    className="wallet relative    flex items-center justify-center drop-shadow-[11px_11px_#352969] container hover:shadow-none"
                  >
                    <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                      <Image src={x} alt="" className="w-6 walletsvg" />
                    </div>
                  </div>
                  <div
                    onClick={telegramclick}
                    className="wallet relative    flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none"
                  >
                    <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                      <Image src={telegram} alt="" className="w-6 walletsvg" />
                    </div>
                  </div>
                  <div
                    onClick={mediumclick}
                    className="wallet relative    flex items-center justify-center  drop-shadow-[11px_11px_#352969] container hover:shadow-none"
                  >
                    <div className="insidewallet flex  items-center p-3 relative z-10 text-white content">
                      <Image src={medium} alt="" className="w-6 walletsvg" />
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
      )}


      

      <Footer />
      
    </div>
  );
};

export default Stats;

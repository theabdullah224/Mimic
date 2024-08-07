import React, { useState, useRef, useEffect, useCallback } from "react";
import chaticon from '../assets/chaticon.svg'
import Image from "next/image";
import lines from '../assets/linessvg.svg'
import { useWalletConnection } from '../hooks/useWalletConnection';
import unknownicon from '../assets/unknownicon.svg'

interface ChatboxProps {
  time: number;
  openPopup: (result: 'win' | 'lose') => void;
}

type Message = {
  id: number;
  text: string;
  isSent: boolean;
};


const Chatbox: React.FC<ChatboxProps> = ({ time, openPopup }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(1000); // 2 minutes in seconds
  const [isTimeOut, setIsTimeOut] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { address } = useWalletConnection(); 
  const [chatSaved, setChatSaved] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' >();


  const determineGameResult = useCallback(() => {
    // 50% chance of winning
    return Math.random() < 0.5 ? 'win' : 'lose';
  }, []);


  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleHumanOrAiClick = () => {
    if (!isTimeOut) {
      setIsTimeOut(true);
      saveChatToDatabase();
    }
  };

  const handleHumanclick = () => {

  }
  const handleAiBotclick = () => {

  }

  
  useEffect(() => {
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeOut(true);
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log("Current wallet address:", address);
  }, [address]);



  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "" && !isTimeOut) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        isSent: true,
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from OpenAI');
        }

        const data = await response.json();
        const aiMessage: Message = {
          id: Date.now(),
          text: data.message,
          isSent: false,
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };


  const saveChatToDatabase = useCallback(async () => {
    if (chatSaved) return;
 
    if (!address) {
   
      return;
    }
    const result = determineGameResult();
    setGameResult(result);
    try {
      
      const response = await fetch('/api/save-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          messages: messages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save chat');
      }

      const data = await response.json();
      console.log('Chat saved successfully:', data);
      setChatSaved(true);
      openPopup(result); // Pass the game result to the popup
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  }, [address, messages, chatSaved, determineGameResult, openPopup]);

 
  const handleGameEnd = async (choice: 'human' | 'ai') => {
    // Ensure the action only proceeds if the game has timed out and wallet is connected
    if (!isTimeOut) return;
    if (!address) {
      console.error('Wallet not connected');
      return;
    }
  
    const result = determineGameResult(); // Determine the game result based on logic
  
    try {
      // Send the game data to the backend API
      const response = await fetch('/api/save-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages, // Assuming messages is defined in the parent scope
          
          userChoice: choice,
          walletAddress: address,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save chat session');
      }
  
      // Process the response data
      const data = await response.json();
      console.log('Game saved:', data);
  
      // Display result to the user
      openPopup(result);
    } catch (error) {
      console.error('Error saving chat session:', error);
      // Optionally, display error feedback to the user here
    }
  };
  
  useEffect(() => {
    if (isTimeOut && !chatSaved) {
      
      saveChatToDatabase();
    }
  }, [isTimeOut, chatSaved, saveChatToDatabase]);

  return (
    <div className=" ">
      <div className="relative flex mt-20 justify-center   ">
        {/* top box */}
        <div className="crossbtn absolute top-[-30px] sm:top-[-40px] z-50">
          <div className="sm:py-4 sm:px-5 w-fit p-3 z-50 drop-shadow-[11px_11px_#352969] container">
            <div className="w-fit flex items-center justify-center z-10 text-white content">
              <h1 className="font-pressStart text-customLightBlue text-xs sm:text-sm mr-2">
                {isTimeOut ? "TIME IS OUT" : "TIME LEFT CONVERSATION:"}
              </h1>
              <span className={`font-cutefont text-xl sm:text-4xl ${isTimeOut ? 'text-lightpink' : 'text-lightpink'}`}>
                {isTimeOut ? "00:00" : `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
              </span>
            </div>
          </div>
        </div>
        {/* main box */}
        {/* main box */}
        <div className="m-auto z-10 py-8 h-[1035px] drop-shadow-[11px_11px_#352969] relative container overflow-hidden">
          <div id="style-1" ref={chatContainerRef} className="absolute chatbotscreen inset-0 px-10 py-14 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-customLightBlue scrollbar-track-transparent scrollbar  my-14">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-10 max-w-[70%] flex items-start gap-5 ${message.isSent ? 'self-end flex-row-reverse' : 'self-start flex-row'
                  }`}
              >
                {message.isSent ? (
                  <Image src={chaticon} alt="" className="chaticonimage w-10  sm:w-20" />
                ) : (
                  <Image src={unknownicon} alt="" className="unknowimage w-10 sm:w-20" />
                )}
                {message.isSent ? (
                  // Sent message box
                  <div className="relative  min-w-full px-5 py-4 drop-shadow-[11px_11px_#00D0FF] container-1">
                    <p className="font-cutefont text-3xl float-right uppercase ">{message.text}</p>
                  </div>
                ) : (
                  // Received message box
                  <div className="relative  min-w-full px-5 py-4 m-auto mb-10 drop-shadow-[11px_11px_#352969] container">
                    <p className="font-cutefont text-3xl uppercase">{message.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>




      </div>












      <style jsx>{`
        @media screen and (min-width: 1910px) {
          .crossbtn-1 {
            left: 18vw;
          }
        }
        @media screen and (min-width: 2218px) {
          .crossbtn-1 {
            left: 27vw;
          }
        }
        @media screen and (min-width: 3000px) {
          .crossbtn-1 {
            left: 32vw;
          }
        }
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
        .container-2::before {
          background-color: #F6013F;
          z-index: -2;
        }

        .container-2::after {
          background-color: #040923;
          inset: 1px;
          z-index: -1;
        }
         .container-2:hover {
    color: #F6013F !important;
    .insidecontainer:hover{
      color: #F6013F !important;
    }
    
}
        .startbtn:hover {
          filter: drop-shadow(0px 0px transparent);
          -webkit-filter: drop-shadow(0px 0px transparent);
          position: relative;
          top: 11px;
          left: 11px;

          /* background-color: #00D0FF; */
          color: #00d0ff;
          .insidebtn {
            color: #00d0ff ;
          }
        }
      `}</style>



      {/* bottom box asking human or ai */}
      <div className=" relative top-[-2rem] flex flex-col items-center ">


        {/* input box */}
        <div className="crossbtn-1 mb-8  sm:mb-10 z-50 flex  sm:left-[10vw] md:left-[13vw] 2xl:left-[13vw] 2xl:w-[70rem]">
          <div className="sm:py-4 sm:px-5  w-[45vw] p-3 z-50 drop-shadow-[11px_11px_#352969] container sm:w-[50vw]">
            <div className="  w-fit flex items-center justify-center z-10 text-white content">
              <input
                type="text"

                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                disabled={isTimeOut}
                className="w-[40vw] uppercase sm:w-[35vw] lg:w-[40vw] 2xl:w-[45rem] box-border bg-transparent font-cutefont text-3xl focus:outline-none focus:border-[#352969] text-customLightPurple placeholder-customLightPurple"
                placeholder="INPUT"
              />
            </div>
          </div>

          {/* send button */}
          <div className="relative left-4">
  <div
    onClick={!isTimeOut ? handleSendMessage : undefined}
    className={`startbtn relative ${
      isTimeOut ? 'cursor-not-allowed' : 'hover:cursor-pointer'
    } px-5 py-4 drop-shadow-[11px_11px_#00D0FF] container-1 ${
      !isTimeOut ? 'hover:shadow-none' : ''
    } sm:px-12 lg:px-16 2xl:px-24`}
  >
    <div className={`insidebtn flex items-center relative z-10 ${
      isTimeOut ? 'text-gray-500' : 'text-white'
    } content`}>
      <h1 className="text-3xl font-cutefont">SEND</h1>
    </div>
  </div>
</div>
        </div>
        {/* bottom box asking human or ai */}
        <div className="relative mb-28 z-20 p-1  m-auto w-[20rem] md:w-[30rem]  xl:w-[37rem]  sm:mb-28 md:mb-16 xl:mb-4 2xl:w-[40rem]  drop-shadow-[11px_11px_#352969] container">
          <div className="flex justify-center px-8 py-5 items-center relative z-10 text-white content">
            <h1 className="font-cutefont md:text-xl text-base 2xl:text-3xl text-customLightPurple">MAKE&nbsp;A&nbsp;CHOICE,&nbsp;HOW&nbsp;DO&nbsp;YOU&nbsp;THINK&nbsp;YOU&nbsp;ARE&nbsp;TALKING?</h1>

          </div>

        </div>



        <Image src={lines} alt="" className="z-0 relative w-[15rem] sm:w-[15rem] md:w-[20rem] 2xl:w-[27rem]  xl:w-[25rem] top-[-14rem]  " />








        {/* human ai butons */}
        <div className=" flex justify-between h-14 w-[20rem] sm:w-[20rem]  md:w-[25rem] 2xl:w-[33rem]   xl:w-[29rem] top-[-16rem] sm:top-[-16rem] md:top-[-17rem] relative ">
          {/* human button */}
          <div onClick={() => handleGameEnd('human')} className="startbtn relative hover:cursor-pointer sm:w-24 w-10  2xl:w-52 md:w-40 z-30    px-14 py-2 sm:py-3 drop-shadow-[11px_11px_#00D0FF] container-1 hover:shadow-none">
            <div className="insidebtn flex justify-center items-center relative  text-white content">
              <h1 className="text-3xl font-cutefont">HUMAN</h1>
            </div>

          </div>
          {/* ai button */}
          <div  onClick={() => handleGameEnd('ai')} className="startbtn relative hover:cursor-pointer sm:w-24 w-10 2xl:w-52 md:w-40 z-30 hover:text-customHotpink mr-3   px-14 py-2 sm:py-3 drop-shadow-[11px_11px_#FF6289] container container-2  hover:shadow-none">
            <div className="insidebtn insidecontainer hover:text-customHotpink flex justify-center items-center relative  text-white content">
              <h1 className="text-3xl font-cutefont hover:text-customHotpink">AI&nbsp;BOT</h1>
            </div>

          </div>


        </div>


















      </div>
    </div>
  );
};

export default Chatbox;

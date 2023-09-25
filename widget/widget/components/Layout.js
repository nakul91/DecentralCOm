import { useState, useEffect } from "react";
import ChatApp from "./ChatApp";
import { useClient } from "streamr-client-react";
import chatBubble from "../../public/images/chat_bubble.svg";



function generate() {
  return `Customer`
}

function Layout({ publicKey }) {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const universalStreamr = "0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockT";
  console.log(publicKey);
  // const [streamId, setStreamId] = useState(`0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockTheory/${publicKey ? publicKey : "1"}`);
  const [streamId, setStreamId] = useState(`0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockTheory/${Math.floor(Math.random() * (2)) + 1}`);
  useEffect(() => {
    setStreamId(`0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockTheory/${Math.floor(Math.random() * (4)) + 1}`)
  }, [publicKey])
  const [message, setMessages] = useState([
  ]);
  const client = useClient();
  const user = 0;

  useEffect(() => {
    if (!client) return;
    client.subscribe(universalStreamr, (streamMessage) => {
      setMsgs(oldval => [...oldval, streamMessage])
    })
  }, [client]);


  async function startChat() {
    // if (showChatWindow) {
    //     showChatWindow(false);
    //     return;
    // }
    if (client) {
      await client.publish(universalStreamr, {
        id: streamId,
        name: generate(),
        msg: 'T1',
        message: 'Want to open a new channel',
        time: "...",
        unreadMsg: 1,
        user: 'CLIENT',
        type: 'CREATE'
      })
    };
  }


  return (
    <>
      <div className="wg-relative">
        <button
          className="wg-rounded-t-full wg-rounded-l-full wg-h-[68px] wg-w-[68px] wg-fixed wg-right-0 wg-bottom-0 wg-p-2 wg-m-4 wg-border-2 wg-z-10 wg-bg-[#EB6201] wg-flex wg-items-center wg-justify-center"
          onClick={() => setShowChatWindow(!showChatWindow)}
        >
          <img src={chatBubble} className="wg-w-10 wg-h-10" />
        </button>
        {/* {showChatWindow && ( */}
        <div
          className={`wg-fixed wg-bottom-20 wg-right-4 wg-z-10 ${!showChatWindow && `wg-hidden`
            }`}
        >
          <ChatApp streamId={streamId} startChat={startChat}></ChatApp>
        </div>
        {/* )} */}
      </div>
    </>
  );

}

export default Layout;



// return (
//   <>
//     <div className="wg-relative">
//       <button
//         className="wg-rounded-lg wg-h-10 wg-w-10 wg-fixed wg-right-0 wg-bottom-0 wg-p-2 wg-m-4 wg-border-2 wg-z-10 "
//         onClick={startChat}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chat-bubble">
//           <path d="M19,2H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z">
//           </path>
//         </svg>
//       </button>
//       {/* {showChatWindow && ( */}
//       <div className={`wg-fixed wg-bottom-12 wg-right-0 wg-bg-white wg-p-4 wg-z-10 ${!showChatWindow && `wg-hidden`}`} >
//         <ChatApp></ChatApp>
//       </div>
//       {/* )} */}
//     </div>

//   </>
// )
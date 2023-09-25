import { useEffect, useRef, useState } from "react";
// import './Test.css'
// import { useSubscribe } from "streamr-client-react";
import { useClient } from "streamr-client-react";
import chatBubble from "../../public/images/chat_bubble.svg";
import sendSvg from "../../public/images/send_light.svg";

function ChatApp({ name, logo, startChat, streamId }) {

  const client = useClient();
  const inputRef = useRef(null);
  const [msgs, setMsgs] = useState([]);
  const [openInputField, setOpenInputField] = useState(false);
  const containerRef = useRef(null);


  //   const onScroll = () => {
  //     if (containerRef.current) {
  //       const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
  //       if (scrollTop + clientHeight === scrollHeight) {
  //         setOverlay(false);
  //       } else {
  //         setOverlay(true);
  //       }
  //     }
  //   };

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scrollIntoView({ behavior: "smooth" });
      console.log(containerRef, "cont");
    }
  }, [containerRef, msgs]);



  useEffect(() => {
    if (!client) return;
    client.subscribe(streamId, (streamMessage) => {
      setMsgs((oldval) => [...oldval, streamMessage]);
    });
  }, [client, setMsgs, streamId]);

  // useEffect(() => {
  //   async function getAddress() {
  //     const address = await client.getAddress();
  //     console.log(address);
  //     // await client.publish(streamId, { message: `Want to talk - ${address}`, user: address, messageType: "CREATE" })
  //     // setStreamId(`0xe634a90edaab10dda5e44f85512657500d5cb957/chat/${address}`);
  //   }
  //   getAddress();
  // }, [client]);

  const send = async function () {
    let message = inputRef.current.value;
    if (!client || !message) return;
    await client.publish(streamId, { id: streamId, message, user: "Client", chatID: "1" });
    inputRef.current.value = "";
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      // Handle Enter key press here
      send();
    }
  };

  const handleStartConversation = async () => {
    await startChat();
    setOpenInputField(true);
  };

  return (
    <>
      <div className="wg-w-[360px] wg-bg-[#F5F5F7]  wg-rounded-lg wg-relative">
        <div className="wg-border-gray-200 wg-w-full wg-flex wg-items-center wg-justify-start wg-gap-3 wg-p-5 wg-bg-[#1D1D1F] wg-rounded-t-lg wg-sticky wg-top-0">
          <img src={logo ? logo : chatBubble} />
          <p className="wg-text-white">{name || "Support"}</p>
        </div>
        <div className="wg-w-full wg-bg-[#F5F5F7] wg-flex wg-flex-col ">
          {!openInputField ? (
            <>
              <div className="wg-w-[85%] wg-mx-auto wg-my-4 wg-flex wg-gap-3 wg-rounded-full">

                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M34.3672 31.6875H34.3047L34.2422 31.6797C34.0313 31.6563 33.8203 31.6094 33.6172 31.5234L29.1875 29.9531L29.1563 29.9375C29.0625 29.8984 28.961 29.875 28.8516 29.875C28.75 29.875 28.6563 29.8906 28.5625 29.9297C28.461 29.9688 27.4844 30.3359 26.4688 30.6172C25.9141 30.7656 23.9922 31.2656 22.4531 31.2656C18.5078 31.2656 14.8203 29.75 12.0703 27C9.34377 24.2734 7.84377 20.6563 7.84377 16.8047C7.84377 15.8203 7.95315 14.8281 8.16408 13.8672C8.85158 10.6953 10.6719 7.8125 13.2813 5.74219C15.9141 3.64844 19.2578 2.5 22.6797 2.5C26.7578 2.5 30.5625 4.0625 33.3828 6.89062C36.0547 9.57031 37.5156 13.0859 37.5 16.8047C37.5 19.5703 36.6797 22.25 35.1328 24.5547L35.0938 24.6172C35.0625 24.6563 35.0391 24.6953 35.0078 24.7344C34.9688 24.7969 34.9453 24.8516 34.9297 24.8906L36.1563 29.2578C36.2031 29.4063 36.2266 29.5625 36.2422 29.7188V29.8125C36.2422 30.8438 35.3985 31.6875 34.3672 31.6875ZM30.0781 27.6172L33.4297 28.8047L32.4688 25.375C32.3125 24.8047 32.4375 24.1641 32.8516 23.4609L32.8594 23.4453C32.9297 23.3359 33 23.2266 33.0781 23.1172C34.336 21.2344 35 19.0469 35 16.7891C35.0078 13.7422 33.8047 10.8516 31.6094 8.64844C29.2578 6.29687 26.086 5 22.6797 5C16.8594 5 11.7735 8.95313 10.5938 14.3984C10.4219 15.1875 10.336 16 10.336 16.8047C10.336 23.3984 15.7656 28.7656 22.4453 28.7656C23.4219 28.7656 24.8672 28.4688 25.8047 28.2109C26.7266 27.9609 27.6406 27.6172 27.6797 27.6016C28.0547 27.4609 28.4453 27.3906 28.8516 27.3906C29.2656 27.3828 29.6797 27.4609 30.0781 27.6172Z" fill="black" />
                  <path d="M5.61729 37.5C5.18761 37.5 4.77354 37.3516 4.43761 37.0859L4.41417 37.0703C3.89073 36.6328 3.64854 35.9375 3.78136 35.2734C4.00792 34.1094 4.47667 31.6641 4.64854 30.7578C4.64854 30.7578 4.64854 30.7578 4.64854 30.75C3.34386 28.8125 2.60948 26.5469 2.50792 24.2188C2.40636 21.8828 2.96104 19.5703 4.09386 17.5234C4.42979 16.9219 5.18761 16.7031 5.79698 17.0391C6.39854 17.375 6.61729 18.1328 6.28136 18.7422C4.41417 22.1016 4.57823 26.1719 6.72667 29.3672L6.73448 29.375C7.02354 29.8125 7.29698 30.3359 7.16417 30.9531C7.13292 31.1094 6.77354 32.9609 6.45323 34.6406L9.78917 33.3359C10.3907 33.1016 11.0548 33.1094 11.6564 33.3594C13.0782 33.9141 14.5626 34.2031 15.9376 34.2031C15.9454 34.2031 15.9454 34.2031 15.9532 34.2031C17.922 34.2031 19.8673 33.6797 21.5704 32.6953C22.1642 32.3516 22.9298 32.5547 23.2814 33.1484C23.6251 33.7422 23.422 34.5078 22.8282 34.8594C20.7423 36.0703 18.3673 36.7031 15.961 36.7031C15.9532 36.7031 15.9532 36.7031 15.9454 36.7031C14.2579 36.7031 12.461 36.3516 10.7423 35.6797L10.711 35.6641L6.34386 37.375C6.12511 37.4688 5.89073 37.5156 5.64854 37.5156C5.62511 37.5 5.62511 37.5 5.61729 37.5Z" fill="black" />
                </svg>

                <div className="wg-bg-white wg-rounded-lg wg-rounded-bl-none">
                  <p className="wg-p-2 wg-text-black wg-text-sm">
                    👋 Hi there. How may I help you today?
                  </p>
                </div>
              </div>
              <button
                className="wg-w-[75%] wg-rounded-r-full wg-rounded-l-full wg-bg-[#EB6201] wg-mx-auto wg-my-4"
                onClick={handleStartConversation}
              >
                <p className="wg-text-white wg-py-4">Start a conversation</p>
              </button>
            </>
          ) :
            <div id="messages" className="wg-flex wg-flex-col-reverse">
              <div
                className="wg-chat-message wg-overflow-y-scroll wg-max-h-[400px] wg-min-h-[200px]"
                id="chats"
              >
                {msgs.length > 0 &&
                  msgs.map((value, index) => {
                    return (
                      <div
                        className={`wg-flex wg-items-center ${value.user === "Client"
                          ? "wg-justify-end"
                          : "wg-justify-start"
                          }`}
                        key={index}
                      >
                        <pre
                          className={`wg-whitespace-normal wg-w-fit wg-max-w-full wg-text-black wg-bg-gray-400  wg-m-5 wg-p-2 wg-rounded-lg wg-rounded-br-none  ${value.user === 'Client' ? "wg-bg-[#E6E6E6] wg-text-right" : "wg-bg-white"}`}
                          key={index}
                        // style={{
                        //   overflow: "auto",
                        //   whiteSpace: "pre-wrap",
                        //   //   wordWrap: "break-word",
                        // }}
                        >
                          {value.message}
                        </pre>
                      </div>
                      // <pre
                      //   className={` wg-mb-3 wg-py-2 wg-px-5 wg-w-fit  wg-max-w-full wg-rounded-tr-2xl wg-rounded-tl-2xl ${value.user == name ? "" : ""
                      //     } ${value.user === "Client"
                      //       ? "wg-text-white wg-bg-[#4A4A4A] wg-rounded-bl-2xl"
                      //       : "wg-text-black wg-bg-[#E6E6E6] wg-rounded-br-2xl"
                      //     }`}
                      //   style={{
                      //     overflow: "auto",
                      //     whiteSpace: "pre-wrap",
                      //     //   wordWrap: "break-word",
                      //   }}
                      // >
                      //   {value.message}
                      // </pre>
                    );
                  })}

                <div
                  className="wg-full wg-h-[1px] wg-bg-[#F5F5F7]"
                  ref={containerRef}
                ></div>

                <div id="anchor"></div>
              </div>
            </div>}
        </div>

        {openInputField ? (
          <div className="fixed wg-border-gray-200 wg-px-4 wg-pb-4 wg-mb-2 wg-sm:mb-0 wg-bottom-2">
            <div className="wg-relative wg-flex">
              <input
                ref={inputRef}
                onKeyUp={handleKeyUp}
                type="text"
                placeholder="Write your message!"
                id="data"
                className="wg-w-full focus:wg-outline-none wg-focus:placeholder-gray-400 wg-text-gray-600 wg-placeholder-gray-600 wg-pl-12 wg-bg-white wg-py-3 wg-rounded-r-full wg-rounded-l-full"
              />
              <div className=" wg-items-center wg-inset-y-0 wg-sm:flex">
                <button
                  type="button"
                  id="send"
                  onClick={send}
                  className="wg-absolute wg-right-2 wg-bottom-1/2 wg-translate-y-1/2 wg-inline-flex  wg-items-center wg-justify-center wg-rounded-r-full wg-rounded-l-full wg-px-4 wg-py-2 wg-transition wg-duration-500 wg-ease-in-out wg-text-white wg-bg-[#EB6201] hover:wg-bg-[#EB6201]/80 focus:wg-outline-none"
                >
                  <img src={sendSvg} alt="send" />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ChatApp;

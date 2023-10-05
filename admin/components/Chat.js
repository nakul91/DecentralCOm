import { useEffect, useMemo, useRef, useState } from "react";
import "./chat.module.css";
// import { useSubscribe } from "streamr-client-react";
import { useClient } from "streamr-client-react";
import arrowImg from "../public/images/send_svg.svg";
import searchImg from "../public/images/search.svg";
import InNewTab from "../public/images/open-new-tab.svg";
import Image from "next/image";
import { shortenAddress } from "@/utils/shorten";


// eslint-disable-next-line react/prop-types

function Chat({ client, className, currStreamId, allStreams, refresh }) {
    const [streamId, setStreamId] = useState(currStreamId);
    console.log('From Chat component =>', streamId);
    const inputRef = useRef(null);
    const [msgs, setMsgs] = useState([]);
    const [name, setName] = useState("");

    // useEffect(() => {
    //     if (!client) return;

    //     client.subscribe(streamId, (streamMessage) => {
    //         setMsgs((oldval) => [...oldval, streamMessage]);
    //     });
    // }, [client, setMsgs]);

    // useSubscribe(streamId, {
    //   onMessage: (msg) => {
    //     // console.log(msg.getContent())
    //     console.log(msg)
    //   },
    // })

    // useEffect(() => {
    //     async function getAddress() {
    //         if (client) {
    //             const address = await client.getAddress();
    //             console.log(address);
    //             // await client.publish(streamId, { message: `Want to talk admin- ${address}`, user: address, messageType: "CREATE" })
    //             await client.publish(streamId, {
    //                 message: `Want to talk admin- ${address}`,
    //                 user: address,
    //                 messageType: "CREATE",
    //             });
    //             // setStreamId(`0xe634a90edaab10dda5e44f85512657500d5cb957/chat/${address}`);
    //         }
    //     }
    //     getAddress();
    // }, [client]);

    useEffect(() => {
        if (Object.keys(allStreams).length) {
            setMsgs(allStreams[streamId]?.messages || []);
            setName(allStreams[streamId]?.name)
            console.log('Set stream information')
        }

    }, [allStreams, streamId]);

    function selectStreamId(id) {
        setStreamId(id);
        // setMsgs(allStreams[id].messages);
    }

    const send = async function () {
        let message = inputRef.current.value;
        if (!client) alert("Error, ")
        await client.publish(streamId, { message, user: "ADMIN", id: streamId, chatID: "1" });
        inputRef.current.value = "";
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            // Handle Enter key press here
            send();
        }
    };

    let contactsList = useMemo(() => {
        if (allStreams)
            return Object.values(allStreams);
    }, [allStreams]);

    // TO DO - USER DEMO on top right and remove name truncate id 
    return (
        <>
            <div className="flex items-center justify-center w-full" key={refresh}>
                <div className="p:2 h-screen bg-[#FFFFFF] w-[30%] border-r-2">
                    <div className="flex justify-between pt-6 pb-4 bg-black border-b border-gray-200 sm:items-center ">
                        <div className="relative flex items-center pl-12 space-x-4">
                            <Image src={arrowImg} />
                            <span className="text-[28px] leading-7 font-bold text-white">
                                {"Streamr Admin Chat"}
                            </span>
                        </div>
                    </div>
                    <div className="mt-5 " >
                        <div className="relative flex ml-12 mr-4">
                            <input
                                type="text"
                                placeholder="Search Conversation "
                                id="data"
                                className="w-full focus:outline-none border border-[#CFCFCF] focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 p-4 bg-white rounded-[30px]"
                            />
                            <div className="absolute inset-y-0 items-center hidden right-8 sm:flex">
                                <Image src={searchImg} />
                            </div>
                        </div>
                        {contactsList.length > 0 &&
                            contactsList.map((value, index) => {
                                return (
                                    <div key={value.id} className="p-4 pl-12 border-b cursor-pointer " onClick={() => selectStreamId(value.id)}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <p className="text-[24px] font-normal leading-5 text-black">
                                                    {value.name} - {index + 1}
                                                </p>
                                                {value.unreadMsg && (
                                                    <div className="bg-[#F56363] rounded-full w-5 h-5 flex items-center justify-center">
                                                        <p className="text-[10px] font-normal leading-4 text-white">
                                                            {value.unreadMsg}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[16px] font-normal leading-4 mt-2 text-[#AFAFAF]">
                                                {value.time}
                                            </p>
                                        </div>
                                        <p className="text-[16px] font-normal leading-4 mt-2 text-[#AFAFAF]">
                                            {shortenAddress(value.msg)}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="p:2 justify-between flex flex-col h-screen bg-[#FAFBFF] w-[70%] pb-6">
                    <div className="flex justify-between pt-6 pb-4 pl-6 bg-black border-b-2 border-gray-200 sm:items-center">
                        <div className="relative flex items-end justify-between w-full ">
                            <div className="flex flex-col leading-tight">
                                <span className="text-[28px] leading-7 font-bold text-white">
                                    {name || "Messages"}
                                </span>
                            </div>
                            <div className="flex items-center self-center mr-10" onClo>
                                Open Website <Image src={InNewTab} height={20} />
                            </div>
                        </div>
                    </div>
                    {streamId != "0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockT" && <>
                        <div
                            id="messages"
                            className="flex flex-col-reverse overflow-hidden overflow-y-scroll "
                        >
                            <div className="mx-6 mt-5 chat-message" id="chats">
                                {msgs?.length &&
                                    msgs.map((value, index) => {
                                        return (
                                            <div
                                                className={`flex items-center ${value.user === "ADMIN"
                                                    ? "justify-end"
                                                    : "justify-start"
                                                    }`}
                                                key={index}
                                            >
                                                <pre
                                                    className={` mb-3 py-2 px-5 w-fit max-w-[50%] rounded-tr-2xl rounded-tl-2xl ${value.user == name ? "" : ""
                                                        } ${value.user === "Admin"
                                                            ? "text-white bg-[#4A4A4A] rounded-bl-2xl"
                                                            : "text-black bg-[#E6E6E6] rounded-br-2xl"
                                                        }`}
                                                    style={{
                                                        overflow: "auto",
                                                        whiteSpace: "pre-wrap",
                                                        //   wordWrap: "break-word",
                                                    }}
                                                >
                                                    {value.message}
                                                </pre>
                                            </div>
                                        );
                                    })}

                                <div id="anchor"></div>
                            </div>
                        </div>
                        <div className="px-4 pt-4 mb-2 border-gray-200 sm:mb-0">
                            <div className="relative flex">
                                <input
                                    ref={inputRef}
                                    onKeyUp={handleKeyUp}
                                    type="text"
                                    placeholder="Write your message!"
                                    id="data"
                                    className="w-full focus:outline-none border border-[#CFCFCF] focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-8 p-4 bg-white rounded-[30px]"
                                />
                                <div className="absolute inset-y-0 items-center hidden right-8 sm:flex">
                                    <button
                                        type="button"
                                        id="send"
                                        onClick={send}
                                        className="inline-flex items-center justify-center rounded-3xl px-4 py-2 transition duration-500 ease-in-out text-white bg-[#DD5B01] hover:bg-[#ff9a528e] focus:outline-none"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2.79591 6.99998L0.533053 12.8188C0.37556 13.2237 0.770455 13.611 1.1611 13.4734L1.22266 13.4472L13.2227 7.44719C13.5682 7.27445 13.5897 6.80143 13.2874 6.59115L13.2227 6.55277L1.22266 0.552763C0.83401 0.358437 0.411808 0.715761 0.512697 1.11748L0.533055 1.1812L2.79591 6.99998L0.533053 12.8188L2.79591 6.99998ZM1.9349 11.973L3.67423 7.50038L8.0926 7.49998C8.34574 7.49998 8.55493 7.31188 8.58804 7.06783L8.5926 6.99998C8.5926 6.74685 8.4045 6.53765 8.16045 6.50454L8.0926 6.49998L3.67423 6.50038L1.9349 2.02692L11.881 6.99998L1.9349 11.973Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>

            </div>
        </>);
}

export default Chat;


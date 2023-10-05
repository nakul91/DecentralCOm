import { add } from "lodash";
import { useEffect, useState } from "react";
import { useClient } from "streamr-client-react";



function useGlobalStreamr() {
    const universalStreamr = "0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockT"; // public stream
    const [allStreams, setAllStreams] = useState(
        {}
    );
    const [refresh, setRefresh] = useState(0);
    const client = useClient();

    useEffect(() => {
        if (!client)
            return;
        console.log(client.getAddress());
        client.subscribe(universalStreamr, (streamMessage) => {
            // updateMessages(universalStreamr, streamMessage.message, 'Client')
            if (streamMessage.type === 'CREATE') {
                createStream(streamMessage);
            }
        })
    }, [client]);

    const updateMessages = (id, message, user) => {
        const addMessage = { message, user: user };
        setAllStreams(prevData => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                // unreadMsg: prevData.unreadMsg + 1,
                messages: [...prevData[id]?.messages, addMessage]
            }
        }));
        setRefresh(prev => prev++);
    };

    async function createStream(createMessage) {
        const id = createMessage.id;
        const stream = await client.getOrCreateStream({
            // id: "/chat/blockT",
            id: id,
        });
        console.log(stream);

        // try {
        setAllStreams(prev => {
            let newStream = {
                id: id,
                name: createMessage.name,
                msg: createMessage.id,
                time: "...",
                unreadMsg: 1,
                messages: [],
            };
            prev[id] = newStream;
            console.log(newStream, prev, 'merging the two')
            return { ...prev }
        });

        client.subscribe(id, (streamMessage) => {
            updateMessages(streamMessage.id, streamMessage.message, streamMessage.user);
        })
        // }
        // catch (e) {
        //     console.error("Straem was not created! Please try again later")
        //     alert("Stream was not created, try again later.");
        // }
        setRefresh(prev => prev++);
    }

    return { client, allStreams, refresh }
}

export default useGlobalStreamr;


// async function getAllStreams() {
//     if (!client)
//         return {};
//     const streams = await client.searchStreams(undefined, {
//         user: '0xe634a90edaab10dda5e44f85512657500d5cb957',
//         allowPublic: true
//     });
//     console.log("Getting streams with permission", streams)
//     console.log(typeof (streams))
//     // for await (const st of streams()) {
//     //     console.log("st", st)
//     // }
//     // setAllStreams(streams);
// }
// {
// "0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockT": {
//     id: "0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockT",
//     name: "Public Channel",
//     msg: "/chat/blockT",
//     time: "...",
//     unreadMsg: 1,
//     messages: [],
// }
// }
// getAllStreams();


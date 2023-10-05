"use client"

import Chat from "@/components/Chat";
import { userLoggedIn } from "@/utils/atoms";
import useGlobalStreamr from "@/utils/useStreamr";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const { client, allStreams, refresh } = useGlobalStreamr();
    const [currStreamId, setCurrStreamID] = useState("0xe634a90edaab10dda5e44f85512657500d5cb957/chat/blockT");
    const [user,] = useAtom(userLoggedIn);
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push("/")
        }

    }, [user])
    return (
        <main>
            <div class="">
                {/* <SideBar className="col-span-1" client={client} allStreams={allStreams}></SideBar> */}
                <Chat className="col-span-3" client={client} currStreamId={currStreamId} name={'chat'} allStreams={allStreams} refresh={refresh} />
            </div>
        </main>
    );
}
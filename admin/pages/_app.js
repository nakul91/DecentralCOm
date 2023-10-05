"use client"
import "@/styles/globals.css";
import Provider from "streamr-client-react";
import { Provider as JotaiProvider } from "jotai";

const privateKey = "0x028af6986ac24572c3c3e3d7937ceaf7ecbf85557b2c775e46fea837fd9218e3";
let options = {
    auth: {
        privateKey: privateKey
    }
};

export default function App({ Component, pageProps }) {

    return (
        <>
            <JotaiProvider>
                <Provider {...options}>
                    <Component {...pageProps} />
                </Provider>
            </JotaiProvider>
        </>
    )
}
// try {
//     if (typeof window?.ethereum !== "undefined" || (typeof window?.web3 !== "undefined")) {
//         // Existing code goes here
//         options = {
//             auth: {
//                 privateKey: privateKey
//             }
//             // eslint-disable-next-line no-undef
//             // auth: { ethereum: window.ethereum }
//             // or authenticate with user wallet
//             // auth: { ethereum: window.ethereum }
//         }
//     }
// } catch (e) {
//     console.log(e)
// }

// let options;
// try {
//     if (typeof window?.ethereum !== "undefined" || (typeof window?.web3 !== "undefined")) {
//         // Existing code goes here
//         options = {
//             // auth: {
//             //     privateKey: privateKey
//             // }
//             // eslint-disable-next-line no-undef
//             // auth: { ethereum: window.ethereum }
//             // or authenticate with user wallet
//             auth: { ethereum: window.ethereum }
//         }
//     }
// } catch (e) {
//     console.log(e)
// }
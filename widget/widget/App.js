import ChatApp from './components/ChatApp';
import styles from './widget.module.css';
import Provider, { useClient } from "streamr-client-react";
import Layout from './components/Layout';
import { StreamrClient } from 'streamr-client';






// let address = {
//     "address": "0x6C379d17b52F4b5Be937C3E436B080c0AcE713e4",
//     "privateKey": "0x9fdbfdc9a9dd61fdb64c5007ca4cb153d6e2ff9d2037e9672189c7137d7cfa9a"
// }
// REMOVE FUTURE ->  HARD CODED FOR NOW



export default function Home() {

    const address = StreamrClient.generateEthereumAccount();
    const options = {
        auth: {
            privateKey: address.privateKey
        }
    }
    console.log({ address })

    return <div>
        <Provider {...options}>
            <Layout publicKey={address.address}></Layout>
        </Provider>
    </div>
}
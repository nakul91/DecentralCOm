import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
// import RPC from "../../utils/web3RPC";
import styles from "./login.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { saveToLocalStorage } from "@/utils";

const clientId = "YOUR_WEB3AUTH_CLIENT_ID"; // get from https://dashboard.web3auth.io
let web3auth;
if (typeof window !== "undefined") {
  // Client-side-only code
  web3auth = new Web3Auth({
    clientId: "YOUR_WEB3AUTH_CLIENT_ID", // Get your Client ID from Web3Auth Dashboard
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x89", // hex of 137, polygon mainnet
      rpcTarget: "https://rpc.ankr.com/polygon",
      displayName: "Polygon Mainnet",
      blockExplorer: "https://polygonscan.com",
      ticker: "MATIC",
      tickerName: "Matic",
    },
  });
}
//Initialize within your constructor

function Login() {
  const router = useRouter();

  const [provider, setProvider] = useState();

  useEffect(() => {
    async function init() {
      await web3auth?.initModal();
      console.log("init");
    }
    init();
  }, []);

  useEffect(() => {
    async function getAdd() {
      console.log("Account connected");
      if (!provider) return;
      const ethProvider = new ethers.providers.Web3Provider(provider);
      const signer = await ethProvider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const balance = ethers.utils.formatEther(
        await ethProvider.getBalance(address), // Balance is in wei
      );
      console.log(provider, "prov");
      saveToLocalStorage("provider", provider);
      router.push("/onboarding");
      console.log(balance, "balance");
    }

    if (web3auth && web3auth.connected) {
      getAdd();
    }
  }, [provider]);

  async function connect() {
    const web3authProvider = await web3auth?.connect();
    console.log(web3authProvider, "web3");
    setProvider(web3authProvider);
  }
  return (
    <div className={`w-[100vw] h-[100vh] ${styles.loginBg}`}>
      <div className="w-full max-w-[600px] mx-auto h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[#3F4145] text-[24px] mb-1">Welcome to</p>
          <p className="text-[#3F4145] text-[40px] font-bold mb-1">DecentralCom</p>
          <p className="text-[#3F4145] text-[24px]">
            Secure Conversations, Web3 Convenience.
          </p>

          <Link href={{ pathname: "/onboarding", query: { showCopy: true } }}>
            <div className="w-full max-w-[350px] px-[50px] py-4 border border-[#EB6201] rounded-[40px] text-[#EB6201] cursor-pointer mt-11 mb-14">
              Demo Account Login
            </div>
          </Link>

          <div className="flex items-center w-full gap-3 mx-auto mb-14">
            <div className="w-[45%] h-[1px] bg-black"></div>
            <p className="text-[#676767] text-2xl">or</p>
            <div className="w-[45%] h-[1px] bg-black"></div>
          </div>
          <Link href={"/onboarding"}>
            <div
              className="w-full max-w-[350px] px-[50px] py-4 bg-[#EB6201] rounded-[40px] text-white cursor-pointer "
              onClick={connect}
            >
              Create your own Account
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

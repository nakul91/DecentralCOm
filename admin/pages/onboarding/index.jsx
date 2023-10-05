import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import styles from "./onboarding.module.css";
import { getImage } from "../../utils/index";
import Image from "next/image";
import { ethers } from "ethers";
import cardImage from "../../public/images/chat_window.png";
import arrowRight from "../../public/images/arrow_right_light.svg";
import copyLight from "../../public/images/copy_light.svg";
import { QRModal } from "./QRModal";
import { useRouter } from "next/router";
import { useCopyToClipboard } from "@/utils/useCopyToClipboard";
import { userLoggedIn } from "@/utils/atoms";
import { useAtom } from "jotai";

//Initialize within your constructor
let web3auth;
if (typeof window !== "undefined") {
  // Client-side-only code
  web3auth = new Web3Auth({
    clientId:
      "BMorkEMdVh4ApxK2CmG9shCstqemr-UruBuLGnWEPJvB7yOyJCdeomdS9J3DDwNDPfC1vML84FlxiCiKPl7GiAo", // Get your Client ID from Web3Auth Dashboard
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
  // await web3auth.initModal();
}
function onboarding() {
  const router = useRouter();
  const [showCopy, setShowCopy] = useState(true);
  const handleDeposit = () => {
    setShowCopy(true);
  };

  const [walletAddress, setWalletAddress] = useState("");
  const [web3Prov, setWeb3Prov] = useState();
  const [isBalAvail, setIsBalAvail] = useState(false);
  const [user, setUser] = useAtom(userLoggedIn);

  const data = router.query;
  useEffect(() => {
    if (data && data.showCopy === "true") {
      setUser(true);
      setIsBalAvail(true);
    }
  }, [data]);

  useEffect(() => {
    async function init() {
      const connected = await web3auth.connect();
      const web3authProvider = await web3auth?.provider;
      setWeb3Prov(web3authProvider);
      const ethProvider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = await ethProvider?.getSigner();
      const address = await signer?.getAddress();
      setWalletAddress(address);
      const balance = ethers.utils.formatEther(
        await ethProvider.getBalance(address), // Balance is in wei
      );
      console.log(balance, "balance");
      // router.push("/onboarding");
    }
    // init();
  }, []);

  useEffect(() => {}, []);

  const [open, setOpen] = useState(false);
  const handleNextClick = async () => {
    // const ethProvider = new ethers.providers.Web3Provider(web3Prov);
    // const signer = await ethProvider.getSigner();
    // const address = await signer.getAddress();
    // setWalletAddress(address);
    // console.log(address);
    // debugger;
    // const balance = ethers.utils.formatEther(
    //   await ethProvider.getBalance("0xe634a90edaab10dda5e44f85512657500d5cb957"), // Balance is in wei
    // );
    let balance = 1.1;
    if (balance > 1) {
      //move to next screen
      console.log("bal");
      setIsBalAvail(true);
      setUser(true);
    } else {
      //show error msg
      console.log("no bal");
    }
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className={`w-[100vw] h-[100vh] ${styles.loginBg}`}>
      <div className="w-full max-w-[700px] mx-auto h-full flex flex-col items-center justify-center text-center">
        <div className="w-full">
          <p className="text-[48px] font-bold text-[#3F4145] mb-4">Just 1 more step</p>
          <div
            className={`w-full h-[200px] flex justify-between mb-10 ${styles.onboardingCard}`}
          >
            <div className="flex items-center justify-center w-1/2">
              <p className="text-[24px] font-bold text-white ">
                Most decenterlised way to express youeself
              </p>
            </div>
            <div className="relative w-1/2">
              <Image
                src={cardImage}
                alt=""
                className="w-[80%] absolute bottom-0 left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
          <div className="px-1 pr-1 pl-10 flex bg-[#2C2D4A] border border-[#3035DF] rounded-[40px] items-center justify-between">
            {!isBalAvail ? (
              <>
                <p className="text-[#EBEBEB] text-[20px] py-5">
                  Add <b>1 MATIC</b> to get started
                </p>

                <button
                  className="w-[30%] h-full bg-[#EB6201] text-white rounded-[40px] py-4 text-[20px] flex gap-2 items-center justify-center"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <p className="">Deposit</p>
                  <Image src={arrowRight} alt="arrow" />
                </button>
              </>
            ) : (
              // <div className="flex items-center justify-between w-full">
              //   <p className="text-[#EBEBEB] leading-6 text-[20px] py-5">
              //     {` <script src="https://ds-storage.sg.....mr/widget.bundle.js"></script>`}
              //   </p>
              //   <div className="flex items-center gap-2">
              //     <p className="text-[#8587AF] text-[20px] leading-6">Copy</p>
              //     <button
              //       className="text-white text-[20px] flex items-center justify-center rounded-full"
              //       onClick={handleDeposit}
              //     >
              //       <div className="bg-[#EB6201] w-14 h-14 rounded-full flex items-center justify-center">
              //         <Image src={copyLight} alt="arrow" className="w-6 h-6 " />
              //       </div>
              //     </button>
              //   </div>
              // </div>
              <ShowScriptToCopy showCopy={showCopy}></ShowScriptToCopy>
            )}
          </div>
          <div
            className="flex items-center justify-center mt-4 cursor-pointer"
            onClick={() => {
              if (!isBalAvail) {
                handleNextClick();
              } else {
                router.replace("/chat");
              }
            }}
          >
            <div className="w-[110px] h-full bg-[#EB6201] text-white rounded-2xl py-4 text-[20px]">
              Next
            </div>
          </div>
        </div>
      </div>
      <QRModal walletAddress={walletAddress} open={open} handleClose={handleClose} />
    </div>
  );
}

export default onboarding;

function ShowScriptToCopy({}) {
  const [, copyUrl] = useCopyToClipboard();
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-[#EBEBEB] leading-6 text-[20px] py-5">
          {` <script src="https://ds...ces.com/streamr/widget.bundle.js"></script>`}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[#8587AF] text-[20px] leading-6">Copy</p>
          <button
            className="text-white text-[20px] flex items-center justify-center rounded-full"
            // onClick={}
          >
            {/* https://ds-storage.sgp1.cdn.digitaloceanspaces.com/streamr/widget.bundle.js */}
            <div
              className="bg-[#EB6201] w-14 h-14 rounded-full flex items-center justify-center"
              onClick={() =>
                copyUrl(
                  " <script src='https://ds-storage.sgp1.cdn.digitaloceanspaces.com/streamr/widget.bundle.js'></script>",
                )
              }
            >
              <Image src={copyLight} alt="arrow" className="w-6 h-6 " />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
